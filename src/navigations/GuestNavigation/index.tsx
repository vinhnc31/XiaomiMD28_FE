import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BaseScreenLoading from '@src/containers/components/Base/BaseScreenLoading';
import {useAuth} from '@src/hooks/useAuth';
import {GUEST_NAVIGATION} from '@src/navigations/routes';
import {IAccount} from '@src/services/account/account.model';
import {Colors} from '@src/styles/colors';
import {StorageKey, StorageUtils} from '@src/utils/mmkv';
import React, {useEffect, useState} from 'react';
import {GuestStackParam} from './stackParam';
import LoginScreen from '@src/screen/authen/login';
import RegisterScreen from '@src/screen/authen/register';
import CategoryScreen from '@src/screen/category/index';

const Stack = createNativeStackNavigator<GuestStackParam>();

const GuestNavigationComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {fetchProfile} = useAuth();

  useEffect(() => {
    const user: IAccount | null = StorageUtils.getObject(StorageKey.User);
    if (!user?.id) {
      handleOnLoadingScreen();
    } else {
      handleFetchProfile();
    }
  }, []);

  const handleFetchProfile = async () => {
    const status = await fetchProfile(true);
    if (!status) {
      handleOnLoadingScreen();
    }
  };

  const handleOnLoadingScreen = () => {
    setIsLoading(false);
  };

  if (isLoading) return <BaseScreenLoading />;

  return (
    <Stack.Navigator
      initialRouteName={GUEST_NAVIGATION.LOGIN}
      screenOptions={{headerShown: false, statusBarColor: Colors.primary}}>
      <Stack.Screen name={GUEST_NAVIGATION.LOGIN} component={LoginScreen} />
      <Stack.Screen name={GUEST_NAVIGATION.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={GUEST_NAVIGATION.CATEGORY} component={CategoryScreen} />
    </Stack.Navigator>
  );
};

export default React.memo(GuestNavigationComponent);
