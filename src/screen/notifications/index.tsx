import React, { useState } from 'react';

import { Text, SafeAreaView, Button, View, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image, Modal, TextInput } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParam, MenuStackParam } from '@src/navigations/AppNavigation/stackParam';
import { MENU_NAVIGATION } from '@src/navigations/routes';
import { BottomPopup } from '../../containers/components/Base/BottomPopup'
import { CategoryModel } from '@src/services/category/category.model';
import CategoryService from '@src/services/category';
import SelectDropdown from 'react-native-select-dropdown'
import DropDownPicker from 'react-native-dropdown-picker';
import { ProductModel } from '@src/services/product/product.model';
import ProductService from '@src/services/product';

export type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MenuStackParam, MENU_NAVIGATION.NOTIFICATIONS>,
  NativeStackNavigationProp<AppStackParam>
>;

interface Props {
  navigation: ScreenNavigationProps;
  route: RouteProp<MenuStackParam, MENU_NAVIGATION.NOTIFICATIONS>;
}



const NotificationScreen = (props: Props) => {

  const countries = ["Egypt", "Canada", "Australia", "Ireland"]
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);




  return (

    <View style={{ flex: 1, justifyContent: 'space-around' }}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <Text>Selected Item: {value ? value : 'None'}</Text>
    </View>

   
  );
};

export default React.memo(NotificationScreen);
