import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from '@src/stores';
import React, {useMemo} from 'react';
import AppNavigationScreen from './AppNavigation/index';
import GuestNavigationScreen from './GuestNavigation/index';
import {ROUTES} from './routes';
import {navigationRef} from './services';

export type RootStackParamList = {
  GUEST_NAVIGATION: undefined;
  APP_NAVIGATION: undefined;
  LOADING_SCREEN: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const NavigationComponent = () => {
  const authState = useAppSelector(state => state.authSlice);

  const chooseScreen = useMemo(() => {
    const arr = [];
    // if (authState?.account) {
      arr.push(
        <RootStack.Screen
          name={ROUTES.APP_NAVIGATION}
          component={AppNavigationScreen}
          options={{headerShown: false}}
        />,
      );
    // } else {
      arr.push(
        <RootStack.Screen
          name={ROUTES.GUEST_NAVIGATION}
          component={GuestNavigationScreen}
          options={{headerShown: false}}
        />,
      );
    // }
    return arr[0];
  }, [authState?.account]);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        <RootStack.Screen name={ROUTES.APP_NAVIGATION} component={AppNavigationScreen} options={{headerShown: false}} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default React.memo(NavigationComponent);
