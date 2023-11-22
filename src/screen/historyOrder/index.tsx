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
import { BaseLoading } from '@src/containers/components/Base/BaseLoading';
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.HISTORYORDER>;
}
type Voucher = {
  id: string;
  title: string;
  imageVoucher: string;
  titleVoucher: string;
  describe: string;
};

const VouCherScreen = (props: Props) => {
  const [selectedVouchers, setSelectedVouchers] = useState<Voucher[]>([]);
  const [error, setError] = useState('');
  const [data1, setData] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState('1');
  const [isFocus, setIsFocus] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://653b1ae72e42fd0d54d4b17a.mockapi.io/voucher');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError('err');
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  },[]);
  const handleRadioButtonPress = voucherId => {
    setSelectedVoucher(voucherId);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart title="Voucher" onBackPress={goBack} />
      {loading ? (
          <BaseLoading size={20} top={100} loading={true} />
        ) : data1.length === 0 ? (
          <View style={styles.flatListContainer}>
            <View style={{alignItems:'center',marginTop:100}}>
              <Image
                source={require('../../assets/images/group84.png')}
                style={{width: 170, height: 170}}></Image>
            </View>
          </View>
        ) : (
      <ScrollView  showsVerticalScrollIndicator={false}>
        <View style={styles.viewText}>
          <Text style={styles.styleText}>Mã giảm giá</Text>
          <Text>Có thể chọn 1 Voucher</Text>
        </View>
        <View style={{height: 1, backgroundColor: '#D9D9D9'}}></View>
       
        <FlatList
          data={data1}
          keyExtractor={item => item.id}
          horizontal={false}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleRadioButtonPress(item.id)}>
              <View style={styles.viewItem}>
                <View style={styles.item}>
                  <View style={styles.viewImageVocher}>
                    <Image source={{uri: item.imageVoucher}} style={styles.image} resizeMode="stretch" />
                    <Text style={{color: 'white'}}>{item.titleVoucher}</Text>
                  </View>
                  <View style={styles.viewText}>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
                      {item.title}
                    </Text>
                    <Text style={styles.textColor}>{item.describe}</Text>
                  </View>
                  <View style={{justifyContent:'center',marginRight:10}}>
                    <CustomRadioButton selected={selectedVoucher === item.id} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
       )}
        <BaseButton text="Đồng ý" style={styles.buttonText}  onPress={()=>{goBack();
      const selectedVoucherData =data1.find((voucher) => voucher.id === selectedVoucher);
          const onVoucherSelect = props.route.params?.onVoucherSelect;
          onVoucherSelect && onVoucherSelect(selectedVoucherData);}}/>
    </SafeAreaView>
  );
};
export default React.memo(VouCherScreen);
