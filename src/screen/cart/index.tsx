import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_NAVIGATION, GUEST_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, FlatList, Image, TouchableOpacity, ScrollView, TextInput, Alert} from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import styles from './styles';
import {goBack, navigateToPage} from '@src/navigations/services';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import {BaseLoading} from '@src/containers/components/Base/BaseLoading';
import BaseHeaderBottom from '@src/containers/components/Base/BaseHeaderBottom';
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.CART>;
}
type Cart = {
  checked: boolean;
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
};

const url = 'http://192.168.0.102:3000/api/cart/1';
const CartScreen = (props: Props) => {
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const incrementQuantity = () => {
    const updatedQuantity = item.quantity + 1;
    fetch(`https://653b1ae72e42fd0d54d4b17a.mockapi.io/data/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({quantity: updatedQuantity}),
    });
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setData(data.data.data);
      setLoading(false);
    } catch (error) {
      setError('err');
      setLoading(false);
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
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart
        title="Giỏ hàng"
        onBackPress={() => {
          goBack();
        }}
      />
      <View style={{flex: 1}}>
        {loading ? (
          <BaseLoading size={20} top={100} loading={true} />
        ) : data.length === 0 ? (
          <View style={styles.flatListContainer}>
            <View style={{alignItems: 'center', marginTop: 100}}>
              <Image source={require('../../assets/images/group84.png')} style={{width: 170, height: 170}}></Image>
            </View>
          </View>
        ) : (
          <ScrollView indicatorStyle="black" showsVerticalScrollIndicator={false}>
            <FlatList
              data={data}
              horizontal={true}
              contentContainerStyle={styles.flatListContainer}
              renderItem={({item}) => (
                <View style={styles.item}>
                  {/* <Checkbox disabled={false} value={item.checked} onValueChange={() =>{}} /> */}
                  <View style={styles.view}>
                    <Image source={{uri: item['Product']['images']}} style={styles.image} resizeMode="stretch" />
                    <View style={styles.viewText}>
                      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
                        {item['Product']['name']}
                      </Text>
                      <Text style={styles.textPrice}>{item['Product']['price']}₫</Text>
                      <View style={styles.viewCount}>
                        <TouchableOpacity
                          disabled={item['quantity'] <= 1 ? true : false}
                          onPress={() => {}}
                          style={styles.buttomMinus}>
                          <Image
                            style={styles.imageCount}
                            source={{
                              uri: 'https://cdn-icons-png.flaticon.com/128/43/43625.png',
                            }}
                          />
                        </TouchableOpacity>
                        <TextInput
                          style={styles.textInputQuanity}
                          keyboardType="numeric"
                          maxLength={2}
                          value={item['quantity'].toString()}
                          onChangeText={value => {}}>
                          {}
                        </TextInput>
                        <TouchableOpacity onPress={() => {}} style={styles.buttomAdd}>
                          <Image
                            style={styles.imageCount}
                            source={{
                              uri: 'https://cdn-icons-png.flaticon.com/128/2997/2997933.png',
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => {}}>
                    <Image style={{width: 25, height: 25}} source={require('../../assets/images/close.png')} />
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>
        )}
      </View>
      {/* <BaseHeaderBottom
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue: any) => toggleAllCheckboxes(newValue)}
        SumText={calculateTotalCost()}
        check={allItemsChecked && !toggleCheckBox}
        data={handlePress}
      /> */}
    </SafeAreaView>
  );
};
export default React.memo(CartScreen);
