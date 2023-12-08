import {RouteProp, useNavigation} from '@react-navigation/native';
import styles from './styles';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MenuStackParam} from '@src/navigations/AppNavigation/stackParam';
import {MENU_NAVIGATION, APP_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {BaseButton} from '@src/containers/components/Base';
import Icon from 'react-native-vector-icons/FontAwesome';
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
import {vs} from '@src/styles/scalingUtils';
import CartService from '@src/services/cart';
import {useAuth} from '@src/hooks/useAuth';
import {CartModel} from '@src/services/cart/cart.model';
import useNotificationPermission from '../../hooks/useNotificationPermission';

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
  const displayedData = showAll ? dataProduct : dataProduct.slice(0, 3);

  const displayedDataSuggest = showAll ? dataProduct : dataProduct.slice(0, 10);

  const [dataCategory, setDataCategory] = useState<CategoryModel[]>([]);
  const [showAllCategory, setShowAllCategory] = useState(false);
  const displayedDataCategory = showAllCategory ? dataCategory : dataCategory.slice(0, 5);

  const limitedData = dataProduct.slice(0, 5);
  const animatedValues = limitedData.map(() => new Animated.Value(0));

  const [activeIndex, setActiveIndex] = useState(0);
  const cartService = new CartService();
  const {user} = useAuth();
  useNotificationPermission();
  const config = {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 9,
  };

  useEffect(() => {
    if (refreshing) {
      setRefreshing(false); // Đặt refreshing thành false trước khi tải lại để tránh tác động lặp
      fetchDataCategory();
      fetchDataProduct()
        .then(() => setRefreshing(false))
        .catch(() => setRefreshing(false));
    } else {
      featchCart();
      fetchDataCategory();
      fetchDataProduct();
    }
  }, [refreshing]);
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
    const resultCart = await cartService.fetchCart(user?.id!);
    setData(resultCart.data);
  };
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
      console.log(result.data.length);
    } catch (error) {
      setError('err');
    }
  };

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
            <Text style={styles.text}>{new Intl.NumberFormat('vi-VN', config).format(item.price)}</Text>
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
  function ListItemCategory({item, index}: {item: CategoryModel; index: number}) {
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
        onPress={() => {
          console.log('code Xem chi tiet data: ', item.name), goToDetailProducts(item.id);
        }}>
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
              <Text style={styles.text}>{new Intl.NumberFormat('vi-VN', config).format(item.price)}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
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
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={{height: vs(160), marginTop: vs(8), borderRadius: vs(50)}}>
              <Swiper
                loop={true}
                autoplayTimeout={3}
                autoplay={true}
                showsPagination={true} // Tắt chấm tròn mặc định
                dotColor="gray"
                activeDotColor="#FF6900">
                {displayedDataCategory.map(item => (
                  <View style={styles.slide} key={item.id}>
                    <Image source={{uri: item.image}} style={styles.image1} />
                  </View>
                ))}
              </Swiper>
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
                  renderItem={({item}) => <ListItemCategory item={item} index={0} />}
                />
              </View>
            </View>

            <View style={{width: '100%', marginTop: vs(16), marginBottom: vs(8)}}>
              <Text style={styles.titleText}>Yêu thích nhiều nhất</Text>
              <FlatList
                data={displayedData}
                // keyExtractor={item => item.id.toString()}
                horizontal={true}
                contentContainerStyle={styles.flatListContainer}
                renderItem={({item}) => <ListItemFavorite item={item} index={0} />}
                scrollEnabled={false}
              />
            </View>

            <View style={{width: '100%', paddingBottom: vs(30)}}>
              <Text style={[styles.titleText]}>Gợi ý hôm nay</Text>
              <FlatList
                data={displayedDataSuggest}
                // keyExtractor={item => item.id.toString()}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                numColumns={2}
                horizontal={false}
                scrollEnabled={false}
                contentContainerStyle={styles.flatListSuggestContainer}
                renderItem={({item}) => <ListItemSuggest item={item} index={0} />}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);
