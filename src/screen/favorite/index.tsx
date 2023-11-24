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

type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MenuStackParam, MENU_NAVIGATION.FAVORITE>,
  NativeStackNavigationProp<AppStackParam>
>;

interface Props {
  navigation: ScreenNavigationProps;
  route: RouteProp<MenuStackParam, MENU_NAVIGATION.FAVORITE>;
}

const FavoriteScreen = (props: Props) => {
  // const [favorites, setFavorites] = useState<FavoriteModel[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [refreshing, setRefreshing] = useState(false);
  // const [error, setError] = useState('');

  //const route = props.route;
  // const accountId = route.params?.accountId;
  // const productId =  route.params?.productId;

  // const fetchDataFavorite = async () => {
  //   try {
  //     setLoading(true);
  //     const favoriteService = new FavoriteService();

  //     const result = await favoriteService.fetchFavorite(accountId, productId);
  //     console.log("Product: ", result.data.length);
  //     setFavorites(result.data);
  //     setLoading(false);
  //   } catch (error) {
  //     setError('err');
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   console.log("id user: ", accountId, " product: ", productId);
  //   fetchDataFavorite();
  // }, [accountId, productId]);
  const [favorites, setFavorites] = useState<Favorites[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  type Favorites = {
    id: string;
    productId: string;
    userId: string;
  };

  type Product = {
    images: string[];
    id: string;
    name: string;
    price: string;
    description: string;
    quantity: string;
    CategoryId: string;
    createdAt: string;
    updatedAt: string;
  };

  useEffect(() => {
    if (refreshing) {
      fetchDataFavorites()
        .then(() => fetchDataProducts())
        .then(() => setRefreshing(false))
        .catch(err => {
          setError(err.message);
          setRefreshing(false);
        });
    } else {
      fetchDataFavorites();
    }
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const fetchDataFavorites = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://654b50895b38a59f28eedbb4.mockapi.io/api/favorite');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result: Favorites[] = await response.json();
      setFavorites(result);
    } catch (error) {
      setError(error.message); // Set the actual error message

      // Check if error occurred during favorite fetch
      if (error.message.includes('Network response was not ok')) {
        // Prevent fetching product data with outdated favorite IDs
        setLoading(false);
        return; // Do not continue fetching products
      }

      // Fetch product data if error occurred during favorite fetch
      await fetchDataProducts();
    } finally {
      setLoading(false);
    }
  };

  const fetchDataProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://654b50895b38a59f28eedbb4.mockapi.io/api/product');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const productData: Product[] = await response.json();

      // Filter product data based on favorite product IDs
      const favoriteProductIds = favorites.map(favorite => favorite.productId);
      const productResults = productData.filter(product => favoriteProductIds.includes(product.id));

      setProducts(productResults);
    } catch (error) {
      setError(error.message); // Display the actual error message
    } finally {
      setLoading(false);
    }
  };

  const goToDetails = (id: string) => {
    navigateToPage(APP_NAVIGATION.DETAILSPRODUCT, {productId: id});
  };
  console.log('favorite' + JSON.stringify(favorites));
  console.log('product' + JSON.stringify(products));

  return (
    <SafeAreaView style={{backgroundColor: 'white', paddingBottom: 80}}>
      <View style={styles.titleContainer}>
        <View style={styles.textTitle}>
          <View style={{flex: 9, height: '100%', justifyContent: 'center'}}>
            <Text style={styles.title}>Yêu thích</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <BaseButton
            onPress={() => console.log('Press')}
            renderIcon={<Icon name="shopping-cart" size={30} color="black" />}
            style={{backgroundColor: 'white', marginBottom: 8}}
          />
        </View>
      </View>
      <View style={{width: '100%', borderBottomWidth: 1, borderColor: '#DDDDDD'}}></View>

      {loading ? (
        <BaseLoading size={20} top={100} loading={true} />
      ) : (
        <ScrollView
          indicatorStyle="black"
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={{width: '100%', marginTop: 14, marginBottom: 5}}>
            <FlatList
              data={products}
              keyExtractor={item => item.id}
              horizontal={true}
              contentContainerStyle={styles.flatListContainer}
              renderItem={({item}) => (
                <View style={{width: '100%'}}>
                  <TouchableScale
                    onPress={() => {
                      goToDetails('1');
                      console.log('code Xem chi tiet data: ', item.name);
                    }}
                    activeScale={0.95}
                    friction={9}
                    tension={100}>
                    <View style={styles.item}>
                      <View style={styles.imageContainer}>
                        <Image source={{uri: item?.image[0] || ''}} style={styles.image} />

                        <View style={styles.overlay}>
                          <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                            <TouchableOpacity onPress={() => console.log('code logic button tymm <3')}>
                              <Image style={styles.imgFavourite} source={require('../../assets/images/heart2.png')} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1.5,
                          marginHorizontal: 15,
                        }}>
                        <View style={{flex: 1, justifyContent: 'center', marginBottom: 8}}>
                          <Text numberOfLines={1} style={styles.text}>
                            {item.name}
                          </Text>
                        </View>

                        <View style={styles.viewStar}>
                          <Image style={styles.imgStar} source={require('../../assets/images/star4.png')} />
                          <Text style={styles.text}>4.9</Text>
                          <Text style={styles.textCmt}>({item.quantity})</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableScale>
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
