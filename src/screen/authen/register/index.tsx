import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GuestStackParam} from '@src/navigations/GuestNavigation/stackParam';
import {GUEST_NAVIGATION} from '@src/navigations/routes';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
interface Props {
  navigation: NativeStackNavigationProp<GuestStackParam>;
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.REGISTER>;
}

const RegisterScreen = (props: Props) => {
  return (
    <SafeAreaView>
      <Text>Đăng ký</Text>
    </SafeAreaView>
  );
};

export default React.memo(RegisterScreen);
