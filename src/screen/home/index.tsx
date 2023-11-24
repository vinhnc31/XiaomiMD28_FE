import { RouteProp, useNavigation } from '@react-navigation/native';
import styles from './styles';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MenuStackParam } from '@src/navigations/AppNavigation/stackParam';
import { MENU_NAVIGATION, APP_NAVIGATION } from '@src/navigations/routes';
import React, { useEffect, useState } from 'react';
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
  Easing
} from 'react-native';
import { BaseButton } from '@src/containers/components/Base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BaseLoading } from '@src/containers/components/Base/BaseLoading';
import Swiper from 'react-native-swiper';
import { navigateToPage } from '@src/navigations/services';

import { Movie } from './homeFlatlist';
import TouchableScale from 'react-native-touchable-scale';
import CategoryService from '@src/services/category';
import { CategoryModel } from '@src/services/category/category.model';
import ProductService from '@src/services/product';
import { ProductModel } from '@src/services/product/product.model';
import R from '@src/res';
import {vs} from '@src/styles/scalingUtils';


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
  const displayedData = showAll ? dataProduct : dataProduct.slice(0, 3);

  const [dataCategory, setDataCategory] = useState<CategoryModel[]>([]);
  const [showAllCategory, setShowAllCategory] = useState(false);
  const displayedDataCategory = showAllCategory ? dataCategory : dataCategory.slice(0, 5);

  const limitedData = dataProduct.slice(0, 5);
  const animatedValues = limitedData.map(() => new Animated.Value(0));

  const [activeIndex, setActiveIndex] = useState(0);

  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };

  useEffect(() => {
    if (refreshing) {
      setRefreshing(false); // Đặt refreshing thành false trước khi tải lại để tránh tác động lặp
      fetchDataCategory()
      fetchDataProduct()
        .then(() => setRefreshing(false))
        .catch(() => setRefreshing(false));
    } else {
      fetchDataCategory();
      fetchDataProduct()
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
    navigateToPage(APP_NAVIGATION.PRODUCTLIST, { categoryId: id, name: name });
    console.log(id);
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

  }

  //Gợi ý hôm nay
  function ListItemSuggest({ item }: { item: ProductModel }) {
    return (
      <TouchableScale
        onPress={() => console.log('da chon 1 item', item.id)}
        activeScale={0.9}
        friction={9}
        tension={100}>
        <View style={styles.suggestItem}>
          <View style={styles.viewSuggestImage}>
            <Image
              source={{ uri: item.images }}
              style={{ width: '90%', height: '100%' }} />
          </View>
          <View style={{ flex: 0.5 }} />

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
              <Text style={styles.text}>4.9 </Text>
              <Text style={styles.textCmt}>(50)</Text>
            </View>
          </View>
        </View>
      </TouchableScale>
    );
  }

  // danh muc
  function ListItemCategory({ item }: { item: CategoryModel }) {
    return (
      <TouchableScale onPress={() => gotoListProduct(item.id, item.name)} activeScale={0.9} friction={9} tension={100}>
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
  function ListItemFavorite({ item }: { item: ProductModel }) {
    return (
      <TouchableWithoutFeedback onPress={() => console.log('code Xem chi tiet data: ', item.name)}>
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
                <Text style={styles.text}>4.9</Text>
                <Text style={styles.textCmt}>(50)</Text>
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

      <View style={{ flex: 9, backgroundColor: '#FBEFE5' }}>
        {loading ? (
          <BaseLoading size={20} top={100} loading={true} />
        ) : (

          <ScrollView
            indicatorStyle="black"
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

            <View style={{ height: vs(160), marginTop: vs(8), borderRadius: vs(50), marginHorizontal: vs(12) }}>
              <Swiper
                loop={true}
                showsButtons={false}
                showsHorizontalScrollIndicator={true}
                pagingEnabled={true}
                autoplayTimeout={2}
                autoplayDirection={true}
                autoplay={true}
                showsPagination={true} // Tắt chấm tròn mặc định
              >
                {dataCategory.map(item => (
                  <View style={styles.slide} key={item.id}>
                    <Image source={{ uri: item.image }} style={styles.image1} />
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
              <View style={{ height: '100%', marginTop: vs(6) }}>
                <FlatList
                  data={displayedDataCategory}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => <ListItemCategory item={item} />}
                />
              </View>
            </View>

            <View style={{ width: '100%', marginTop: vs(16), marginBottom: vs(8), paddingHorizontal: vs(16) }}>
              <Text style={styles.titleText}>Yêu thích nhiều nhất</Text>
              <FlatList
                data={displayedData}
                // keyExtractor={item => item.id.toString()}
                horizontal={true}
                contentContainerStyle={styles.flatListContainer}
                renderItem={({ item }) => <ListItemFavorite item={item} />}
                scrollEnabled={false}
              />
            </View>

            <View style={{ width: '100%', paddingBottom: vs(30), paddingHorizontal: vs(8) }}>
              <Text style={[styles.titleText, { paddingHorizontal: vs(8) }]}>Gợi ý hôm nay</Text>
              <FlatList
                data={dataProduct}
                // keyExtractor={item => item.id.toString()}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
                horizontal={false}
                scrollEnabled={false}
                contentContainerStyle={styles.flatListSuggestContainer}
                renderItem={({ item }) => <ListItemSuggest item={item} />}
              />
            </View>

          </ScrollView>)}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);
