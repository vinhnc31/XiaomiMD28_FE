import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_NAVIGATION, GUEST_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, FlatList, Image, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import styles from './styles';
import {goBack, navigateToPage} from '@src/navigations/services';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import {BaseLoading} from '@src/containers/components/Base/BaseLoading';
import BaseHeaderBottom from '@src/containers/components/Base/BaseHeaderBottom';
import AppNavigation from '@src/navigations/AppNavigation';
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.PAYDETAIL>;
}
type PayDetail = {
  checked: boolean;
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
};
const PayDetailScreen = (props: Props) => {
  const [error, setError] = useState('');
  const [data1, setData] = useState<PayDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://653b1ae72e42fd0d54d4b17a.mockapi.io/cart');
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
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
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
  const handleBackPress = () => {
    goBack();
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart title="Giỏ hàng" onBackPress={goBack()} />
      <View style={{flex: 1}}>
      </View>
    </SafeAreaView>
  );
};
export default React.memo(PayDetailScreen);
