import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BaseScreenLoading from '@src/containers/components/Base/BaseScreenLoading';
import {useAuth} from '@src/hooks/useAuth';
import {APP_NAVIGATION, GUEST_NAVIGATION} from '@src/navigations/routes';
import {IAccount} from '@src/services/account/account.model';
import {Colors} from '@src/styles/colors';
import {StorageKey, StorageUtils} from '@src/utils/mmkv';
import React, {useEffect, useState} from 'react';
import {GuestStackParam} from './stackParam';
import LoginScreen from '@src/screen/authen/login';
import RegisterScreen from '@src/screen/authen/register';
import forgotpass from '@src/screen/authen/forgotpass';
import RootScreen from '../AppNavigation/root';
import AddressPayScreen from '@src/screen/addressPay/index';
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
import PayScreen from '@src/screen/pay/index';
import EvaluateScreen from '@src/screen/evaluate/index';
import reviewProduct from '@src/screen/product/review-product';
import search from '@src/screen/search';
const Stack = createNativeStackNavigator<GuestStackParam>();

const GuestNavigationComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {fetchProfile} = useAuth();

  useEffect(() => {
    const user: IAccount | null = StorageUtils.getObject(StorageKey.User);
    if (!user?.id) {
      setTimeout(() => {
        handleOnLoadingScreen();
      }, 2000);
    } else {
      handleFetchProfile();
    }
  }, []);

  const handleFetchProfile = async () => {
    const status = await fetchProfile(true);

    handleOnLoadingScreen();
  };

  const handleOnLoadingScreen = () => {
    setIsLoading(false);
  };

  if (isLoading) return <BaseScreenLoading />;

  return (
    <Stack.Navigator
      initialRouteName={APP_NAVIGATION.ROOT}
      screenOptions={{headerShown: false, statusBarColor: Colors.primary}}>
      <Stack.Screen name={GUEST_NAVIGATION.LOGIN} component={LoginScreen} />
      <Stack.Screen name={GUEST_NAVIGATION.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={GUEST_NAVIGATION.FORGOTPASS} component={forgotpass} />
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
      <Stack.Screen name={APP_NAVIGATION.PAY} component={PayScreen} />
      <Stack.Screen name={APP_NAVIGATION.EVALUATE} component={EvaluateScreen} />

      <Stack.Screen name={APP_NAVIGATION.SEARCH} component={search} />
      <Stack.Screen name={APP_NAVIGATION.REVIEWPRODUCT} component={reviewProduct} />
    </Stack.Navigator>
  );
};

export default React.memo(GuestNavigationComponent);
