import React, { createRef, useCallback, useEffect, useState } from 'react';

import { Text, SafeAreaView, Button, View, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image, Modal, TextInput, useWindowDimensions } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParam, MenuStackParam } from '@src/navigations/AppNavigation/stackParam';
import { MENU_NAVIGATION } from '@src/navigations/routes';
import styles from "./styles"



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
    <SafeAreaView style={styles.container}>
      
    </SafeAreaView>
  );
  

 
};

export default React.memo(NotificationScreen);

