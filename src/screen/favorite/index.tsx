import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParam, MenuStackParam} from '@src/navigations/AppNavigation/stackParam';
import {APP_NAVIGATION, MENU_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';

import styles from './styles';
import {ms, vs, hs} from '@src/styles/scalingUtils';
import {BaseButton} from '@src/containers/components/Base';
import {BaseLoading} from '@src/containers/components/Base/BaseLoading';
import {navigateToPage} from '@src/navigations/services';
import TouchableScale from 'react-native-touchable-scale';
import FavoriteService from '@src/services/favorite';
import {FavoriteModel} from '@src/services/favorite/favorite.model';
import ProductService from '@src/services/product';
import {ProductDetailModel} from '@src/services/product/product.model';
import {useAuth} from '@src/hooks/useAuth';
import BaseHeaderNoBack from '@src/containers/components/Base/BaseHeaderNoBack';
import Toast from 'react-native-toast-message';
import {CartModel} from '@src/services/cart/cart.model';
import CartService from '@src/services/cart';


type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MenuStackParam, MENU_NAVIGATION.FAVORITE>,
  NativeStackNavigationProp<AppStackParam>
>;

interface Props {
  navigation: ScreenNavigationProps;
  route: RouteProp<MenuStackParam, MENU_NAVIGATION.FAVORITE>;
}

const FavoriteScreen = (props: Props) => {
  const [dataFavorites, setDataFavorites] = useState<FavoriteModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const [dataProductId, setDataProductId] = useState<ProductDetailModel[]>([]);
  const [cartData, setCartData] = useState<CartModel[]>([]);
  const cartService = new CartService();
  const {user} = useAuth();
  const accountId = user?.id || '';
  

  const [dataFavoriteProductNull, setDataFavoriteProductNull] = useState<FavoriteModel[]>([]);

  useEffect(() => {
    fetchViewFavoriteData();
    featchCart();
  }, [accountId, refreshing]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await fetchViewFavoriteData();
        await featchCart();
      };

      fetchData();

      return () => {};
    }, [refreshing]),
  );

  const featchCart = async () => {
    const resultCart = await cartService.fetchCart(user?.id!);
    setCartData(resultCart.data);
  };
  useFocusEffect(
    React.useCallback(() => {
      featchCart();
    }, [])
  );
  const fetchViewFavoriteData = async () => {
    try {
      setLoading(true);

      const favoriteService = new FavoriteService();
      const result = await favoriteService.fetchFavorite(accountId);
      setDataFavorites(result.data);

      // Instantiate ProductService
      const productService = new ProductService();

      // Fetch product details using Promise.all
      const productDetails = await Promise.all(
        result.data.map(async favorite => {
          try {
            const productResult = await productService.getProductId(favorite.productId);

            return {...productResult.data, favoriteId: favorite.id};
          } catch (productError) {
            console.log('Error fetching product----  ', productError);
            return null;
          }
        }),
      );

      // lọc các favorite có productId là null;
      const favoritesWithNullProductId = result.data.filter(favorite => favorite.productId === null);
      console.log('favoritesWithNullProductId:', favoritesWithNullProductId);
      setDataFavoriteProductNull(favoritesWithNullProductId);

      // Filter out null values (failed product details fetch)
      const filteredProductDetails = productDetails.filter(product => product !== null);
      console.log('filteredProductDetails------------------', filteredProductDetails.length);
      setDataProductId(filteredProductDetails);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error fetching data: ' + error);
    }
  };

  const onRefresh = async () => {
    await fetchViewFavoriteData();
    setLoading(false);
  };

  const getQuantitiys = (productData: any): number => {
    let totalQuantity = 0;

    if (productData && productData.colorProducts && Array.isArray(productData.colorProducts)) {
      productData.colorProducts.forEach((colorProduct: any) => {
        if (colorProduct && colorProduct.colorConfigs && Array.isArray(colorProduct.colorConfigs)) {
          colorProduct.colorConfigs.forEach((colorConfig: any) => {
            if (colorConfig && typeof colorConfig.quantity === 'number') {
              totalQuantity += colorConfig.quantity;
            }
          });
        }
      });
    }
    return totalQuantity;
  };

  const goToDetailProduct = (id: number) => {
    navigateToPage(APP_NAVIGATION.DETAILSPRODUCT, {productId: id});
  };

  const handleRemoveFavorite = async (favoriteId: number) => {
    try {
      // Xóa mục khỏi danh sách dataProductId
      setDataProductId(prevData => prevData.filter(item => item.favoriteId !== favoriteId));
      setDataFavoriteProductNull(prevData => prevData.filter(item => item.id !== favoriteId));

      const favoriteService = new FavoriteService();
      await favoriteService.deleteFavorite(favoriteId);
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm yêu thích:', error);
      setLoading(false);
    }
  };

  const handleFavoritePress = async (favoriteId: number) => {
    try {
      await handleRemoveFavorite(favoriteId);
      Toast.show({
        text1: 'Xóa thành công khỏi mục yêu thích',
        type: 'success',
      });
    } catch (error) {
      console.log('Lỗi: ', error);
    }
  };

  const ProductItem = ({item}: {item: ProductDetailModel & {favoriteId: number}}) => {
    if (!item) {
      console.error('Item is undefined');
      return null;
    }
    return (
      <TouchableOpacity onPress={() => goToDetailProduct(item.id)}>
        <View style={styles.item}>
          <View style={styles.imageContainer}>
            {item.images ? (
              <Image source={{uri: item.images}} style={styles.image} />
            ) : (
              <Image source={require('../../assets/images/noDataStar.png')} style={styles.image} />
            )}

            <View style={styles.overlay}>
              <View style={styles.imgFavouriteContainer}>
                <TouchableOpacity onPress={() => handleFavoritePress(item.favoriteId)}>
                  <Image style={styles.imgFavourite} source={require('../../assets/images/heart2.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.productInfoContainer}>
            <View style={styles.productNameContainer}>
              <Text numberOfLines={1} style={styles.text}>
                {item?.name}
              </Text>
            </View>

            <View style={styles.viewStar}>
              <Image style={styles.imgStar} source={require('../../assets/images/star4.png')} />
              <Text style={styles.textStar}>{item?.averageRating || 0.0}</Text>
              {/* Use the correct function name here */}
              <Text style={styles.textCmt}>({getQuantitiys(item) || '0'})</Text>
            </View>
          </View>
          
        </View>
      </TouchableOpacity>
    );
  };

  const ProductNullItem = ({item}: {item: FavoriteModel}) => {
    return (
      <TouchableOpacity onPress={() => handleFavoritePress(item.id)}>
        <View style={styles.item}>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/images/noDataStar.png')} style={styles.image} />

            <View style={styles.overlay}>
              <View style={styles.imgFavouriteContainer}>
                <TouchableOpacity onPress={() => handleFavoritePress(item.id)}>
                  <Image style={styles.imgFavourite} source={require('../../assets/images/heart2.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.productInfoContainer}>
            <View style={styles.productNameContainer}>
              <Text numberOfLines={1} style={styles.text}>
                không tìm thấy sản phẩm
              </Text>
            </View>

            <View style={styles.viewStar}>
              <Image style={styles.imgStar} source={require('../../assets/images/star4.png')} />
              <Text style={styles.textStar}>0</Text>
              {/* Use the correct function name here */}
              <Text style={styles.textCmt}>0</Text>
            </View>
          </View>
          
          <View
            style={{
              flex: 1,
              position: 'absolute',
              backgroundColor: 'rgba(212, 204, 203, 0.7)',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#DDDDDD'
            }}>
              <Text style={{fontSize: ms(18), color: '#000000', fontFamily: 'LibreBaskerville-Bold'}}>Nhấn để xóa khỏi yêu thích</Text>
            </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderNoDataMessage = () => {
    if (loading) {
      return (
        <View style={styles.LoadingContainer}>
          <BaseLoading size={60} top={250} loading={true} />
        </View>
      );
    }

    if (dataFavorites.length === 0) {
      return (
        <View style={styles.noDataContainer}>
          <Image style={{width: hs(120), height: hs(120)}} source={require('../../assets/images/noDataStar.png')} />
          <Text style={styles.noDataText}>Không có sản phẩm yêu thích</Text>
        </View>
      );
    }

    return null;
  };

  const handleCartPress = () => {
    navigateToPage(APP_NAVIGATION.CART);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BaseHeaderNoBack title={'Yêu thích'} onCartPress={handleCartPress} data={cartData}/>

      {renderNoDataMessage()}
      {dataFavorites.length > 0 && (
        <ScrollView
          indicatorStyle="black"
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={styles.flatListContainer1}>
            <FlatList
              data={dataProductId}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              contentContainerStyle={styles.flatListContainer2}
              renderItem={({item}) => (
                <View style={styles.ProductItemContainer}>
                  <ProductItem item={item} />
                </View>
              )}
              scrollEnabled={false}
            />
          </View>

          <View style={styles.flatListContainer1}>
            <FlatList
              data={dataFavoriteProductNull}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              contentContainerStyle={styles.flatListContainer2}
              renderItem={({item}) => (
                <View style={styles.ProductItemContainer}>
                  <ProductNullItem item={item} />
                </View>
              )}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default React.memo(FavoriteScreen);
