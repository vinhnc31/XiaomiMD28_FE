/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RouteProp, useNavigation } from '@react-navigation/native';
import styles from './styles';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MenuStackParam } from '@src/navigations/AppNavigation/stackParam';
import { MENU_NAVIGATION, GUEST_NAVIGATION } from '@src/navigations/routes';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, ScrollView, View, TouchableOpacity, Image, TouchableWithoutFeedback, FlatList, RefreshControl, SectionList } from 'react-native';
import { BaseButton } from '@src/containers/components/Base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BaseLoading } from '@src/containers/components/Base/BaseLoading';
import Swiper from 'react-native-swiper';
import { navigateToPage } from '@src/navigations/services';

import { ListItemSuggest, ListItemCategory, ListItemFavorite, Movie} from './homeFlatlist';

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

  useEffect(() => {
    // Chỉ kích hoạt làm mới nếu refreshing đã được đặt thành true
    setLoading(false);
    if (refreshing) {
      fetchData()
        .then(() => setRefreshing(false))
        .catch(() => setRefreshing(false));
    } else {
      fetchData()
    }
  }, [refreshing]); // Sử dụng mảng phụ thuộc để chỉ kích hoạt khi refreshing thay đổi

  const onRefresh = () => {
    setRefreshing(true);
    fetchData()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  const goToCategory = () => {
    navigateToPage(GUEST_NAVIGATION.CATEGORY)
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://6399d10b16b0fdad774a46a6.mockapi.io/booCar');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError("err");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white', padding: 8 }}>
      <View style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={() => console.log("code chuyen man")}>
          <View style={styles.inputContainer}>
            <View style={{ flex: 1.5, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require('../../assets/images/search.png')}
              />
            </View>
            <View style={{ flex: 9, height: '100%', justifyContent: 'center' }}>
              <Text style={styles.title}>Search...</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonContainer}>
          <BaseButton
            onPress={() => console.log('Press')}
            renderIcon={<Icon name="shopping-cart" size={30} color="black"  style={{width: 30, marginRight: 2}}/>}
            style={{ backgroundColor: 'white', marginBottom: 8}}
          />
        </View>
      </View>

      {loading ? <BaseLoading size={20} top={100} loading={true} /> : (
        <ScrollView indicatorStyle="black" showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          <View style={{ height: 168, marginTop: 16, borderRadius: 50, marginHorizontal: 16}}>
            <Swiper showsButtons={false} loop={true} autoplay={true} autoplayTimeout={3}>
              {data1.map((item) => (
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
                  <Image
                    style={styles.rightArrowImage}
                    source={require('../../assets/images/right-arrow.png')}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ height: '100%', marginTop: 8 }}>
              <FlatList
                data={data1}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <ListItemCategory item={item} />}
              />
            </View>
          </View>

          <View style={{ width: '100%',marginTop: 24, marginBottom: 8, paddingHorizontal: 16}}>
            <Text style={styles.titleText}>Yêu thích gần nhất</Text>
            <FlatList
              data={displayedData}
              keyExtractor={(item) => item.id}
              horizontal={true}
              contentContainerStyle={styles.flatListContainer}
              renderItem={({ item }) => <ListItemFavorite item={item} />}
              scrollEnabled={false}
            />
          </View>

          <View style={{ width: '100%', paddingBottom: 100, paddingHorizontal: 8 }}>
            <Text style={[styles.titleText, {paddingHorizontal: 8 }]}>Gợi ý hôm nay</Text>
            <FlatList
              data={data1}
              keyExtractor={(item) => item.id}
              numColumns={2}
              horizontal={false}
              scrollEnabled={false}
              contentContainerStyle={styles.flatListSuggestContainer}
              renderItem={({ item }) => <ListItemSuggest item={item} />}
            />
          </View>
        </ScrollView>)}
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);
