/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {RouteProp, useNavigation} from '@react-navigation/native';
import styles from './styles';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MenuStackParam } from '@src/navigations/AppNavigation/stackParam';
import { MENU_NAVIGATION, APP_NAVIGATION } from '@src/navigations/routes';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, ScrollView, View, TouchableOpacity, Image, TouchableWithoutFeedback, FlatList, RefreshControl, SectionList, Dimensions } from 'react-native';
import { BaseButton } from '@src/containers/components/Base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BaseLoading} from '@src/containers/components/Base/BaseLoading';
import Swiper from 'react-native-swiper';
import { navigateToPage } from '@src/navigations/services';

import { Movie } from './homeFlatlist';
import TouchableScale from 'react-native-touchable-scale';
import CategoryService from '@src/services/category';
import { CategoryModel } from '@src/services/category/category.model';

interface Props {
  navigation: BottomTabNavigationProp<MenuStackParam>;
  route: RouteProp<MenuStackParam, MENU_NAVIGATION.HOME>;
}

const HomeScreen = (props: Props) => {
  const [data1, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [showAll, setShowAll] = useState(false);
  const displayedData = showAll ? data1 : data1.slice(0, 3);

  const [dataCategory, setDataCategory] = useState<CategoryModel[]>([]);
  const [showAllCategory, setShowAllCategory] = useState(false);
  const displayedDataCategory = showAllCategory ? dataCategory : dataCategory.slice(0, 5);

  const limitedData = data1.slice(0, 5);

  useEffect(() => {
    if (refreshing) {
      setRefreshing(false); // Đặt refreshing thành false trước khi tải lại để tránh tác động lặp
      // fetchData()
      fetchDataCategory()
      // fetchDataTogether()
        // .then(() => fetchDataCategory())
        .then(() => fetchData())
        .then(() => setRefreshing(false))
        .catch(() => setRefreshing(false));
    } else {
      fetchData();
    }
  }, [refreshing]);
  
  const onRefresh = () => {
    setRefreshing(true);
  };

  const goToCategory = () => {
    navigateToPage(APP_NAVIGATION.CATEGORY)
  };

  const gotoListProduct = (id) => {
    navigateToPage(APP_NAVIGATION.PRODUCTLIST, { id: id })
    console.log("categoryId", id)
  }

  const fetchData = async () => {
    try {
      const response = await fetch('https://6399d10b16b0fdad774a46a6.mockapi.io/booCar');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError('err');
    }
  };

  const fetchDataCategory = async () => {
    try {
      const categoryService = new CategoryService();
      const result = await categoryService.fetchCategory();
      setDataCategory(result.data);
    } catch (error) {
      setError("err");
    }
  };


  const fetchDataTogether = async () => {
    try {
      // Sử dụng Promise.all để gọi cả hai hàm cùng nhau và đợi chúng hoàn thành.
      await Promise.all([fetchData(), fetchDataCategory()]);
      // Sau khi cả hai hàm hoàn thành, bạn có thể thực hiện bất kỳ hành động tiếp theo ở đây.
    } catch (error) {
      // Xử lý lỗi nếu cần.
    }
  };

  //Gợi ý hôm nay
  function ListItemSuggest({ item }: { item: Movie }) {
    return (
      <TouchableScale onPress={() => console.log("da chon 1 item", item.id)} activeScale={0.9} friction={9} tension={100}>
        <View style={styles.suggestItem}>
          <View style={styles.viewSuggestImage}>
            <Image
              source={{ uri: item.image }}
              style={{ width: '70%', height: '90%' }}
            />
          </View>
          <View style={{ flex: 0.5 }} />

          <Image style={{ width: 30, height: 35, position: 'absolute', left: 16, bottom: 75 }}
            source={require('../../assets/images/hot2.png')}
          />
          <View style={styles.viewSuggestText}>
            <Text numberOfLines={1} style={styles.suggestTextName}>{item.name}</Text>
            <Text style={styles.text}>{item.price}<Text style={{ textDecorationLine: 'underline', color: 'red' }}>đ</Text></Text>
            <View style={styles.viewStar}>
              <Image
                style={styles.imgStar}
                source={require('../../assets/images/star4.png')}
              />
              <Text style={styles.text}>4.9</Text>
              <Text style={styles.textCmt}>(50)</Text>
            </View>
          </View>
        </View>
      </TouchableScale>
    );
  }

  // danh muc
  function ListItemCategory({ item }: { item: Movie }) {
    return (
      <TouchableScale onPress={() => gotoListProduct(item.id)} activeScale={0.9} friction={9} tension={100}>
        <View style={styles.categoryItem}>
          <View style={styles.viewCategoryImage}>
            <Image
              source={{ uri: item.image }}
              style={styles.categoryImage}
            />
          </View>
          <View style={styles.viewCategoryText}>
            <Text numberOfLines={2} style={styles.viewCategoryTextName}>{item.name}</Text>
          </View>
        </View>
      </TouchableScale>

    )
  }

  //danh sach yeu thich
  function ListItemFavorite({ item }: { item: Movie }) {
    return (
      <TouchableWithoutFeedback onPress={() => console.log("code Xem chi tiet data: ", item.name)}>
        <View style={styles.item}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="stretch" />
          <View style={styles.overlay}>
            <View style={{ flex: 4 }}></View>
            <View style={{ flex: 1.5, justifyContent: 'center', paddingHorizontal: 12 }}>
              <Text numberOfLines={1} style={styles.text}>{item.name}</Text>
            </View>
            <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12 }}>
              <View style={styles.viewStar}>
                <Image
                  style={styles.imgStar}
                  source={require('../../assets/images/star4.png')}
                />
                <Text style={styles.text}>4.9</Text>
                <Text style={styles.textCmt}>(50)</Text>
              </View>
              <Text style={styles.text}>{item.price}<Text style={{ textDecorationLine: 'underline', color: 'red' }}>đ</Text></Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }



  return (
    <SafeAreaView style={{backgroundColor: 'white', padding: 8}}>
      <View style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={() => console.log('code chuyen man')}>
          <View style={styles.inputContainer}>
            <View style={{flex: 1.5, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{width: 20, height: 20}} source={require('../../assets/images/search.png')} />
            </View>
            <View style={{flex: 9, height: '100%', justifyContent: 'center'}}>
              <Text style={styles.title}>Search...</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonContainer}>
          <BaseButton
            onPress={() => console.log('Press')}
            renderIcon={<Icon name="shopping-cart" size={30} color="black" />}
            style={{backgroundColor: 'white', marginBottom: 8}}
          />
        </View>
      </View>

      {loading ? (
        <BaseLoading size={20} top={100} loading={true} />
      ) : (
        <ScrollView
          indicatorStyle="black"
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={{ height: 160, marginTop: 16, borderRadius: 50, marginHorizontal: 16 }}>
            <Swiper showsButtons={false} loop={true} autoplay={true} autoplayTimeout={3} showsPagination={true}>
              {limitedData.map((item) => (
                <View style={styles.slide} key={item.id}>
                  <TouchableWithoutFeedback onPress={() => console.log("da click de xem chi tiet:", item.name)}>

                    <Image source={{ uri: item.image }} style={styles.image1} />
                  </TouchableWithoutFeedback>

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
                  <Image style={styles.rightArrowImage} source={require('../../assets/images/right-arrow.png')} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{height: '100%', marginTop: 8}}>
              <FlatList
                data={displayedDataCategory}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <ListItemCategory item={item} />}
              />
            </View>
          </View>

          <View style={{ width: '100%', marginTop: 16, marginBottom: 8, paddingHorizontal: 16 }}>
            <Text style={styles.titleText}>Yêu thích nhiều nhất</Text>
            <FlatList
              data={displayedData}
              keyExtractor={item => item.id}
              horizontal={true}
              contentContainerStyle={styles.flatListContainer}
              renderItem={({ item }) => <ListItemFavorite item={item} />}
              scrollEnabled={false}
            />
          </View>


          {/* //Gợi ý hôm nay */}
          <View style={{ width: '100%', paddingBottom: 100, paddingHorizontal: 8 }}>
            <Text style={[styles.titleText, { paddingHorizontal: 8 }]}>Gợi ý hôm nay</Text>
            <FlatList
              data={data1}
              keyExtractor={(item) => item.id}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              numColumns={2}
              horizontal={false}
              scrollEnabled={false}
              contentContainerStyle={styles.flatListSuggestContainer}
              renderItem={({ item }) => <ListItemSuggest item={item} />}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);
