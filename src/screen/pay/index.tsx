import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, NativeModules, NativeEventEmitter, Button,} from 'react-native';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import {goBack} from '@src/navigations/services';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import {BaseButton} from '@src/containers/components/Base/BaseButton';
import {hs, ms, vs} from '@src/styles/scalingUtils';
import OrderService from '@src/services/order';
import { PayModel } from '@src/services/pay/pay.mode';
import PayService from '@src/services/pay';
import CryptoJS from 'crypto-js';
const { PayZaloBridge } = NativeModules;
const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

const subscription = payZaloBridgeEmitter.addListener(
  'EventPayZalo',
  (data) => {
    if (data.returnCode == 1) {
      console.log('Pay success!');
    } else {
      console.log('Pay errror! ' + data.returnCode);
    }
  }
);
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.PAY>;
}
const PayScreen = (props: Props) => {
  const [money, setMoney] = React.useState('10000')
  const [token, setToken] = React.useState('')
  const [returncode, setReturnCode] = React.useState('')
  const totalPriceProduct=props.route.params!.sumPay;
  const [data,setData] = useState<PayModel[]>([]);
  const orderService = new OrderService();
  const payService = new PayService();
  const createOrder=async ()=> {
    let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime()

    let appid = 553
    let amount = "700000"
    let appuser = "ZaloPayDemo"
    let apptime = (new Date).getTime()
    let embeddata = "{}"
    let item = "[]"
    let description = "Merchant description for order #" + apptransid
    let hmacInput = appid + "|" + apptransid + "|" + appuser + "|" + amount + "|" + apptime + "|" + embeddata + "|" + item
    let mac = CryptoJS.HmacSHA256(hmacInput, "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn")
    console.log('====================================');
    console.log("hmacInput: " + hmacInput);
    console.log("mac: " + mac)
    console.log('====================================');
    var order = {
      'app_id': appid,
      'app_user': appuser,
      'app_time': apptime,
      'amount': amount,
      'app_trans_id': apptransid,
      'embed_data': embeddata,
      'item': item,
      'description': description,
      'mac': mac
    }
    let formBody = []
    for (let i in order) {
      var encodedKey = encodeURIComponent(i);
      var encodedValue = encodeURIComponent(order[i]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    await fetch('https://sb-openapi.zalopay.vn/v2/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then(response => response.json())
      .then(resJson => {
        setToken(resJson.zp_trans_token)
        setReturnCode(resJson.return_code)
      })
      .catch((error) => {
        console.log("error ", error)
      })
  }
  function payOrder() {
    var payZP = NativeModules.PayZaloBridge;
    payZP.payOrder(token);
  }
  // const featchData =  async ()=>{
  //   try {
  //    const result= await orderService.getOrder();
  //    for (let i = 0; i < result.data.length; i++) {
  //     if (result.data[i]["PayId"] === 2) {
  //        setData(result.data[i]);
  //        break;
  //     }
  //    }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const postPay=()=>{
  //   payService.postPay({amount:totalPriceProduct,orderId:data.id,bankCode:""})
  // }
  // useEffect(()=>{featchData();},[])
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
      <BaseButton onPress={createOrder} text='Thanh toán' style={{margin:hs(10),width:hs(350)}}></BaseButton>
      </View>
      {returncode == "1" ?
          <Button
            title="Pay order"
            onPress={() => { payOrder() }}
          /> : null
        }
    </SafeAreaView>
  );
};
export default React.memo(PayScreen);
function getCurrentDateYYMMDD() {
  var todayDate = new Date().toISOString().slice(2, 10);
  return todayDate.split('-').join('');
}

