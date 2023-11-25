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
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const [dataProduct, setDataProduct] = useState<ProductModel[]>([]);

  const accountId = 2;

  useEffect(() => {
    console.log('account id đã được chọn: ', accountId);
    fetchDataFavorite();
    fetchDataProduct();
  }, [accountId])

  const fetchDataFavorite = async () => {
    try {
      const favoriteService = new FavoriteService();
      const result = await favoriteService.fetchFavorite(accountId);
      console.log('Favorite: ', result.data.length);
      setDataFavorites(result.data)
    } catch (error) {
      //setError('Error fetching Favorites: '+ error);
      console.log('Error fetching Favorites: ', error);
    }
  };

  const fetchDataProduct = async () => {
    try {
      const productService = new ProductService();
      const result = await productService.getProduct();
      setDataProduct(result.data);
      console.log(result.data.length);
    } catch (error) {
      setError('err');
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDataFavorite();
    await fetchDataProduct();
    setRefreshing(false);
  };

  const mergeData = () => {
    // Lọc dữ liệu từ dataProduct dựa trên productId từ dataFavorites
    const mergedData = dataFavorites.map(favorite => {
      // Tìm sản phẩm trong dataProduct có productId trùng với productId của favorite
      const matchedProduct = dataProduct.find(product => product.id === favorite.productId);
      // Nếu tìm thấy sản phẩm trùng khớp, trả về một đối tượng mới với thông tin từ cả hai
      if (matchedProduct) {
        return {
          ...favorite,
          productInfo: matchedProduct,
        };
      }
      // Nếu không tìm thấy sản phẩm trùng khớp, có thể xử lý tùy thuộc vào yêu cầu của bạn
      return null;
    });
    // Lọc ra những đối tượng có thông tin sản phẩm (không bằng null)
    const filteredData = mergedData.filter(item => item !== null);
    return filteredData;
  };

  const goToDetails = (id: string) => {
    navigateToPage(APP_NAVIGATION.DETAILSPRODUCT, { productId: id });
  };

  console.log('favorite' + JSON.stringify(dataFavorites));
  console.log('product' + JSON.stringify(dataProduct));

  const ProductItem = ({ item, goToDetails }) => (
    <TouchableScale
      onPress={() => {
        goToDetails(item?.productInfo?.id || '');
        console.log('code Xem chi tiết data: ', item?.productInfo?.name);
      }}
      activeScale={0.95}
      friction={9}
      tension={100}
    >
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item?.productInfo?.image[0] || '' }} style={styles.image} />

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
            <Text style={styles.textCmt}>({item?.quantity})</Text>
          </View>
        </View>
      </View>
    </TouchableScale>
  );

  return (
    <SafeAreaView style={{ backgroundColor: 'white', paddingBottom: 80 }}>
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

      {loading ? (
        <BaseLoading size={20} top={100} loading={true} />
      ) : (
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