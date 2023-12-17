import {RouteProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, FlatList, Image, TouchableOpacity, ScrollView, Modal} from 'react-native';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import styles from './styles';
import {goBack, navigateToPage} from '@src/navigations/services';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import {BaseButton} from '@src/containers/components/Base/BaseButton';
import {BaseLoading} from '@src/containers/components/Base/BaseLoading';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {BaseText} from '@src/containers/components/Base';
import {HistoryOrderModel} from '@src/services/historyOrder/history.model';
import HistoryOrderService from '@src/services/historyOrder';
import {useAuth} from '@src/hooks/useAuth';
import {Dimensions} from 'react-native';
import {ms, vs, hs} from '@src/styles/scalingUtils';
import OrderService from '@src/services/order';
import useToast from '@src/hooks/useToast';
import EvaluateService from '@src/services/evaluate';
const MaterialTopTabs = createMaterialTopTabNavigator();
interface Props {
  isFocused: any;
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.HISTORYORDER>;
}
const HistoryOrderScreen = (props: Props) => {
  const [data, setData] = useState<HistoryOrderModel[]>([]);
  const [status, setStatus] = useState();
  const [data1, setData1] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const historyOrder = new HistoryOrderService();
  const statusOrder = new OrderService();
  const toast = useToast();
  const {user} = useAuth();
  const evaluateService = new EvaluateService();
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await Promise.all([
        historyOrder.getOrder(Number(user?.id), '0'),
        historyOrder.getOrder(Number(user?.id), '1'),
        historyOrder.getOrder(Number(user?.id), '2'),
        historyOrder.getOrder(Number(user?.id), '3'),
      ]);

      const newData = {
        '0': result[0].data,
        '1': result[1].data,
        '2': result[2].data,
        '3': result[3].data,
      };

      setData(newData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    if (props.isFocused) {
      fetchData();
    }
  }, [props.isFocused]);
  const navigation = useNavigation();
  const onHide = (): void => {
    setIsVisible(false);
  };

  const onShow = async (item) => {
    setStatus(item);
    if (item.status == '0') {
      setIsVisible(true);
    } else if (item.status == '1') await submit(item);
    else if (item.status == '2') await evaluate(item);
  };
  const cancer = async () => {
    onHide();
    toast.showSuccess({messageText: 'Hủy đơn hàng thành công'});
    await statusOrder.putOrder(Number(status.id), {status: '3'});
    fetchData();
  };
  const submit = async (item) => {
    await statusOrder.putOrder(Number(item.id), {status: '2'});
    toast.showSuccess({messageText: 'Đã nhận đơn hàng thành công'});
    fetchData();
  };
  const evaluate = async (item) => {
    console.log(item)
    navigateToPage(APP_NAVIGATION.EVALUATE,{item})
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [data])
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart title="Lịch sử mua hàng" onBackPress={navigation.goBack} />
      <MaterialTopTabs.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 15, textTransform: 'none'},
          tabBarScrollEnabled: true,
          // tabBarAndroidRipple: {borderless: false},
        }}>
        <MaterialTopTabs.Screen
          name="Tab1"
          options={{title: 'Chờ xác nhận'}}
          
          >
            
          {props => <HistoryOrderTab {...props} data={data['0']} loading={loading} onShow={onShow} />}
        </MaterialTopTabs.Screen>
        <MaterialTopTabs.Screen
          name="Tab2"
          options={{title: 'Đang vận chuyển'}}
          >
          {props => <HistoryOrderTab {...props} data={data['1']} loading={loading} onShow={onShow} />}
        </MaterialTopTabs.Screen>
        <MaterialTopTabs.Screen
          name="Tab4"
          options={{title: 'Đã nhận'}}
          >
          {props => <HistoryOrderTab {...props} data={data['2']} loading={loading} onShow={onShow} />}
        </MaterialTopTabs.Screen>
        <MaterialTopTabs.Screen
          name="Tab5"
          options={{title: 'Đã hủy'}}
          >
          {props => <HistoryOrderTab {...props} data={data['3']} loading={loading} />}
        </MaterialTopTabs.Screen>
      </MaterialTopTabs.Navigator>
      <Modal visible={isVisible} onRequestClose={onHide} transparent animationType="fade">
        <TouchableOpacity onPress={onHide} style={styles.modalWrap}>
          <View style={styles.modalInner}>
            <BaseText fullText={'Bạn có chắc chắn muốn hủy không ?'} style={styles.menuName} />
            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
              <BaseButton
                text="Hủy"
                onPress={onHide}
                width={hs(70)}
                height={hs(35)}
                style={{backgroundColor: '#B7B7B7'}}
              />
              <BaseButton
                text="Xác nhận"
                onPress={() => {
                  cancer();
                }}
                width={hs(100)}
                height={hs(35)}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};
