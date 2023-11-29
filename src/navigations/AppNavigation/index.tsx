/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { APP_NAVIGATION } from '@src/navigations/routes';
import { Colors } from '@src/styles/colors';
import React, { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import RootScreen from './root';
import AddressPayScreen from '@src/screen/addressPay/index';
import { AppStackParam } from './stackParam';
import CategoryScreen from '../../screen/category/index';
import ProductListScreen from '../../screen/product/list-product/index';
import DetailsScreen from '@src/screen/product/detail-product/index';
import CartScreen from '@src/screen/cart/index';
import PayDetailScreen from '@src/screen/paydetail/index';
import HistoryOrderScreen from '@src/screen/historyOrder/index';
import OrderDetailScreen from '@src/screen/orderDetails/index';
import VouCherScreen from '@src/screen/voucher/index';
import myaccount from '@src/screen/account/myaccount';
import changepass from '@src/screen/account/changepass';

const Stack = createNativeStackNavigator<AppStackParam>();

const AppNavigationScreen = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', _handleAppStateChange);

    // if (authSlice.isAuthenticated) {
    //   AsyncStorage.setItem(ASYNC_STORE.TOKEN, authSlice || '')
    //     .then(() => checkAuthenToken())
    //     .catch(() => dispatch(signOut()));
    // } else {
    //   dispatch(signOut());
    // }

    return () => {
      subscription.remove();
    };
  }, []);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      checkAuthenToken().catch(() => { });
    }
    appState.current = nextAppState;
  };

  const checkAuthenToken = async () => {
    // try {
    //   const res = await fetchUserInfor(authState.accountInfor.username);
    //   if (res.status.code === RESPONSE_STATUS.SUCESS) {
    //     const accountInfor: AccountInfor = {...res.data[0], username: authState.accountInfor.username};
    //     // dispatch(restoreToken(accountInfor));
    //   } else dispatch(signOut());
    // } catch (error) {
    //   dispatch(signOut());
    // }
  };

  return (
    <Stack.Navigator
      initialRouteName={APP_NAVIGATION.ROOT}
      screenOptions={{ tabBarStyle: { display: 'none' }, headerShown: false, statusBarColor: Colors.primary }}>
      <Stack.Screen name={APP_NAVIGATION.ROOT} component={RootScreen} />
      <Stack.Screen name={APP_NAVIGATION.CATEGORY} component={CategoryScreen} />
      <Stack.Screen name={APP_NAVIGATION.PRODUCTLIST} component={ProductListScreen} />
      <Stack.Screen name={APP_NAVIGATION.DETAILSPRODUCT} component={DetailsScreen} />
      <Stack.Screen name={APP_NAVIGATION.CART} component={CartScreen} />
      <Stack.Screen name={APP_NAVIGATION.PAYDETAIL} component={PayDetailScreen} />
      <Stack.Screen name={APP_NAVIGATION.ADDRESS} component={AddressPayScreen} />
      <Stack.Screen name={APP_NAVIGATION.HISTORYORDER} component={HistoryOrderScreen} />
      <Stack.Screen name={APP_NAVIGATION.ORDERDETAIL} component={OrderDetailScreen} />
      <Stack.Screen name={APP_NAVIGATION.VOUCHER} component={VouCherScreen} />
      <Stack.Screen name={APP_NAVIGATION.MY_ACCOUNT} component={myaccount} />
      <Stack.Screen name={APP_NAVIGATION.CHANGE_PASS} component={changepass} />
    </Stack.Navigator>
  );
};

export default React.memo(AppNavigationScreen);
