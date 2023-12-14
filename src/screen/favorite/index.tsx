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

  const [cartData, setCartData] = useState<CartModel[]>([]);
  const cartService = new CartService();
  const {user} = useAuth();
  const accountId = user?.id || '';

  useEffect(() => {
    fetchViewFavoriteData();
    featchCart();
  }, [user, refreshing]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await fetchViewFavoriteData();
        await featchCart();
      };

      fetchData();
      return () => {};
    }, []),
  );

  const featchCart = async () => {
    if(user){
      const resultCart = await cartService.fetchCart(user?.id!);
      setCartData(resultCart.data);
    }
  };
  const fetchViewFavoriteData = async () => {
    try {
      setLoading(true);
      const favoriteService = new FavoriteService();
      const result = await favoriteService.fetchFavorite(accountId);
      setDataFavorites(result.data);
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

  const goToDetailProduct = (id: number) => {
    navigateToPage(APP_NAVIGATION.DETAILSPRODUCT, {productId: id});
  };

  const handleRemoveFavorite = async (favoriteId: number) => {
    try {
      const favoriteService = new FavoriteService();
      await favoriteService.deleteFavorite(favoriteId);
      setDataFavorites(prevData => prevData.filter(item => item.id !== favoriteId));
      
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

  const ProductItem2 = ({item}: {item: FavoriteModel}) => {
    if (!item?.Product) {
      console.error('Item is undefined');
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
    }
    return (
      <TouchableOpacity onPress={() => goToDetailProduct(item?.productId)}>
        <View style={styles.item}>
          <View style={styles.imageContainer}>
            {item?.Product.images ? (
              <Image source={{uri: item?.Product.images}} style={styles.image} />
            ) : (
              <Image source={require('../../assets/images/noDataStar.png')} style={styles.image} />
            )}

            <View style={styles.overlay}>
              <View style={styles.imgFavouriteContainer}>
                <TouchableOpacity onPress={() => {handleFavoritePress(item?.id);} }>
                  <Image style={styles.imgFavourite} source={require('../../assets/images/heart2.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.productInfoContainer}>
            <View style={styles.productNameContainer}>
              <Text numberOfLines={1} style={styles.text}>
                {item?.Product.name}
              </Text>
            </View>

            <View style={styles.viewStar}>
              <Image style={styles.imgStar} source={require('../../assets/images/star4.png')} />
              <Text style={styles.textStar}>{item?.Product.averageRating || 0.0}</Text>
              {/* Use the correct function name here */}
              <Text style={styles.textCmt}>({item?.Product.quantity || 0})</Text>
            </View>
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
              data={dataFavorites}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              contentContainerStyle={styles.flatListContainer2}
              renderItem={({item}) => (
                <View style={styles.ProductItemContainer}>
                  <ProductItem2 item={item} />
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
