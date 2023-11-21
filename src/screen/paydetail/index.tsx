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
  type AddRess = {
    id: string;
    name: string;
    phone: string;
    note: number;
    address: string;
    check: boolean;
  };
  const PayDetailScreen = (props: Props) => {
    const data = props.route.params;
    const [error, setError] = useState('');
    const [data1, setData] = useState<PayDetail[]>([]);
    const [selectedVoucherData, setSelectedVoucherData] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState(false);
    const [value, setValue] = useState('1');
    const [isFocus, setIsFocus] = useState(false);
    const [addressData, setAddressData] = useState<AddRess[]>([]);
    const [checkdataAddress,setCheckDataAddress]= useState<boolean>(false)
    const fetchData = async () => {
      try {
        const response = await fetch('{{urlxiaomi}}/api/cart/1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError('err');
      }
    };
    console.log(selectedVoucherData)
    const fetchDataAddress = async () => {
      try {
        const response = await fetch('https://655c63b225b76d9884fd1f63.mockapi.io/address');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const filteredData = result.filter((item) => item.check === true);
        setAddressData(filteredData);
        setCheckDataAddress(filteredData.length > 0);
      } catch (error) {
        setError('err');
        setCheckDataAddress(false);
      }
    };
    useFocusEffect(
      useCallback(() => {
        fetchDataAddress();
      }, [])
    );
    useEffect(() => {
      fetchDataAddress();
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
      {label: 'Thanh toán qua vnpay', value: '2'},
    ];
    const navigateToAddressPay = () => {
      navigateToPage(APP_NAVIGATION.ADDRESS);
    };
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
        <BaseHeaderNoCart title="Chi tiết đơn hàng" onBackPress={goBack} />
        <ScrollView indicatorStyle="black" showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Image source={require('../../assets/images/placeholder.png')} style={{width: 25, height: 25}} />
            <Text style={{fontFamily: 'LibreBaskerville-DpdE', fontSize: 18}}> Địa chỉ nhận hàng</Text>
          </View>
          {
            checkdataAddress?
            <BaseAddressPay
          name={addressData[0] != null ?addressData[0]["name"]:""}
          phone={addressData[0] != null ?addressData[0]["phone"]:""}
          note={addressData[0] != null ?addressData[0]["note"]:""}
          address={addressData[0] != null ?addressData[0]["address"]:""}
            onCartPress={() =>
              navigateToAddressPay()
            }
          />
            :
            <TouchableOpacity onPress={()=>navigateToAddressPay()}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <Text>Vui lòng thêm địa chỉ giao hàng !</Text>
            </View>
            </TouchableOpacity>
          }
          
          <View style={{height: 10, backgroundColor: '#EEEEEE', marginVertical: 10}}></View>
          <FlatList
            data={data}
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
          <TouchableOpacity
            onPress={() => {
              navigateToPage(APP_NAVIGATION.VouCherScreen, {
                onVoucherSelect: selectedVoucher => {
                  setSelectedVoucherData(selectedVoucher);
                }
              });
            }}>
            <View style={styles.viewVoucher}>
              <View style={{flexDirection: 'row'}}>
                <Image source={require('../../assets/images/voucher.png')} style={{width: 30, height: 30}} />
                <Text style={styles.textVoucher}>Voucher</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.textVoucherShip}>{selectedVoucherData ? selectedVoucherData.titleVoucher : ''}</Text>
                <Text style={styles.textVoucherSale}>Miễn phí vận chuyển</Text>
                <Image source={require('../../assets/images/next.png')} style={{width: 20, height: 20}} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{height: 10, backgroundColor: '#EEEEEE', marginVertical: 10}}></View>
          <View style={styles.viewPaymentMethods}>
            <View style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/images/dollar(2).png')} style={{width: 35, height: 35}} />
              <Text style={styles.textVoucher}>Phương thức thanh toán</Text>
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
              <Text style={styles.textVoucher}>Chi tiết thanh toán</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5}}>
              <Text style={styles.textDetail}>Tổng tiền hàng </Text>
              <Text style={styles.textDetail}>800.000đ</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5}}>
              <Text style={styles.textSumAllPrice}>Tổng thanh toán</Text>
              <Text style={styles.textSumPrice}>800.000đ</Text>
            </View>
          </View>
        </ScrollView>
        <BaseButtonPay />
      </SafeAreaView>
    );
  };
  export default React.memo(PayDetailScreen);
