import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_NAVIGATION, MENU_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, FlatList, Image, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import styles from './styles';
import {goBack, navigateToPage} from '@src/navigations/services';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import BaseAddressPay from '@src/containers/components/Base/BaseAddressPay';
import {Dropdown} from 'react-native-element-dropdown';
import BaseButtonPay from '@src/containers/components/Base/BaseButtonPay';
import {AddressModel} from '@src/services/address/address.model';
import AddressService from '@src/services/address';
import {useAuth} from '@src/hooks/useAuth';
import {BaseLoading} from '@src/containers/components/Base/BaseLoading';
import OrderService from '@src/services/order';
import useToast from '@src/hooks/useToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartService from '@src/services/cart';
import {PayModel} from '@src/services/pay/pay.mode';
import PayService from '@src/services/pay';
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.PAYDETAIL>;
}
const PayDetailScreen = (props: Props) => {
  const {user} = useAuth();
  const toast = useToast();
  const [dataPay, setDataPay] = useState<PayModel[]>([]);
  const data = props.route.params?.selectedItemsData || props.route.params?.data;
  const [selectedVoucherData, setSelectedVoucherData] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState('1');
  const [message, setMessage] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);
  const [totalAmounts, setTotalAmounts] = useState({});
  const [addressData, setAddressData] = useState<AddressModel>();
  const payService = new PayService();
  const addressService = new AddressService();
  const cartService = new CartService();
  const orderService = new OrderService();
  const pay = [
    {label: 'Thanh toán khi nhận hàng', value: '1'},
    {label: 'Thanh toán qua vnpay', value: '2'},
  ];
  // console.log(data)
  const navigateToAddressPay = () => {
    navigateToPage(APP_NAVIGATION.ADDRESS, {
      onAddress: item => {
        setAddressData(item);
      },
      addressData,
    });
  };
  const navigateToVouCher = () => {
    navigateToPage(APP_NAVIGATION.VOUCHER, {
      onVoucherSelect: item => {
        setSelectedVoucherData(item);
      },
      selectedVoucherData,
    });
  };
  const fetchDataAddress = async () => {
    try {
      setLoading(true);
      const result = await addressService.fetchAddress(user?.id!);
      setAddressData(result.data ? result.data[0] : undefined);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    setTotalAmounts(calculateTotalAmount());
    fetchDataAddress();
    featchDataPay();
  }, []);

  const calculateTotalAmount = () => {
    let total = 0;
    !data[0]['Product']
      ? (total += data[0].quantity * data[0].productPrice)
      : data?.forEach(item => {
          total += item.ProductColorConfig
            ? item.quantity * item.ProductColorConfig['price']
            : item['Product']['price'] * item.quantity;
        });
    return total;
  };
  const discount = totalAmounts * (selectedVoucherData?.discount / 100) || 0;
  const sumPay = totalAmounts - discount;
  const onPay = async () => {
    const productsArray = data!.map(item => ({
      quantity: item.quantity,
      productId: item.Product ? item.Product['id'] : item.productId,
      ProductColorId: item.ProductColorId,
      ProductColorConfigId: item.ProductColorConfigId,
    }));
    orderService.postOrder({
      message: message,
      AccountId: Number(user?.id),
      AddressId: Number(addressData?.id),
      PayId: Number(value),
      products: productsArray,
      PromotionId: selectedVoucherData?.id ?? null,
    });
    {
      value == '1' && data == props.route.params?.selectedItemsData
        ? data?.map(async itemId => {
            try {
              const savedData = await AsyncStorage.getItem('cartData');
              if (savedData) {
                const cartData = JSON.parse(savedData);
                const updatedCartData = cartData.filter(item => item.id !== itemId.id);
                await AsyncStorage.setItem('cartData', JSON.stringify(updatedCartData));
              }
              await cartService.deleteCart(itemId.id);
              if (value == '1') {
                toast.showSuccess({messageText: 'Đặt hàng thành công'});
                navigateToPage(MENU_NAVIGATION.HOME);
              }
            } catch (error) {
              console.error('Error deleting item from AsyncStorage', error);
            }
          })
        : null;
    }
  };
  const featchDataPay = async () => {
    try {
      const result = await orderService.getOrder();
      for (let i = result.data.length - 1; i >= 0; i--) {
        if (result.data[i]['PayId'] === 2) {
          setDataPay(result.data[i]);
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const payVNPay = async () => {
    await onPay();
    const dataView = await payService.postPay({amount: sumPay, orderId: data.id, bankCode: ''});
    // console.log(dataView.data)
    const dataVnPay = dataView.data;
    console.log(dataVnPay);
    navigateToPage(APP_NAVIGATION.PAYVIEW, {dataVnPay});
  };
  // console.log(data[0]["Product"]["price"]*data[0].quantity)
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart title="Chi tiết thanh toán" onBackPress={goBack} />
      <ScrollView indicatorStyle="black" showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', margin: 10}}>
          <Image source={require('../../assets/images/placeholder.png')} style={{width: 25, height: 25}} />
          <Text style={{fontFamily: 'LibreBaskerville-DpdE', fontSize: 18}}> Địa chỉ nhận hàng</Text>
        </View>
        {loading ? (
          <View style={{paddingVertical: 30}}>
            <BaseLoading size={20} loading={true} />
          </View>
        ) : addressData ? (
          <BaseAddressPay
            name={addressData.nameReceiver}
            phone={addressData.phoneReceiver}
            note={addressData.note}
            address={addressData.address}
            onCartPress={() => navigateToAddressPay()}
          />
        ) : (
          <TouchableOpacity onPress={() => navigateToAddressPay()}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>Vui lòng thêm địa chỉ giao hàng !</Text>
            </View>
          </TouchableOpacity>
        )}

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
                <Image
                  source={{
                    uri: item.productcolor
                      ? item.productcolor['image']
                      : item['Product']
                        ? item['Product']['images']
                        : item.productImage,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.viewText}>
                  <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
                    {item.productName || item.Product['name']}
                  </Text>
                  {item.ProductColor || item.productcolor ? (
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.textColor}>Màu sắc: </Text>
                      <Text style={styles.textColor}>{item.ProductColor || item.productcolor.Color['nameColor']}</Text>
                    </View>
                  ) : null}
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.textPrice}>
                      {(item.ProductColorConfig
                        ? item.ProductColorConfig['price']
                        : item['Product']
                          ? item['Product']['price']
                          : item.productPrice
                      ).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                    </Text>
                    <Text style={styles.textPrice}>x{item.quantity}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.viewSumPrice}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textNote}>Tổng số tiền</Text>
                  <Text style={styles.textNote}>({item.quantity} sản phẩm)</Text>
                </View>
                <Text style={styles.textSumPrice}>
                  {(
                    item.quantity *
                    (item.ProductColorConfig
                      ? item.ProductColorConfig['price']
                      : item['Product']
                        ? item['Product']['price']
                        : item.productPrice)
                  ).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </Text>
              </View>
              <View style={{height: 10, backgroundColor: '#EEEEEE', marginVertical: 10}}></View>
            </View>
          )}
        />
        <TouchableOpacity
          onPress={() => {
            navigateToVouCher();
          }}>
          <View style={styles.viewVoucher}>
            <View style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/images/voucher.png')} style={{width: 30, height: 30}} />
              <Text style={styles.textVoucher}>Voucher</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.textVoucherShip}>
                {selectedVoucherData ? `[- ${selectedVoucherData.discount} % ]` : ''}
              </Text>
              <Text style={styles.textVoucherSale}>Miễn phí vận chuyển</Text>
              <Image source={require('../../assets/images/next.png')} style={{width: 20, height: 20}} />
            </View>
          </View>
        </TouchableOpacity>
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
              onChangeText={value => setMessage(value)}
              value={message}
              style={styles.textInput}
              placeholder="Lưu ý cho cửa hàng..."
              placeholderTextColor={'#6D6D6D'}></TextInput>
          </View>
        </View>
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
            data={pay}
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
            <Text style={styles.textDetail}>
              {totalAmounts.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5}}>
            <Text style={styles.textDetail}>Giảm giá</Text>
            <Text style={styles.textDetail}>
              {selectedVoucherData
                ? `- ${discount.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}`
                : '0 ₫'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5}}>
            <Text style={styles.textSumAllPrice}>Tổng thanh toán</Text>
            <Text style={styles.textSumPrice}>
              {sumPay.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
          </View>
        </View>
      </ScrollView>
      <BaseButtonPay
        totalPrice={sumPay.toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        })}
        onOrderPress={value == '1' ? onPay : payVNPay}
        check={!addressData}
      />
    </SafeAreaView>
  );
};
export default React.memo(PayDetailScreen);
