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
  console.log('user-----------------id: ', user?.id);
  //con thieu lay account
  const accountId = user?.id || 2;

  useEffect(() => {
    console.log('account----------------id: ', accountId);
    if (refreshing) {
      setRefreshing(false); // Đặt refreshing thành false trước khi tải lại để tránh tác động lặp
      fetchDataFavorite()
        .then(() => fetchDataProduct())
        .then(() => setRefreshing(false))
        .catch(() => setRefreshing(false));
    } else {
      fetchDataFavorite();
      fetchDataProduct();
    }
  }, [accountId, refreshing]);

  const fetchDataFavorite = async () => {
    try {
      setLoading(true); // Set loading to true when starting to fetch data
      const favoriteService = new FavoriteService();
      const result = await favoriteService.fetchFavorite(accountId);
      console.log('Favorite: ', result.data.length);
      setDataFavorites(result.data);

      setLoading(false);
      ///xoa sau
      setDataFavorites(dataTest);
    } catch (error) {
      setLoading(false);
      //setError('Error fetching Favorites: '+ error);
      console.log('Error fetching Favorites: ', error);
    }
  };

  const fetchDataProduct = async () => {
    try {
      setLoading(true);

      const productPromises = dataFavorites.map(async favorite => {
        const productId = favorite.productId;
        const productService = new ProductService();
        const result = await productService.getProductId(productId);
        return result.data;
      });

      // Wait for all product fetch promises to resolve
      const products = await Promise.all(productPromises);

      console.log('Products data:', products);
      setDataProductId(products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    setError('Error fetching Products: ' + error);
    }
  };

  //data tess
  const dataTest = [
    {id: 1, productId: 1, accountId: 2},
    {id: 2, productId: 2, accountId: 2},
    {id: 3, productId: 3, accountId: 2},
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDataFavorite();
    await fetchDataProduct();
    // khi chua có du lieu
    //await setDataFavorites(dataTest);
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

  //console.log('favorite' + JSON.stringify(dataFavorites));
  //console.log('product' + JSON.stringify(dataProduct));

  const ProductItem = ({item, goToDetails}) => {
    if (!item || !item.productInfo) {
      console.error('Item or productInfo is undefined:', item);
      return null;
    }
    console.log('-----------------ProductInfo:----------------', item.productInfo);
    console.log('-----------------ProductInfo ID:----------------', item.productInfo.id);
    return (
      <TouchableOpacity
        onPress={() => {
          goToDetails(item.productInfo.id);
          console.log('code Xem chi tiết id : ', item.productInfo.id, ' name : ', item.productInfo.name);
        }}>
        <View style={styles.item}>
          <View style={styles.imageContainer}>
            <Image source={{uri: item?.productInfo?.images}} style={styles.image} />

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
                {item?.productInfo?.name}
              </Text>
            </View>

            <View style={styles.viewStar}>
              <Image style={styles.imgStar} source={require('../../assets/images/star4.png')} />
              <Text style={styles.textStar}>4.9</Text>
              <Text style={styles.textCmt}>({getQuantitiys(productIdData) || '52'})</Text>
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
              data={[]}
              keyExtractor={item => item?.id.toString()}
              horizontal={true}
              contentContainerStyle={styles.flatListContainer2}
              renderItem={({item}) => (
                <View style={styles.ProductItemContainer}>
                  <ProductItem item={item} goToDetails={goToDetails} />
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

// const styles = StyleSheet.create({
//   productContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   likeButton: {
//     padding: 8,
//     borderRadius: 5,
//   },
//   likeButtonText: {
//     color: 'white',
//   },
// });