const getStatusText = (status: string) => {
  if (status === '0') return 'Chờ xác nhận';
  if (status === '1') return 'Đang vận chuyển';
  if (status === '2') return 'Đã nhận';
  if (status === '3') return 'Đã hủy';
};
const getStatusTextButton = (status: string) => {
  if (status === '0') return 'Hủy';
  if (status === '1') return 'Đã nhận';
  if (status === '2') return 'Đánh giá';
};

const HistoryOrderTab = ({data, onShow}: {data: HistoryOrderModel[]; loading: boolean; onShow: (item) => void}) => (
  <View>
    {data?.every(items => items.length === 0) ? (
      <View style={styles.flatListContainer}>
        <View style={{alignItems: 'center', marginTop: 100}}>
          <Image source={require('../../assets/images/group84.png')} style={{width: 170, height: 170}}></Image>
        </View>
      </View>
    ) : (
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={data}
          horizontal={false}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={{backgroundColor: 'white'}}>
              <Text style={styles.textStatus}>{getStatusText(item.status)}</Text>
              <TouchableOpacity
                style={styles.viewItem}
                onPress={() => {
                  navigateToPage(APP_NAVIGATION.ORDERDETAIL, {item});
                }}>
                <View style={styles.item}>
                  <Image
                    source={{uri: item.OrdersProducts[0].productcolor ? item.OrdersProducts[0].productcolor['image']:item.OrdersProducts[0]["Product"]["images"]}}
                    style={styles.image}
                    resizeMode="stretch"
                  />
                  <View style={styles.viewItem}>
                    <Text style={{color: 'black', fontSize: 18, width: '50%'}} numberOfLines={1} ellipsizeMode="tail">
                      {item.OrdersProducts[0].Product['name']}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: hs(220)}}>
                      {
                        item.OrdersProducts[0].productcolor?<Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
                        Màu sắc: {item.OrdersProducts[0].productcolor['Color']['nameColor']}
                      </Text>:<Text></Text>
                      }
                      
                      <Text style={styles.text}>x {item.OrdersProducts[0].quantity}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                      <Text></Text>
                      <View style={{width: hs(220), alignItems: 'flex-end'}}>
                        <Text style={{fontSize: 15}}>
                          {(item.OrdersProducts[0].ProductColorConfig? item.OrdersProducts[0].ProductColorConfig['price']:item.OrdersProducts[0].Product["price"]).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {item.OrdersProducts.length > 1 ? (
                  <View style={{borderWidth: 0.2, marginBottom: 5}}>
                    <Text style={{alignSelf: 'center', margin: 5}}>Xem thêm sản phẩm</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
              <View style={{height: 1, width: '100%', backgroundColor: '#D9D9D9'}} />
              <View style={styles.viewTextTotal}>
                <Text style={styles.textQuantity}>
                  {item.OrdersProducts.length == 1
                    ? item.OrdersProducts[0].quantity
                    : item.OrdersProducts[0].quantity + item.OrdersProducts.length}{' '}
                  sản phẩm
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 16}}>Thành tiền :</Text>
                  <Text style={{color: 'red', fontSize: 16}}>
                    {item.total.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                  </Text>
                </View>
              </View>
              <View style={{height: 1, width: '100%', backgroundColor: '#D9D9D9'}} />
              <View style={{alignSelf: 'flex-end', marginHorizontal: 10}}>
                {item.statusOrder == 1||item.status == '3' ? null : (
                  <BaseButton
                    onPress={() => {
                      onShow(item);
                    }}
                    text={getStatusTextButton(item.status)}
                    style={styles.buttonCancer}
                  />
                )}
              </View>
              <View style={{height: 10, width: '100%', backgroundColor: '#F1F1F1', marginTop: 10}}></View>
            </View>
          )}
        />
      </ScrollView>
    )}
  </View>
);
export default React.memo(HistoryOrderScreen);
