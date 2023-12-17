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
import {ms, vs, hs} from '@src/styles/scalingUtils';
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
  const [title, setTitle] = useState('');
  const [result, setResult] = useState([]);
  const [titleContent, setTitleContent] = useState<string>('');
  const [image, setImage] = useState();
  const data = props.route.params?.item;
  const getData = () => {
    setResult(data.OrdersProducts);
  };
  useEffect(() => {
    getData();
    check();
  }, []);
  const sale=()=>{

  }
  const check = () => {
    if (data.status === '0') {
      setTitle('Chờ xác nhận !');
      setTitleContent('Đơn đặt hàng đang được cửa hàng xác nhận.');
      setImage(require('../../assets/images/todolist.png'));
    }
    if (data.status === '1') {
      setTitle('Đang giao hàng !');
      setTitleContent('Đơn hàng đang được đưa tới khách hàng.');
      setImage(require('../../assets/images/transport.png'));
    }
    if (data.status === '2') {
      setTitle('Đã nhận hàng !');
      setTitleContent('Đơn hàng đã giao thành công.');
      setImage(require('../../assets/images/booking1.png'));
    }
    if (data.status === '3') {
      setTitle('Đã hủy đơn hàng !');
      setTitleContent('Đơn hàng đã hủy thành công.');
      setImage(require('../../assets/images/cancel.png'));
    }
  };
  const date = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${formattedDate} ${formattedTime}`;
  };
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
              <Text style={{fontSize: 20, color: 'white', fontFamily: 'LibreBaskerville-DpdE'}}>{title}</Text>
              <Text
                style={{
                  fontSize: 17,
                  color: 'white',
                  width: 250,
                  marginTop: 20,
                  fontFamily: 'LibreBaskerville-DpdE',
                }}>
                {titleContent}
              </Text>
            </View>
            <Image source={image || require('../../assets/images/error.png')} style={{height: 100, width: 100}} />
          </View>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Image
              source={require('../../assets/images/location.png')}
              style={{height: 25, width: 25, marginRight: 10}}
            />
            <Text style={{fontSize: 20, color: 'black', fontFamily: 'LibreBaskerville-DpdE'}}>Địa chỉ nhận hàng.</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.textAddress}>Tên người nhận: {data.Address['nameReceiver']}</Text>
            <Text style={styles.textAddress}>Số điện thoại: {data.Address['phoneReceiver']}</Text>
            {data.Address["note"] ?<Text style={styles.textAddress}>Ghi chú: {data.Address['note']}</Text>:null}
            <Text style={styles.textAddress}>Địa chỉ: {data.Address['address']}</Text>
          </View>
          <View style={{height: 10, width: '100%', backgroundColor: '#F1F1F1', marginTop: 10}} />
          <View style={{flexDirection: 'row', margin: 10}}>
            <Image
              source={require('../../assets/images/shopping-bag.png')}
              style={{height: 25, width: 25, marginRight: 10}}
            />
            <Text style={{fontSize: 20, color: 'black', fontFamily: 'LibreBaskerville-DpdE'}}>Thông tin đơn hàng.</Text>
          </View>
          <FlatList
            data={result}
            horizontal={false}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.viewItem}>
                <View style={styles.item}>
                  <Image source={{uri: item.productcolor ?item.productcolor['image']:item["Product"]["images"]}} style={styles.image} resizeMode="stretch" />
                  <View style={styles.viewItem}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 18,
                        width: hs(200),
                        fontFamily: 'LibreBaskerville-DpdE',
                        marginBottom: 5,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item.Product['name']}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: hs(220)}}>
                      {item.productcolor != null ? (
                        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
                          Màu sắc: {item.productcolor['Color']['nameColor']}
                        </Text>
                      ) : (
                        <Text style={{width: hs(200)}}></Text>
                      )}
                      <Text style={styles.text}>x {item.quantity}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                      {item.ProductColorConfig != null ? (
                        <View style={{width: hs(220)}}>
                          <Text style={styles.text}>
                            Cấu hình: {item.ProductColorConfig.Config['nameConfig'].split(' ')[1]}
                          </Text>
                        </View>
                      ) : (
                        <View style={{width: hs(220)}}></View>
                      )}
                    </View>
                    <View style={{width: hs(220), alignItems: 'flex-end'}}>
                      <Text style={{fontSize: 15, color: 'red'}}>
                        {(item.ProductColorConfig? item.ProductColorConfig['price']:item.Product['price']).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
          <View style={{height: 1, width: '100%', backgroundColor: '#D9D9D9'}} />
          <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
            <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE'}}>Tổng tiền hàng: </Text>
            <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE'}}>
              {(data.total+((data.Promotion ? data.Promotion["discount"] : 0) /100 * data.total)).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between'}}>
            <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE'}}>Giảm giá: </Text>
            <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE'}}>{((data.Promotion ? data.Promotion["discount"] : 0) /100 * data.total).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}</Text>
          </View>
          <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
            <Text style={{fontSize: 18, color: 'black', fontFamily: 'LibreBaskerville-Bold'}}>Thành tiền: </Text>
            <Text style={{fontSize: 18, color: 'black', fontFamily: 'LibreBaskerville-Bold'}}>{(data.total).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}</Text>
          </View>
          <Text style={{fontSize: 13, fontFamily: 'LibreBaskerville-DpdE', marginHorizontal: 10}}>
            Vui lòng thanh toán <Text style={{color: 'red'}}>{(data.total).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}</Text> khi nhận hàng
          </Text>
          <View style={{height: 10, width: '100%', backgroundColor: '#F1F1F1', marginVertical: 10}} />
          <Text style={{fontSize: 18, fontFamily: 'LibreBaskerville-DpdE', marginHorizontal: 10, color: 'black'}}>
            Phương thức thanh toán
          </Text>
          <Text style={{fontSize: 16, fontFamily: 'LibreBaskerville-DpdE', marginHorizontal: 10, marginVertical: 5}}>
            {data.PayId == 1 ?"Thanh toán khi nhận hàng": "Thanh toán qua ví VnPay"}
          </Text>
          <View style={{height: 10, width: '100%', backgroundColor: '#F1F1F1', marginVertical: 10}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
            <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE', color: 'black'}}>Mã đơn hàng</Text>
            <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE', color: 'black'}}>{data.id}</Text>
          </View>
          <View
            style={{flexDirection: 'row', marginHorizontal: 10, marginVertical: 5, justifyContent: 'space-between'}}>
            <Text style={{fontSize: 13, fontFamily: 'LibreBaskerville-DpdE'}}>Thời gian đặt hàng </Text>
            <Text style={{fontSize: 13, fontFamily: 'LibreBaskerville-DpdE'}}>{date(data.createdAt)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default React.memo(OrderDetailScreen);
