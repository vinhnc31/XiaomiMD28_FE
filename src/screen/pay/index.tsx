import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View,} from 'react-native';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import {goBack} from '@src/navigations/services';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import {BaseButton} from '@src/containers/components/Base/BaseButton';
import {hs, ms, vs} from '@src/styles/scalingUtils';
import OrderService from '@src/services/order';
import { PayModel } from '@src/services/pay/pay.mode';
import PayService from '@src/services/pay';
import { WebView } from 'react-native-webview';
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.PAY>;
}
const PayScreen = (props: Props) => {
  const totalPriceProduct=props.route.params!.sumPay;
  const [data,setData] = useState<PayModel[]>([]);
  const orderService = new OrderService();
  const payService = new PayService();
  const featchData =  async ()=>{
    try {
     const result= await orderService.getOrder();
     for (let i = 0; i < result.data.length; i++) {
      if (result.data[i]["PayId"] === 2) {
         setData(result.data[i]);
         break;
      }
     }
    } catch (error) {
      console.log(error)
    }
  }
  const postPay=()=>{
    payService.postPay({amount:totalPriceProduct,orderId:data.id,bankCode:""})
  }
  useEffect(()=>{featchData();},[])
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart title="Thanh toán" onBackPress={goBack} />
      <View style={{margin: 10}}>
        <Text style={{fontSize: 18, color: 'black',}}>Số tiền</Text>
        <View style={{padding:10,borderWidth:.2,borderRadius:10}}>
          <Text style={{fontSize: 16, color: 'black',}}>{totalPriceProduct.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}</Text>
        </View>
        <Text style={{fontSize: 18, color: 'black'}}>Phương thức thanh toán</Text>
        <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
          <View
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: '#D9D9D9',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight:10
            }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#5A5A5A',
              }}
            />
          </View>
          <Text style={{fontSize: 16, color: 'black'}}>Cổng thanh toán VNPAYQR</Text>
        </View>
      </View>
      <View style={{position:'absolute',bottom:0}}>
      <BaseButton onPress={postPay} text='Thanh toán' style={{margin:hs(10),width:hs(350)}}></BaseButton>
      </View>
      
    </SafeAreaView>
  );
};
const MyWebComponent = () => {
  return <WebView source={{ uri: 'https://www.youtube.com/watch?v=rxie3NgRHVc' }} style={{ flex: 1 }} />;
}
export default React.memo(PayScreen);
