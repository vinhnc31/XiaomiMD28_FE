import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_NAVIGATION, GUEST_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, FlatList, Image, TouchableOpacity, ScrollView, TextInput, Platform, KeyboardAvoidingView} from 'react-native';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import styles from './styles';
import {goBack, navigateToPage} from '@src/navigations/services';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import BaseAddressPay from '@src/containers/components/Base/BaseAddressPay';
import {Dropdown} from 'react-native-element-dropdown';
import BaseButtonPay from '@src/containers/components/Base/BaseButtonPay';
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.PAYDETAIL>;
}
type PayDetail = {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
  color: string;
};

const PayDetailScreen = (props: Props) => {
  const data = props.route.params;
  const [error, setError] = useState('');
  const [data1, setData] = useState<PayDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState('1');
  const [isFocus, setIsFocus] = useState(false);
  const fetchData = async () => {
    try {
      const response = await fetch('https://653b1ae72e42fd0d54d4b17a.mockapi.io/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError('err');
    }
  };
  useEffect(() => {
    setLoading(false);
    if (refreshing) {
      fetchData()
        .then(() => setRefreshing(false))
        .catch(() => setRefreshing(false));
    } else {
      fetchData();
    }
  }, [refreshing]);
  const data2 = [
    {label: 'Thanh toán khi nhận hàng', value: '1'},
    {label: 'Thanh toán qua momo', value: '2'},
  ];
  return (
    <SafeAreaView style={{flex:1,backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart title="Chi tiết đơn hàng" onBackPress={goBack} />
      <ScrollView indicatorStyle="black" showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Image source={require('../../assets/images/placeholder.png')} style={{width: 25, height: 25}} />
            <Text style={{fontFamily: 'LibreBaskerville-DpdE', fontSize: 18}}> Địa chỉ nhận hàng</Text>
          </View>
          <BaseAddressPay onCartPress={()=>navigateToPage(APP_NAVIGATION.ADDRESS)}/>
          <View style={{height: 10, backgroundColor: '#EEEEEE', marginVertical: 10}}></View>
          <FlatList
            data={data1}
            keyExtractor={item => item.id}
            horizontal={false}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.viewItem}>
                <View style={styles.item}>
                  <Image source={{uri: item.image}} style={styles.image} resizeMode="stretch" />
                  <View style={styles.viewText}>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
                      {item.name}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.textColor}>Màu sắc :</Text>
                      <Text style={styles.textColor}>{item.color}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={styles.textPrice}>{item.price}₫</Text>
                      <Text style={styles.textPrice}>x{item.quantity}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.viewNote}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 10,
                      alignItems: 'center',
                    }}>
                    <Text style={styles.textNote}>Tin nhắn: </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Lưu ý cho cửa hàng..."
                      placeholderTextColor={'#6D6D6D'}></TextInput>
                  </View>
                </View>
                <View style={styles.viewSumPrice}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textNote}>Tổng số tiền</Text>
                    <Text style={styles.textNote}>({item.quantity} sản phẩm)</Text>
                  </View>
                  <Text style={styles.textSumPrice}>{item.price}₫</Text>
                </View>
                <View style={{height: 10, backgroundColor: '#EEEEEE', marginVertical: 10}}></View>
              </View>
            )}
          />
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.viewVorcher}>
              <View style={{flexDirection: 'row'}}>
                <Image source={require('../../assets/images/voucher.png')} style={{width: 35, height: 35}} />
                <Text style={styles.textVorcher}>Vorcher của bạn</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textVorcherShip}>[-20k]</Text>
                <Text style={styles.textVorcherSale}>[-20k]</Text>
                <Image source={require('../../assets/images/next.png')} style={{width: 20, height: 20}} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{height: 10, backgroundColor: '#EEEEEE', marginVertical: 10}}></View>
          <View style={styles.viewPaymentMethods}>
            <View style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/images/dollar(2).png')} style={{width: 35, height: 35}} />
              <Text style={styles.textVorcher}>Phương thức thanh toán</Text>
            </View>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={data2}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <View style={{height: 10, backgroundColor: '#EEEEEE', marginVertical: 10}}></View>
          <View style={styles.viewPaymentMethods}>
            <View style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/images/bill.png')} style={{width: 35, height: 35}} />
              <Text style={styles.textVorcher}>Chi tiết thanh toán</Text>
            </View>
            <View style={{flexDirection: 'row',justifyContent:'space-between',marginVertical:5}}>
              <Text style={styles.textDetail}>Tổng tiền hàng </Text>
              <Text style={styles.textDetail}>800.000đ</Text>
            </View>
            <View style={{flexDirection: 'row',justifyContent:'space-between',marginVertical:5}}>
              <Text style={styles.textDetail}>Phí vận chuyển</Text>
              <Text style={styles.textDetail}>30.000đ</Text>
            </View>
            <View style={{flexDirection: 'row',justifyContent:'space-between',marginVertical:5}}>
              <Text style={styles.textDetail}>Giảm phí vận chuyển</Text>
              <Text style={styles.textDetail}>800.000đ</Text>
            </View>
            <View style={{flexDirection: 'row',justifyContent:'space-between',marginVertical:5}}>
              <Text style={styles.textSumAllPrice}>Tổng thanh toán</Text>
              <Text style={styles.textSumPrice}>800.000đ</Text>
            </View>
          </View>
      </ScrollView>
      <BaseButtonPay/>
    </SafeAreaView>
  );
};
export default React.memo(PayDetailScreen);
