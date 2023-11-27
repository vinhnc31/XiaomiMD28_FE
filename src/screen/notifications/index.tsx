import React from 'react';

import { Text, SafeAreaView, Button, View, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParam, MenuStackParam } from '@src/navigations/AppNavigation/stackParam';
import { MENU_NAVIGATION } from '@src/navigations/routes';
import { BottomPopup } from '../../containers/components/Base/BottomPopup'
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



const NotificationScreen = (props: Props) => {

 
  return (

  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
      
    </View>
  );
};

export default React.memo(NotificationScreen);
