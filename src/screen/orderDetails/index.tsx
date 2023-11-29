import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_NAVIGATION, GUEST_NAVIGATION} from '@src/navigations/routes';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import styles from './styles';
import {goBack, navigateToPage} from '@src/navigations/services';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import BaseAddressPay from '@src/containers/components/Base/BaseAddressPay';
import {Dropdown} from 'react-native-element-dropdown';
import BaseButtonPay from '@src/containers/components/Base/BaseButtonPay';
import boot from '@src/navigations/boot';
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.ORDERDETAIL>;
}
const OrderDetailScreen = (props: Props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart title="Thông tin đơn hàng" onBackPress={goBack} />
      <ScrollView indicatorStyle="black" showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#26AB9A',
              padding: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 20, color: 'white', fontFamily: 'LibreBaskerville-DpdE'}}>Chờ xác nhận !</Text>
              <Text
                style={{fontSize: 17, color: 'white', width: 250, marginTop: 20, fontFamily: 'LibreBaskerville-DpdE'}}>
                Đơn đặt hàng đang được cửa hàng xác nhận.
              </Text>
            </View>
            <Image source={require('../../assets/images/todolist.png')} style={{height: 100, width: 100}} />
          </View>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Image
              source={require('../../assets/images/location.png')}
              style={{height: 25, width: 25, marginRight: 10}}
            />
            <Text style={{fontSize: 20, color: 'black', fontFamily: 'LibreBaskerville-DpdE'}}>Địa chỉ nhận hàng.</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.textAddress}>Tên người nhận: hai</Text>
            <Text style={styles.textAddress}>Số điện thoại: 0987654321</Text>
            <Text style={styles.textAddress}>Ghi chú: khong co gi</Text>
            <Text style={styles.textAddress}>Địa chỉ: ha noi</Text>
          </View>
          <View style={{height: 10, width: '100%', backgroundColor: '#F1F1F1', marginTop: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Image
              source={require('../../assets/images/shopping-bag.png')}
              style={{height: 25, width: 25, marginRight: 10}}
            />
            <Text style={{fontSize: 20, color: 'black', fontFamily: 'LibreBaskerville-DpdE'}}>Thông tin đơn hàng.</Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: 15}}>
            <View style={{width: 100, height: 100, backgroundColor: 'red'}}></View>
            <View style={{flexDirection: 'column', marginHorizontal: 10, justifyContent: 'space-between'}}>
              <Text
                style={{width: 270, color: 'black', fontSize: 20, fontFamily: 'LibreBaskerville-DpdE'}}
                ellipsizeMode="tail"
                numberOfLines={1}>
                Điện thoại
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE'}}>Màu: </Text>
                  <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE'}}>Xanh</Text>
                </View>
                <Text style={{fontSize: 15}}>x1</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE'}}>Cấu hình: </Text>
                <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE'}}>Ram 8G/128GB </Text>
              </View>
            </View>
          </View>
          <View style={{height: 1, width: '100%', backgroundColor: '#D9D9D9'}} />
          <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
            <Text style={{fontSize: 18, fontFamily: 'LibreBaskerville-DpdE'}}>Tổng tiền hàng: </Text>
            <Text style={{fontSize: 18, fontFamily: 'LibreBaskerville-DpdE'}}>6,150,000₫</Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between'}}>
            <Text style={{fontSize: 18, fontFamily: 'LibreBaskerville-DpdE'}}>Giảm giá: </Text>
            <Text style={{fontSize: 18, fontFamily: 'LibreBaskerville-DpdE'}}>6,150,000₫</Text>
          </View>
          <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, color: 'black', fontFamily: 'LibreBaskerville-Bold'}}>Thành tiền: </Text>
            <Text style={{fontSize: 20, color: 'black', fontFamily: 'LibreBaskerville-Bold'}}>6,150,000₫</Text>
          </View>
          <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE', marginHorizontal: 10}}>
            Vui lòng thanh toán <Text style={{color: 'red'}}>6,150,000₫</Text> khi nhận hàng
          </Text>
          <View style={{height: 10, width: '100%', backgroundColor: '#F1F1F1', marginVertical: 10}} />
          <Text style={{fontSize: 20, fontFamily: 'LibreBaskerville-DpdE', marginHorizontal: 10, color: 'black'}}>
            Phương thức thanh toán
          </Text>
          <Text style={{fontSize: 16, fontFamily: 'LibreBaskerville-DpdE', marginHorizontal: 10, marginVertical: 5}}>
            Thanh toán khi nhận hàng
          </Text>
          <View style={{height: 10, width: '100%', backgroundColor: '#F1F1F1', marginVertical: 10}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
            <Text style={{fontSize: 18, fontFamily: 'LibreBaskerville-DpdE', color: 'black'}}>Mã đơn hàng</Text>
            <Text style={{fontSize: 18, fontFamily: 'LibreBaskerville-DpdE', color: 'black'}}>23123213</Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 10,marginVertical:5, justifyContent: 'space-between'}}>
            <Text style={{fontSize: 18, fontFamily: 'LibreBaskerville-DpdE'}}>Thời gian đặt hàng  </Text>
            <Text style={{fontSize: 18, fontFamily: 'LibreBaskerville-DpdE'}}>24/11/2023 08:03</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default React.memo(OrderDetailScreen);
