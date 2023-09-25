/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MENU_NAVIGATION} from '@src/navigations/routes';
import {Colors} from '@src/styles/colors';
import React from 'react';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import {MenuStackParam} from './stackParam';
import styles from './styles';
import {Text} from 'react-native';
import HomeScreen from '@src/screen/home';
import FavoriteScreen from '@src/screen/favorite';
import NotificationsScreen from '@src/screen/notifications';
import AccountScreen from '@src/screen/account';
const Tab = createBottomTabNavigator<MenuStackParam>();

const RootScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName={MENU_NAVIGATION.HOME}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
      }}>
      <Tab.Screen
        name={MENU_NAVIGATION.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.tabBarActiveLabelStyle : styles.tabBarLabelStyle}>Trang chủ</Text>
          ),
          tabBarIcon: ({color, size}) => <IoniconsIcons name="home-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={MENU_NAVIGATION.FAVORITE}
        component={FavoriteScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.tabBarActiveLabelStyle : styles.tabBarLabelStyle}>Yêu thích</Text>
          ),
          tabBarIcon: ({color, size}) => <IoniconsIcons name="document-text-outline" color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name={MENU_NAVIGATION.NOTIFICATIONS}
        component={NotificationsScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.tabBarActiveLabelStyle : styles.tabBarLabelStyle}>Thông báo</Text>
          ),
          tabBarIcon: ({color, size}) => <IoniconsIcons name="notifications-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={MENU_NAVIGATION.ACCOUNT}
        component={AccountScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.tabBarActiveLabelStyle : styles.tabBarLabelStyle}>Tài khoản</Text>
          ),
          tabBarIcon: ({color, size}) => <IoniconsIcons name="person-circle-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default React.memo(RootScreen);
