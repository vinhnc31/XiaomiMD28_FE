import React from 'react';

import {Text, SafeAreaView} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParam, MenuStackParam} from '@src/navigations/AppNavigation/stackParam';
import {MENU_NAVIGATION} from '@src/navigations/routes';

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
    <SafeAreaView>
      <Text>Notifications</Text>
    </SafeAreaView>
  );
};

export default React.memo(NotificationScreen);
