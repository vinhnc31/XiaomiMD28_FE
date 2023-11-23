import React, { useEffect, useRef, useState } from 'react';

import { Text, SafeAreaView, Button, View, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParam, MenuStackParam } from '@src/navigations/AppNavigation/stackParam';
import { MENU_NAVIGATION } from '@src/navigations/routes';
import { BottomPopup } from '../../containers/components/Base/BottomPopup'

import Modal from 'react-native-modal';
import { CategoryModel } from '@src/services/category/category.model';
import CategoryService from '@src/services/category';

export type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MenuStackParam, MENU_NAVIGATION.NOTIFICATIONS>,
  NativeStackNavigationProp<AppStackParam>
>;

interface Props {
  navigation: ScreenNavigationProps;
  route: RouteProp<MenuStackParam, MENU_NAVIGATION.NOTIFICATIONS>;
}

const { width } = Dimensions.get('window');

const images = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
];

const NotificationScreen = (props: Props) => {

 const [dataCategory, setDataCategory] = useState<CategoryModel[]>([]);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);


  const fetchDataCategory = async () => {
    try {
      const categoryService = new CategoryService();
      const result = await categoryService.fetchCategory();
      setDataCategory(result.data);
      console.log(result.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.floor(contentOffset.x / width);
    setCurrentIndex(index);
  };

  const scrollToNext = () => {
    if (currentIndex < dataCategory.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      flatListRef.current.scrollToIndex({ index: 0 });
    }
  };

  useEffect(() => {
    fetchDataCategory()
  }, [])

  useEffect(() => {
    const intervalId = setInterval(scrollToNext, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  
  const renderPagination = () => (
    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 10, right: 10 }}>
      {dataCategory.map((_, i) => (
        <View
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            margin: 3,
            backgroundColor: i === currentIndex ? '#007aff' : '#ccc',
          }}
        />
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: item.image }} style={{ width, height: 160 }} resizeMode="cover" />
    </View>
  );


  return (

    <View style={{ height: 160, alignItems: 'center'}}>
    <FlatList
      ref={flatListRef}
      data={dataCategory}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      onScroll={handleScroll}
    />
    {renderPagination()}
  </View>
  );
};

export default React.memo(NotificationScreen);
