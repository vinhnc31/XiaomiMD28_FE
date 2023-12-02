import {RouteProp, useNavigation} from '@react-navigation/native';
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
import { Dimensions } from 'react-native';
import {ms, vs, hs} from '@src/styles/scalingUtils';
const MaterialTopTabs = createMaterialTopTabNavigator();
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.HISTORYORDER>;
}
const HistoryOrderScreen = (props: Props) => {
  const [data, setData] = useState<HistoryOrderModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const historyOrder = new HistoryOrderService();
  const {user} = useAuth();
  const fetchData = async (status: string) => {
    try {
      setLoading(true);
      const result = await historyOrder.getOrder(Number(user?.id), status);
      setData(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const navigation = useNavigation();
  const onHide = (): void => {
    setIsVisible(false);
  };

  const onShow = (): void => {
    setIsVisible(true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart title="Lịch sử mua hàng" onBackPress={navigation.goBack} />
      <MaterialTopTabs.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 15, textTransform: 'none'},
          tabBarScrollEnabled: true,
          tabBarAndroidRipple: {borderless: false},
        }}>
        <MaterialTopTabs.Screen
          name="Tab1"
          options={{title: 'Chưa xác nhận'}}
          listeners={{
            focus: () => fetchData('0'),
          }}>
          {props => <HistoryOrderTab {...props} data={data} loading={loading} onShow={onShow} />}
        </MaterialTopTabs.Screen>
        <MaterialTopTabs.Screen
          name="Tab2"
          options={{title: 'Đang vận chuyển'}}
          listeners={{
            focus: () => fetchData('1'),
          }}>
          {props => <HistoryOrderTab {...props} data={data} loading={loading} />}
        </MaterialTopTabs.Screen>
        <MaterialTopTabs.Screen
          name="Tab3"
          options={{title: 'Chờ nhận hàng'}}
          listeners={{
            focus: () => fetchData('2'),
          }}>
          {props => <HistoryOrderTab {...props} data={data} loading={loading} />}
        </MaterialTopTabs.Screen>
        <MaterialTopTabs.Screen
          name="Tab4"
          options={{title: 'Đã nhận'}}
          listeners={{
            focus: () => fetchData('3'),
          }}>
          {props => <HistoryOrderTab {...props} data={data} loading={loading} />}
        </MaterialTopTabs.Screen>
        <MaterialTopTabs.Screen
          name="Tab5"
          options={{title: 'Đã hủy'}}
          listeners={{
            focus: () => fetchData('4'),
          }}>
          {props => <HistoryOrderTab {...props} data={data} loading={loading} />}
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
              <BaseButton text="Xác nhận" onPress={() => {}} width={hs(100)} height={hs(35)} />
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
  if (status === '2') return 'Chờ giao hàng';
  if (status === '3') return 'Đã nhận';
  if (status === '4') return 'Đã hủy';
};
const HistoryOrderTab = ({
  data,
  loading,
  onShow,
}: {
  data: HistoryOrderModel[];
  loading: boolean;
  onShow: () => void;
}) => (
  <View>
    {loading ? (
      <BaseLoading size={20} top={100} loading={true} />
    ) : data.length === 0 ? (
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
              <TouchableOpacity onPress={() => {navigateToPage(APP_NAVIGATION.ORDERDETAIL,{item})}}>
                <View style={styles.viewItem}>
                  <View style={styles.item}>
                    <Image
                      source={{uri: item.OrdersProducts[0].productcolor['image']}}
                      style={styles.image}
                      resizeMode="stretch"
                    />
                    <View style={styles.viewItem}>
                      <Text style={{color: 'black', fontSize: 18, width: '50%'}} numberOfLines={1} ellipsizeMode="tail">
                        {item.OrdersProducts[0].Product['name']}
                      </Text>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between',width: hs(220),}}>
                        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
                          Màu sắc: {item.OrdersProducts[0].productcolor['Color']['nameColor']}
                        </Text>
                        <Text style={styles.text}>x {item.OrdersProducts[0].quantity}</Text>
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Text>
                        </Text>
                        <View style={{width: hs(220),alignItems:'flex-end'}}>
                        <Text style={{fontSize:15}}>{item.OrdersProducts[0].ProductColorConfig["price"].toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</Text>
                        </View>                       
                      </View>
                    </View>
                  </View>
                </View>
                {item.OrdersProducts.length > 1 ? (
                  <View style={{borderWidth: 0.2, marginBottom:5}}>
                    <Text style={{alignSelf: 'center', margin: 5}}>Xem thêm sản phẩm</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
              <View style={{height: 1, width: '100%', backgroundColor: '#D9D9D9'}} />
              <View style={styles.viewTextTotal}>
                <Text style={styles.textQuantity}>{item.OrdersProducts[0].quantity} sản phẩm</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 16}}>Thành tiền :</Text>
                  <Text style={{color: 'red', fontSize: 16}}>
                    {item.total.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                  </Text>
                </View>
              </View>
              <View style={{height: 1, width: '100%', backgroundColor: '#D9D9D9'}} />
              <View style={{alignSelf: 'flex-end', marginHorizontal: 10}}>
                <BaseButton
                  onPress={() => {
                    onShow();
                  }}
                  text="Hủy"
                  style={styles.buttonCancer}
                />
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
