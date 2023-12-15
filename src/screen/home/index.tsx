import { RouteProp, useNavigation } from '@react-navigation/native';
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
  ActivityIndicator,
  ScrollViewProps
} from 'react-native';
import { BaseButton } from '@src/containers/components/Base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BaseLoading } from '@src/containers/components/Base/BaseLoading';
import Swiper from 'react-native-swiper';
import { navigateToPage } from '@src/navigations/services';

import * as Animatable from 'react-native-animatable';

import { Movie } from './homeFlatlist';
import TouchableScale from 'react-native-touchable-scale';
import CategoryService from '@src/services/category';
import { CategoryModel } from '@src/services/category/category.model';
import ProductService from '@src/services/product';
import { ProductModel } from '@src/services/product/product.model';
import R from '@src/res';
import { vs, width } from '@src/styles/scalingUtils';

import Carousel from './Slideshow'

import { throttle } from 'lodash';


interface Props {
  navigation: BottomTabNavigationProp<MenuStackParam>;
  route: RouteProp<MenuStackParam, MENU_NAVIGATION.HOME>;
}

const HomeScreen = (props: Props) => {
  const [dataProduct, setDataProduct] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [showAll, setShowAll] = useState(false);
  const displayedData1 = showAll ? dataProduct : dataProduct.slice(0, 3);

  const [dataCategory, setDataCategory] = useState<CategoryModel[]>([]);
  const [showAllCategory, setShowAllCategory] = useState(false);
  const displayedDataCategory = showAllCategory ? dataCategory : dataCategory.slice(0, 5);

  const [dataFavorites, setDataFavorites] = useState<ProductModel[]>([]);


  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };

  const [displayedDataFavorite, setDisplayedDataFavorite] = useState<ProductModel[]>([]);


  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);


  const [newDataProduct, setNewDataProduct] = useState<ProductModel[]>([]);


  useEffect(() => {
    fetchData();
  }, [refreshing]);

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
    navigateToPage(APP_NAVIGATION.PRODUCTLIST, { categoryId: id, name: name });
    console.log(id);
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
      // console.log(result.data.length);
    } catch (error) {
      setError('err');
    }
  };

  const fetchDataProduct = async () => {
    try {
      const productService = new ProductService();
      const result = await productService.getProduct();
      setNewDataProduct(result.data.slice(0, 6));
    } catch (error) {
      setError('err');
    }
  }

  const fetchDataFavorites = async () => {
    try {
      const productService = new ProductService();
      const result = await productService.getMostProduct();
      setDataFavorites(result.data.slice(0, 3));
      // console.log('Data from favorite:', result.data.length);
    } catch (error) {
      setError('err');
    }
  }

  const loadMoreData = async () => {
    if (!isLoadingMore && hasMoreData) {
      try {
        setIsLoadingMore(true);
        const newPage = page + 1;
        const productService = new ProductService();
        const newData = await productService.getProductByLimit((newPage - 1) * 20, 20);
  
        console.log('Data from loadMoreData:', newData.data.length);
        console.log(`Loaded data for page ${newPage}: ${newData.data.length} items`);
  
        if (newData.data.length > 0) {
          setNewDataProduct((prevData) => [...prevData, ...newData.data]);
          setPage(newPage);
        } else {
          setHasMoreData(false);
        }
      } catch (error) {
        console.error('Error in loadMoreData:', error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  };
  



  //Gợi ý hôm nay
  function ListItemSuggest({ item, index }: { item: ProductModel, index: number }) {
    return (
      <TouchableScale
        key={index}
        onPress={() => {
          // if (!loadingMore) {
          console.log('ListItemSuggest pressed:', item.id);
          // Thêm phần code xử lý khi item được nhấn
          // }
        }}
        activeScale={0.9}
        friction={9}
        tension={100}>
        <View style={styles.suggestItem}>
          <View style={styles.viewSuggestImage}>
            <Image
              source={{ uri: item.images }}
              style={{ width: '100%', height: '100%' }} />
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
      <TouchableScale key={index} onPress={() => gotoListProduct(item.id, item.name)} activeScale={0.9} friction={9} tension={100}>
        <View style={styles.categoryItem}>
          <View style={styles.viewCategoryImage}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
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
  function ListItemFavorite({ item, index }: { item: ProductModel, index: number }) {
    return (
      <TouchableWithoutFeedback key={index} onPress={() => console.log('code Xem chi tiet data: ', item.name)}>
        <View style={styles.item}>
          <Image source={{ uri: item.images }} style={styles.image} resizeMode="cover" />
          <View style={styles.overlay}>
            <View style={{ flex: 4 }}></View>
            <View style={{ flex: 1.5, justifyContent: 'center', paddingHorizontal: vs(12) }}>
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

  const [isEndReached, setIsEndReached] = useState(false);

  const throttledLoadMoreData = throttle(loadMoreData, 200);

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <View style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={() => navigateToPage(APP_NAVIGATION.SEARCH)}>
          <View style={styles.inputContainer}>
            <View style={{ flex: 1.5, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ width: vs(20), height: vs(20) }} source={R.images.iconSearch} />
            </View>
            <View style={{ flex: 9, height: '100%', justifyContent: 'center' }}>
              <Text style={styles.title}>Search...</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonContainer}>
          <BaseButton
            onPress={goToCart}
            renderIcon={<Image style={{ width: vs(30), height: vs(30) }} source={R.images.iconCart} />}
            style={{ marginBottom: vs(10) }}
          />
        </View>
      </View>

      <View style={{ flex: 9, backgroundColor: '#FBEFE5', paddingHorizontal: 8 }}>
        {loading ? (
          <BaseLoading size={20} top={100} loading={true} />
        ) : (

          <ScrollView
            indicatorStyle="black"
            showsVerticalScrollIndicator={false}
           
            onScroll={(event) => {
              const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
          
              const paddingToBottom = 20;
              setIsEndReached(
                layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom
              );
          
              // Thêm điều kiện để gọi loadMoreData khi cuộn đến cuối trang
              if (isEndReached) {
                loadMoreData();
              }
            }}

            // onScroll={(event) => {
            //   const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
            //   const paddingToBottom = 20;
          
            //   if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            //     throttledLoadMoreData();
            //   }
            // }}
            // scrollEnabled={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
            />
            }>

            <View style={{
              height: vs(168),
              marginTop: vs(8),
              flex: 1,
              borderRadius: 10,
              backgroundColor: 'red',
            }}>
              {displayedDataFavorite.length > 0 && (
                <Carousel data={dataFavorites} />
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
              <View style={{ height: '100%', marginTop: vs(6) }}>
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
              <Text style={[styles.titleText]}>Gợi ý hôm nay</Text>
              <FlatList
                data={newDataProduct}
                keyExtractor={item => item.id.toString()}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
                horizontal={false}
                scrollEnabled={false}
                contentContainerStyle={styles.flatListSuggestContainer}
                renderItem={({ item }) => <ListItemSuggest item={item} index={0} />}
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
