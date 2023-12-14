/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MENU_NAVIGATION} from '@src/navigations/routes';
import {Colors} from '@src/styles/colors';
import React, {useEffect, useState} from 'react';
import {BaseIcon} from '@src/containers/components/Base/BaseIcon';
import {MenuStackParam} from './stackParam';
import styles from './styles';
import {Text, View} from 'react-native';
import HomeScreen from '@src/screen/home';
import FavoriteScreen from '@src/screen/favorite';
import NotificationsScreen from '@src/screen/notifications';
import AccountScreen from '@src/screen/account';
import {NotificationModel} from '@src/services/notification/notification.model';
import {useAuth} from '@src/hooks/useAuth';
import NotificationService from '@src/services/notification';
import {ms, vs, hs} from '@src/styles/scalingUtils';
const Tab = createBottomTabNavigator<MenuStackParam>();
import CategoryScreen from '@src/screen/category';

const RootScreen = () => {
  const [notificationData, setNotificationData] = useState<NotificationModel[]>([]);
  const {user} = useAuth();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchDataNotification();
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
  
    fetchData();
    fetchDataNotification();
  }, [user]);
  const fetchDataNotification = async () => {
    try {
      const AccountId = await user?.id;
      const notificationService = new NotificationService();
      const result = await notificationService.getNotification(AccountId);
      setNotificationData(result.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };
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
          tabBarIcon: ({color, size}) => <BaseIcon name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={MENU_NAVIGATION.FAVORITE}
        component={FavoriteScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.tabBarActiveLabelStyle : styles.tabBarLabelStyle}>Yêu thích</Text>
          ),
          tabBarIcon: ({color, size}) => <BaseIcon name="heart" color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name={MENU_NAVIGATION.NOTIFICATIONS}
        component={NotificationsScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.tabBarActiveLabelStyle : styles.tabBarLabelStyle}>Thông báo</Text>
          ),
          tabBarIcon: ({color, size}) => (
            <>
              <BaseIcon name="notifications" color={color} size={size} />
              {notificationData?.length == 0 ? (
                <></>
              ) : (
                <View
                  style={{
                    height: hs(16),
                    width: hs(16),
                    backgroundColor: 'red',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    right: hs(30),
                    top: 0,
                    borderRadius: ms(20),
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white'}}>{notificationData?.length || 0}</Text>
                </View>
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name={MENU_NAVIGATION.ACCOUNT}
        component={AccountScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.tabBarActiveLabelStyle : styles.tabBarLabelStyle}>Tài khoản</Text>
          ),
          tabBarIcon: ({color, size}) => <BaseIcon name="person-circle" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default React.memo(RootScreen);
