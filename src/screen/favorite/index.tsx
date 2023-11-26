import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParam, MenuStackParam } from '@src/navigations/AppNavigation/stackParam';
import { APP_NAVIGATION, MENU_NAVIGATION } from '@src/navigations/routes';
import React, { useEffect, useState } from 'react';
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
import { BaseButton } from '@src/containers/components/Base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BaseLoading } from '@src/containers/components/Base/BaseLoading';
import { navigateToPage } from '@src/navigations/services';
import TouchableScale from 'react-native-touchable-scale';
import FavoriteService from '@src/services/favorite';
import { FavoriteModel } from '@src/services/favorite/favorite.model';
import ProductService from '@src/services/product';
import { ProductModel } from '@src/services/product/product.model';


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

  const [dataProduct, setDataProduct] = useState<ProductModel[]>([]);

  //con thieu lay account
  const accountId = 2;

  useEffect(() => {
    console.log('account id đã được chọn: ', accountId);
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
  }, [accountId, refreshing])

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
      const productService = new ProductService();
      const result = await productService.getProduct();
      setDataProduct(result.data);
    } catch (error) {
      setLoading(false);
      console.log('Error fetching Products: ', error)
    }
  }

  //data tess
  const dataTest = [
    { "id": 1, "productId": 1, "accountId": 2 }, { "id": 2, "productId": 2, "accountId": 2 }, { "id": 3, "productId": 3, "accountId": 2 },
  ]

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDataFavorite();
    await fetchDataProduct();
    // khi chua có du lieu
    //await setDataFavorites(dataTest);
    setRefreshing(false);
  };

  const mergeData = () => {
    const mergedData = dataFavorites.map(favorite => {
      const matchedProduct = dataProduct.find(product => product.id === favorite.productId);
      if (matchedProduct && favorite && favorite.id) {
        return {
          ...favorite,
          productInfo: matchedProduct,
        };
      }
      return null;
    });
    // Lọc ra những đối tượng có thông tin sản phẩm (không bằng null)
    const filteredData = mergedData.filter(item => item !== null);
    return filteredData;
  };

  const goToDetails = (id: number) => {
    navigateToPage(APP_NAVIGATION.DETAILSPRODUCT, { productId: id });
  };

  //console.log('favorite' + JSON.stringify(dataFavorites));
  //console.log('product' + JSON.stringify(dataProduct));

  const ProductItem = ({ item, goToDetails }) => {
    if (!item || !item.productInfo) {
      console.error('Item or productInfo is undefined:', item);
      return null;
    }
    console.log('-----------------ProductInfo:----------------', item.productInfo);
    console.log('-----------------ProductInfo ID:----------------', item.productInfo.id);
    return (
      <TouchableScale
        onPress={() => {
          goToDetails(item.productInfo.id);
          console.log('code Xem chi tiết id : ', item.productInfo.id, ' name : ', item.productInfo.name);
        }}
        activeScale={0.95}
        friction={9}
        tension={100}
      >
        <View style={styles.item}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item?.productInfo?.images }} style={styles.image} />

            <View style={styles.overlay}>
              <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => console.log('code logic button tymm <3')}>
                  <Image
                    style={styles.imgFavourite}
                    source={require('../../assets/images/heart2.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1.5,
              marginHorizontal: 15,
            }}
          >
            <View style={{ flex: 1, justifyContent: 'center', marginBottom: 8 }}>
              <Text numberOfLines={1} style={styles.text}>
                {item?.productInfo?.name}
              </Text>
            </View>

            <View style={styles.viewStar}>
              <Image style={styles.imgStar} source={require('../../assets/images/star4.png')} />
              <Text style={styles.text}>4.9</Text>
              <Text style={styles.textCmt}>({item?.quantity || "50"})</Text>
            </View>
          </View>
        </View>
      </TouchableScale>
    );
  };

  const renderNoDataMessage = () => {
    if (loading) {
      return (
        <View style={styles.LoadingContainer}>
          <BaseLoading size={60} top={250} loading={true} />
        </View>
      )
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
    <SafeAreaView style={{ backgroundColor: 'white', }}>
      <View style={styles.titleContainer}>
        <View style={styles.textTitle}>
          <View style={{ flex: 9, height: '100%', justifyContent: 'center' }}>
            <Text style={styles.title}>Yêu thích</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <BaseButton
            onPress={() => console.log('Press')}
            renderIcon={<Icon name="shopping-cart" size={30} color="black" />}
            style={{ backgroundColor: 'white', marginBottom: 8 }}
          />
        </View>
      </View>
      <View style={{ width: '100%', borderBottomWidth: 1, borderColor: '#DDDDDD' }}></View>

      {renderNoDataMessage()}
      {dataFavorites.length > 0 && (
        <ScrollView
          indicatorStyle="black"
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={{ width: '100%', marginTop: 14, marginBottom: 5 }}>
            <FlatList
              data={mergeData()}
              keyExtractor={item => item?.id.toString()}
              horizontal={true}
              contentContainerStyle={styles.flatListContainer}
              renderItem={({ item }) => (
                <View style={{ width: '100%' }}>
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
