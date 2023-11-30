import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParam, MenuStackParam} from '@src/navigations/AppNavigation/stackParam';
import {APP_NAVIGATION, MENU_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
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
import {BaseButton} from '@src/containers/components/Base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BaseLoading} from '@src/containers/components/Base/BaseLoading';
import {navigateToPage} from '@src/navigations/services';
import TouchableScale from 'react-native-touchable-scale';
import FavoriteService from '@src/services/favorite';
import {FavoriteModel} from '@src/services/favorite/favorite.model';
import ProductService from '@src/services/product';
import {ProductDetailModel} from '@src/services/product/product.model';
import {useAuth} from '@src/hooks/useAuth';

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

  const {user} = useAuth();
  const accountId = user?.id || '';
  //const accountId = 1;

  useEffect(() => {
    fetchViewFavoriteData();
  }, [accountId, refreshing]);

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
        result.data.map(async (favorite) => {
          try {
            const productResult = await productService.getProductId(favorite.productId);
            return productResult.data;
          } catch (productError) {
            console.error(`Error fetching product ${favorite.productId}:`, productError);
            return null;
          }
        })
      );
  
      // Filter out null values (failed product details fetch)
      const filteredProductDetails = productDetails.filter((product) => product !== null);
      console.log('filteredProductDetails------------------', JSON.stringify(filteredProductDetails));
      setDataProductId(filteredProductDetails);
  
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error fetching data: ' + error);
    }
  };
  

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchViewFavoriteData();
    setRefreshing(false);
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
  

  const goToDetails = (id: number) => {
    navigateToPage(APP_NAVIGATION.DETAILSPRODUCT, {productId: id});
  };

  const ProductItem = ({ item }: { item: ProductDetailModel }) => {
    if (!item) {
      console.error('Item is undefined');
      return null;
    }
  
    return (
      <TouchableOpacity onPress={() => goToDetails(item.id)}>
        <View style={styles.item}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item?.images }} style={styles.image} />
  
            <View style={styles.overlay}>
              <View style={styles.imgFavouriteContainer}>
                <TouchableOpacity onPress={() => console.log('code logic button tymm <3')}>
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
              <Text style={styles.textStar}>4.9</Text>
              {/* Use the correct function name here */}
              <Text style={styles.textCmt}>({getQuantitiys(item) || '0'})</Text>
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
          <Text style={styles.noDataText}>Không có sản phẩm yêu thích</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.textTitle}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.title}>Yêu thích</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <BaseButton
            onPress={() => console.log('gio hang')}
            renderIcon={<Icon name="shopping-cart" size={30} color="black" />}
            style={{backgroundColor: '#F1F1F1'}}
          />
        </View>
      </View>
      <View style={styles.borderBottom}></View>

      {renderNoDataMessage()}
      {dataFavorites.length > 0 && (
        <ScrollView
          indicatorStyle="black"
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={styles.flatListContainer1}>
            <FlatList
              data={dataProductId}
              keyExtractor={item => item?.id.toString()}
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
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default React.memo(FavoriteScreen);
