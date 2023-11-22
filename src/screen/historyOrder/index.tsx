import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_NAVIGATION, GUEST_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
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
import {BaseButton} from '@src/containers/components/Base/BaseButton';
import CustomRadioButton from '@src/containers/components/Base/BaseRadioButton';
import {BaseLoading} from '@src/containers/components/Base/BaseLoading';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const MaterialTopTabs = createMaterialTopTabNavigator();
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.HISTORYORDER>;
}
type HISTORYORDER = {
  id: string;
  nameProduct: string;
  priceProduct: number;
  statusOrder: string;
  quantityProduct: number;
  createAt: string;
  colorProduct: string;
  imageProduct: string;
  saleProduct: string;
  totalProduct: number;
  paymentMethods: string;
  confirmationTime: string;
  deliveryTime: string;
  addressUser: {
    name: string;
    phone: string;
    note: string;
    address: string;
  };
};

const HistoryOrderScreen = (props: Props) => {
  const [selectedVouchers, setSelectedVouchers] = useState<HISTORYORDER[]>([]);
  const [data1, setData] = useState<HISTORYORDER[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://655c63b225b76d9884fd1f63.mockapi.io/historyOrder');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart title="Lịch sử mua hàng" onBackPress={goBack} />
      <MaterialTopTabs.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 15, textTransform: 'none'},
          tabBarScrollEnabled: true,
          tabBarAndroidRipple: {borderless: false},
        }}>
        <MaterialTopTabs.Screen name="Tab1" options={{title: 'Chưa xác nhận'}}>
          {props => <HistoryOrderTab {...props} data={data1} loading={loading} />}
        </MaterialTopTabs.Screen>
        <MaterialTopTabs.Screen name="Tab2" options={{title: 'Đang vận chuyển'}}>
          {props => <HistoryOrderTab {...props} data={data1} loading={loading} />}
        </MaterialTopTabs.Screen>
        <MaterialTopTabs.Screen name="Tab3" options={{title: 'Chờ nhận hàng'}}>
          {props => <HistoryOrderTab {...props} data={data1} loading={loading} />}
        </MaterialTopTabs.Screen>
        <MaterialTopTabs.Screen name="Tab4" options={{title: 'Đã nhận'}}>
          {props => <HistoryOrderTab {...props} data={data1} loading={loading} />}
        </MaterialTopTabs.Screen>
        <MaterialTopTabs.Screen name="Tab5" options={{title: 'Đã hủy'}}>
          {props => <HistoryOrderTab {...props} data={data1} loading={loading} />}
        </MaterialTopTabs.Screen>
      </MaterialTopTabs.Navigator>
    </SafeAreaView>
  );
};
const HistoryOrderTab = ({data, loading}: {data: HISTORYORDER[]; loading: boolean}) => (
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
          keyExtractor={item => item.id}
          horizontal={false}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={{backgroundColor:'white'}}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.viewItem}>
                <View style={styles.item}>
                  <Image source={{uri: item.imageProduct}} style={styles.image} resizeMode="stretch" />
                  <View style={styles.viewItem}>
                    <Text style={{color: 'black', fontSize: 18, width: '50%'}} numberOfLines={1} ellipsizeMode="tail">
                      {item.nameProduct}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
                        Màu sắc: {item.colorProduct}
                      </Text>
                      <Text style={styles.text}>x {item.quantityProduct}</Text>
                    </View>
                    <Text style={styles.textStatus}>
                        {item.statusOrder}</Text>
                  </View>
                </View>
              </View>
              </TouchableOpacity>
              <View style={{height: 1,width: "100%", backgroundColor:'#D9D9D9',}}/>
              <View style={styles.viewTextTotal} >
                <Text style={styles.textQuantity}>{item.quantityProduct} sản phẩm</Text>
                <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:16}}>Thành tiền :</Text>
                  <Text style={{color:'red',fontSize:16}}>{item.totalProduct}₫</Text>
                </View>
              </View>
              <View style={{height: 1,width: "100%", backgroundColor:'#D9D9D9',}}/>
              <View style={{alignSelf:'flex-end',marginHorizontal:10}}>
              <BaseButton onPress={()=>{}} text='Hủy' style={styles.buttonCancer}/>
              </View>
              <View style={{height: 10,width: '100%',backgroundColor:'#F1F1F1',marginTop:10}}></View>
            </View>
          )}
        />
      </ScrollView>
    )}
  </View>
);
export default React.memo(HistoryOrderScreen);
