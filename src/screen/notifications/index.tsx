import React, { useState } from 'react';

import { Text, SafeAreaView, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParam, MenuStackParam } from '@src/navigations/AppNavigation/stackParam';
import { MENU_NAVIGATION } from '@src/navigations/routes';
import { BottomPopup } from '../../containers/components/Base/BottomPopup'

import Modal from 'react-native-modal';

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
      {filter.map((op, i) => (
        <View key={i}>
          <TouchableOpacity
            onPress={(e) => handleItemPress(op, e.nativeEvent.layout)}
          >
            <Text>{op.title}</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            {renderOptions()}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Hủy</Text>
            </TouchableOpacity>
          </View>
          {/* Render the arrow */}
          <View
            style={{
              position: 'absolute',
              top: arrowPosition.y - 10,
              left: arrowPosition.x - 10,
              width: 0,
              height: 0,
              borderLeftWidth: 10,
              borderRightWidth: 10,
              borderBottomWidth: 10,
              borderStyle: 'solid',
              backgroundColor: 'transparent',
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: 'white',
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(NotificationScreen);
