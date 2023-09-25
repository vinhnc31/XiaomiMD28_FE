/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {RouteProp} from '@react-navigation/native';
import styles from './styles';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MenuStackParam} from '@src/navigations/AppNavigation/stackParam';
import {MENU_NAVIGATION} from '@src/navigations/routes';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';

interface Props {
  navigation: BottomTabNavigationProp<MenuStackParam>;
  route: RouteProp<MenuStackParam, MENU_NAVIGATION.HOME>;
}

const HomeScreen = (props: Props) => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);
