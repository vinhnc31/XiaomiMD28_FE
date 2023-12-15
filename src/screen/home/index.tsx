import {RouteProp, useFocusEffect, useIsFocused, useNavigation} from '@react-navigation/native';
import styles from './styles';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MenuStackParam } from '@src/navigations/AppNavigation/stackParam';
import { MENU_NAVIGATION, APP_NAVIGATION } from '@src/navigations/routes';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  RefreshControl,
  SectionList,
  Dimensions,
  Animated,
  Easing,
  ActivityIndicator
} from 'react-native';
import {BaseButton} from '@src/containers/components/Base';
import {BaseLoading} from '@src/containers/components/Base/BaseLoading';
import Swiper from 'react-native-swiper';
import {navigateToPage} from '@src/navigations/services';

import {Movie} from './homeFlatlist';
import TouchableScale from 'react-native-touchable-scale';
import CategoryService from '@src/services/category';
import {CategoryModel} from '@src/services/category/category.model';
import ProductService from '@src/services/product';
import {ProductModel} from '@src/services/product/product.model';
import R from '@src/res';
import { vs, width } from '@src/styles/scalingUtils';

import { FlatListSlider } from 'react-native-flatlist-slider';
import { useAuth } from '@src/hooks/useAuth';
import useNotificationPermission from '@src/hooks/useNotificationPermission';
import CartService from '@src/services/cart';
import { CartModel } from '@src/services/cart/cart.model';
import Carousel from './Slideshow'


interface Props {
  navigation: BottomTabNavigationProp<MenuStackParam>;
  route: RouteProp<MenuStackParam, MENU_NAVIGATION.HOME>;
}

