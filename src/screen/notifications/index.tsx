import React, { useState } from 'react';

import { Text, SafeAreaView, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParam, MenuStackParam } from '@src/navigations/AppNavigation/stackParam';
import { MENU_NAVIGATION } from '@src/navigations/routes';
import { BottomPopup } from '../../containers/components/Base/BottomPopup'

// import Modal from 'react-native-modal';

export type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MenuStackParam, MENU_NAVIGATION.NOTIFICATIONS>,
  NativeStackNavigationProp<AppStackParam>
>;

interface Props {
  navigation: ScreenNavigationProps;
  route: RouteProp<MenuStackParam, MENU_NAVIGATION.NOTIFICATIONS>;
}

const popupList = [
  {
    id: 1,
    name: 'Task'
  },
  {
    id: 2,
    name: 'Message'
  },
  {
    id: 3,
    name: 'Note'
  }
]

const NotificationScreen = (props: Props) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0 });

  const handleItemPress = (op, layout) => {
    setSelectedFilter(op);

    // Check if layout is available before accessing its properties
    if (layout) {
      setArrowPosition({ x: layout.x, y: layout.y });
    }

    setModalVisible(true);
  };

  const filter = [
    {
      title: 'Giá từ',
      icon: 'shopping-cart',
      options: [
        { label: 'Dưới 5 triệu', value: 'duoi5trieu' },
        { label: 'Từ 5 - 10 triệu', value: 'tu5den10' },
        { label: 'Từ 10 - 15 triệu', value: 'tu10den15' },
        { label: 'Từ 15 - 20 triệu', value: 'tu15den20' },
        { label: 'Từ 20 - 25 triệu', value: 'tu20den25' },
        { label: 'Từ 25 - 30 triệu', value: 'tu25den30' },
        { label: 'Trên 30 triệu', value: 'tren30' },
      ],
      action: () => console.log('Thao gia')
    },
    {
      title: 'Màu sắc',
      icon: 'shopping-cart',
      options: [
        { label: 'Đen', value: 'black' },
        { label: 'Trắng', value: 'white' },
        { label: 'Xanh', value: 'blue' },
        { label: 'Hồng', value: 'pink' },
        { label: 'Tự nhiên', value: 'nature' },
      ],
      action: () => console.log("theo danh gia")
    },
    {
      title: 'Sắp xếp',
      icon: 'shopping-cart',
      options: [
        { label: 'Giá cao đến thấp', value: 'caodenthap' },
        { label: 'Giá thấp đến cao', value: 'thapdencao' },
        { label: 'Đánh giá', value: 'danhgia' },
        { label: 'Mới nhất', value: 'new' },
      ],
      action: () => console.log("theo danh gia")
    },
  ];

  const renderOptions = () => {
    if (!selectedFilter) return null;

    return selectedFilter.options.map((option, index) => (
        <TouchableOpacity
          style={{ padding: 10, borderBottomWidth: index === selectedFilter.options.length - 1 ? 0 : 1 }}
          key={index}
          onPress={() => {
            console.log(option.value); // xử lý khi lựa chọn option
            setModalVisible(false);
          }}>
          <Text>{option.label}</Text>
        </TouchableOpacity>
    ));
  };


  return (

  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
      
    </View>
  );
};

export default React.memo(NotificationScreen);
