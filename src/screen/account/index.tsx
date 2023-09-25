import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuStackParam} from '@src/navigations/AppNavigation/stackParam';
import {GuestStackParam} from '@src/navigations/GuestNavigation/stackParam';
import {MENU_NAVIGATION} from '@src/navigations/routes';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
interface Props {
  navigation: ScreenNavigationProps;
  route: RouteProp<GuestStackParam, MENU_NAVIGATION.ACCOUNT>;
}

type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MenuStackParam, MENU_NAVIGATION.FAVORITE>,
  NativeStackNavigationProp<GuestStackParam>
>;

const AccountScreen = (props: Props) => {
  return (
    <SafeAreaView>
      <Text>Tài khoản</Text>
    </SafeAreaView>
  );
};

export default React.memo(AccountScreen);