const HomeScreen = (props: Props) => {
  const [data, setData] = useState<CartModel[]>([]);
  const [dataProduct, setDataProduct] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [showAll, setShowAll] = useState(false);
  const displayedData1 = showAll ? dataProduct : dataProduct.slice(0, 3);

  const [dataCategory, setDataCategory] = useState<CategoryModel[]>([]);
  const [showAllCategory, setShowAllCategory] = useState(false);
  const displayedDataCategory = showAllCategory ? dataCategory : dataCategory.slice(0, 5);

  const limitedData = dataProduct.slice(0, 5);
  const animatedValues = limitedData.map(() => new Animated.Value(0));

  const [activeIndex, setActiveIndex] = useState(0);
  const cartService = new CartService();
  const {user} = useAuth();
  useNotificationPermission();
  const [dataFavorites, setDataFavorites] = useState<ProductModel[]>([]);

  const config = {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 9,
  };

  const [displayedDataFavorite, setDisplayedDataFavorite] = useState<ProductModel[]>([]);


  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);


  const [newDataProduct, setNewDataProduct] = useState<ProductModel[]>([]);

  const handleEndReached = () => {
    if (!isLoadingMore && hasMoreData && dataProduct.length > 0) {
      setPage(page + 1);
      setIsLoadingMore(true);
      setLoadingMore(true); // Thêm dòng này
    }
  };
  

  useEffect(() => {
    if (dataProduct.length > 0) {
      fetchSearchResults(page);
      console.log("page: " + page);
      console.log("new: ", newDataProduct.length);
    }
  }, [page]);

  const fetchSearchResults = useCallback(async (nextPage: number = 1) => {
    console.log("dataprd: ", dataProduct.length);
   
    try {
      setIsLoadingMore(true);
      const pageSize = 5;
      const startIndex = (nextPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      console.log('Fetching more results. Page1:', nextPage);
      let filtered = [];
      filtered = dataProduct.slice(startIndex, endIndex);


      setHasMoreData(filtered.length === pageSize);

      if (nextPage === 1) {
        setNewDataProduct((prevResults) => {
          if (nextPage === 1) {
            return filtered;
          } else {
            return [...prevResults, ...filtered];
          }
        });

      } else {
        setNewDataProduct((prevResults) => [...prevResults, ...filtered]);
      }
    } catch (error) {
    } finally {
      setIsLoadingMore(false);
    }
  }, [dataProduct]);

  

  const loadCart = useIsFocused();
  useEffect(() => {
    fetchData();
    featchCart();
  }, [user,refreshing,loadCart]);

  const fetchData = async () => {
    try {
      setRefreshing(false);
      await fetchDataCategory();
      await fetchDataProduct();
      await fetchDataFavorites();
    } catch (error) {
      setError('err');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
  };


  const goToCategory = () => {
    navigateToPage(APP_NAVIGATION.CATEGORY);
  };
  const goToCart = () => {
    navigateToPage(APP_NAVIGATION.CART);
  };
  const gotoListProduct = (id, name) => {
    navigateToPage(APP_NAVIGATION.PRODUCTLIST, {categoryId: id, name: name});
    console.log(id);
  };
  const goToDetailProducts = (id: number) => {
    navigateToPage(APP_NAVIGATION.DETAILSPRODUCT, {productId: id});
  };

  const featchCart = async () => {
    if(user){
      const resultCart = await cartService.fetchCart(user?.id!);
      setData(resultCart.data);
      console.log(resultCart.data)
    }
  };
  useEffect(() => {
    if (dataFavorites.length > 0) {
      setDisplayedDataFavorite(dataFavorites);
    }
  }, [dataFavorites]);

  const fetchDataCategory = async () => {
    try {
      const categoryService = new CategoryService();
      const result = await categoryService.fetchCategory();
      setDataCategory(result.data);
      console.log(result.data.length);
    } catch (error) {
      setError('err');
    }
  };

  const fetchDataProduct = async () => {
    try {
      const productService = new ProductService();
      const result = await productService.getProduct();
      setDataProduct(result.data);
      setNewDataProduct(result.data.slice(0, 10));
      console.log('Data from fetchDataProduct:', result.data.length);
    } catch (error) {
      setError('err');
    }
  };
  

  const fetchDataFavorites = async () => {
    try {
      const productService = new ProductService();
      const result = await productService.getMostProduct();
      setDataFavorites(result.data.slice(0, 3));
      console.log('Data from favorite:', result.data.length);
    } catch (error) {
      setError('err');
    }
  }



  //Gợi ý hôm nay
  function ListItemSuggest({item, index}: {item: ProductModel; index: number}) {
    return (
      <TouchableScale
        key={index}
        onPress={() => console.log('da chon 1 item', goToDetailProducts(item.id))}
        activeScale={0.9}
        friction={9}
        tension={100}>
        <View style={styles.suggestItem}>
          <View style={styles.viewSuggestImage}>
            <Image source={{uri: item.images}} style={{width: '100%', height: '100%'}} />
          </View>

          <View style={styles.viewSuggestText}>
            <Text numberOfLines={1} style={styles.suggestTextName}>
              {item.name}
            </Text>
            <Text style={styles.text}>
              {new Intl.NumberFormat("vi-VN", config).format(
                item.price
              )}
            </Text>
            <View style={styles.viewStar}>
              <Image style={styles.imgStar} source={R.images.iconStar} />
              <Text style={styles.text}>{item.averageRating} </Text>
              <Text style={styles.textCmt}>({item.commentCount})</Text>
            </View>
          </View>
        </View>
      </TouchableScale>
    );
  }

  // danh muc
  function ListItemCategory({ item, index }: { item: CategoryModel, index: number }) {
    return (
      <TouchableScale
        key={index}
        onPress={() => gotoListProduct(item.id, item.name)}
        activeScale={0.9}
        friction={9}
        tension={100}>
        <View style={styles.categoryItem}>
          <View style={styles.viewCategoryImage}>
            <Image source={{uri: item.image}} style={styles.categoryImage} />
          </View>
          <View style={styles.viewCategoryText}>
            <Text numberOfLines={2} style={styles.viewCategoryTextName}>
              {item.name}
            </Text>
          </View>
        </View>
      </TouchableScale>
    );
  }

  

  //danh sach yeu thich
  function ListItemFavorite({item, index}: {item: ProductModel; index: number}) {
    return (
      <TouchableWithoutFeedback
        // onPress={() => {
        //   console.log('code Xem chi tiet data: ', item.name), goToDetailProducts(item.id);
        // }}>
        onPress={() => console.log('da chon 1 item', goToDetailProducts(item.id))}>
          
        <View style={styles.item}>
          <Image source={{uri: item.images}} style={styles.image} resizeMode="cover" />
          <View style={styles.overlay}>
            <View style={{flex: 4}}></View>
            <View style={{flex: 1.5, justifyContent: 'center', paddingHorizontal: vs(12)}}>
              <Text numberOfLines={1} style={styles.text}>
                {item.name}
              </Text>
            </View>
            <View
              style={{
                flex: 1.5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: vs(12),
              }}>
              <View style={styles.viewStar}>
                <Image style={styles.imgStar} source={R.images.iconStar} />
                <Text style={styles.text}>{item.averageRating} </Text>
                <Text style={styles.textCmt}>({item.commentCount})</Text>
              </View>
              <Text style={styles.text}>
                {new Intl.NumberFormat("vi-VN", config).format(
                  item.price
                )}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <View style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={() => navigateToPage(APP_NAVIGATION.SEARCH)}>
          <View style={styles.inputContainer}>
            <View style={{flex: 1.5, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{width: vs(20), height: vs(20)}} source={R.images.iconSearch} />
            </View>
            <View style={{flex: 9, height: '100%', justifyContent: 'center'}}>
              <Text style={styles.title}>Search...</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonContainer}>
          <BaseButton
            onPress={goToCart}
            renderIcon={
              <View>
                <Image style={{width: vs(35), height: vs(35)}} source={R.images.iconCart} />
                <View
                  style={{
                    height: 20,
                    width: 20,
                    backgroundColor: 'red',
                    position: 'absolute',
                    right: -5,
                    top: -5,
                    borderRadius: 20,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white'}}>{data.length}</Text>
                </View>
              </View>
            }
            style={{marginBottom: vs(10)}}
          />
        </View>
      </View>

      <View style={{flex: 9, backgroundColor: '#FBEFE5', paddingHorizontal: 8}}>
        {loading ? (
          <BaseLoading size={20} top={100} loading={true} />
        ) : (
          <ScrollView
            indicatorStyle="black"
            showsVerticalScrollIndicator={false}
            onScroll={handleEndReached}
            // scrollEnabled={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
            />
            }>

            <View style={{
              height: vs(168),
               marginTop: vs(8), 
               flex: 1,
               borderRadius: 10,
            }}>
              {displayedDataFavorite.length > 0 && (
                <Carousel data={dataFavorites}/>
              )}
              
            </View>

            <View style={styles.categoryView}>
              <View style={styles.contentWrapper}>
                <Text style={styles.titleText}>Danh mục</Text>
                <TouchableOpacity onPress={goToCategory}>
                  <View style={styles.viewButton}>
                    <Text style={styles.seeMoreText}>Xem thêm</Text>
                    <Image style={styles.rightArrowImage} source={R.images.iconRightArrow} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{height: '100%', marginTop: vs(6)}}>
                <FlatList
                  data={displayedDataCategory}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  // renderItem={({ item }) => <ListItemCategory item={item} index={0} />}
                  renderItem={({ item, index }) => <ListItemCategory item={item} index={index} />}

                />
              </View>
            </View>

            <View style={{ width: '100%', marginTop: vs(16), marginBottom: vs(8) }}>
              <Text style={styles.titleText}>Yêu thích nhiều nhất</Text>
              <FlatList
                data={dataFavorites}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
                contentContainerStyle={styles.flatListContainer}
                // renderItem={({ item }) => <ListItemFavorite item={item} index={0} />}
                renderItem={({ item, index }) => <ListItemFavorite item={item} index={index} />}
                scrollEnabled={false}
              />
            </View>

            <View style={{ width: '100%', paddingBottom: vs(30) }}>
              <Text style={[styles.titleText]}>Gợi ý</Text>
              <FlatList
                data={newDataProduct}
                keyExtractor={item => item.id.toString()}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
                horizontal={false}
                scrollEnabled={false}
                contentContainerStyle={styles.flatListSuggestContainer}
                renderItem={({ item }) => <ListItemSuggest item={item} index={0} />}
                // onEndReached={handleEndReached}
                // onEndReachedThreshold={0.1} 
              />
            </View>

            {isLoadingMore && (
              <View style={{ height: 100 }}>
                <BaseLoading size={30} top={0} loading={true} color={'#FF6900'} />
              </View>
            )}

          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);