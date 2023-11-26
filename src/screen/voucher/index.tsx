import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import styles from './styles';
import {goBack, navigateToPage} from '@src/navigations/services';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import {BaseButton} from '@src/containers/components/Base/BaseButton';
import CustomRadioButton from '@src/containers/components/Base/BaseRadioButton';
import {BaseLoading} from '@src/containers/components/Base/BaseLoading';
import VouCherService from '@src/services/voucher';
import { VoucherModel } from '@src/services/voucher/voucher.model';
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.VOUCHER>;
}
const VouCherScreen = (props: Props) => {
  const [data, setData] = useState<VoucherModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const voucherService = new VouCherService();
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await voucherService.getVoucher();
      setData(result.data)
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    setSelectedVoucher(props.route.params?.selectedVoucherData?.id);
  }, [props.route.params]);
  const handleRadioButtonPress = voucherId => {
    setSelectedVoucher(voucherId);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart title="Voucher" onBackPress={goBack} />
      {loading ? (
        <BaseLoading size={20} top={100} loading={true} />
      ) : data.length === 0 ? (
        <View style={styles.flatListContainer}>
          <View style={{alignItems: 'center', marginTop: 100}}>
            <Image
              resizeMode="contain"
              source={require('../../assets/images/Errorvoucher.png')}
              style={{width: 200, height: 200}}></Image>
          </View>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.viewText}>
            <Text style={styles.styleText}>Mã giảm giá</Text>
            <Text>Có thể chọn 1 Voucher</Text>
          </View>
          <View style={{height: 1, backgroundColor: '#D9D9D9'}}></View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal={false}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleRadioButtonPress(item.id)}>
                <View style={styles.viewItem}>
                  <View style={styles.item}>
                    <View style={styles.viewImageVocher}>
                      <Image source={{uri: item.image}} style={styles.image} resizeMode="stretch" />
                      <Text style={{color: 'white'}}>{item.discount} %</Text>
                    </View>
                    <View style={styles.viewText}>
                      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
                        Giảm giá {item.discount} %
                      </Text>
                    </View>
                    <View style={{justifyContent: 'center', marginRight: 10}}>
                      <CustomRadioButton selected={selectedVoucher == item.id} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      )}
      {loading ? null : (
        <BaseButton
          text="Đồng ý"
          style={styles.buttonText}
          disable={data.length === 0 ? true : false}
          onPress={() => {
            goBack();
            const selectedVoucherData = data.find(voucher => voucher.id === selectedVoucher);
            const onVoucherSelect = props.route.params?.onVoucherSelect(selectedVoucherData);
          }}
        />
      )}
    </SafeAreaView>
  );
};
export default React.memo(VouCherScreen);
