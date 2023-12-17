import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import {APP_NAVIGATION} from '@src/navigations/routes';
import { goBack } from '@src/navigations/services';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.PAYVIEW>;
}
const PayViewScreen = (props: Props) => {
  const data = props.route.params?.dataVnPay;

  return (
    <SafeAreaView style={{flex:1,flexDirection:'column'}}>
      <BaseHeaderNoCart title="Thanh toán" onBackPress={goBack} />
      <WebView source={{uri: data}}></WebView>
    </SafeAreaView>
  );
};
export default React.memo(PayViewScreen);
