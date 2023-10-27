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
import AppNavigation from '@src/navigations/AppNavigation';
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
const CartScreen = (props: Props) => {
  const [error, setError] = useState('');
  const [data1, setData] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const calculateTotalCost = () => {
    let totalCost = 0;
    for (const item of data1) {
      if (item.checked) {
        totalCost += Number(item.price.replaceAll('.', '')) * item.quantity;
      }
    }
    return totalCost.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };
  const handleDeleteItem = (itemId) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa mục này?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Hủy xóa'),
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => confirmDelete(itemId),
        },
      ],
      { cancelable: false }
    );
  };
  const confirmDelete = (itemId) => {
    fetch(`https://653b1ae72e42fd0d54d4b17a.mockapi.io/cart/${itemId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedData = data1.filter((item) => item.id !== itemId);
        setData(updatedData);
      })
      .catch((error) => {
        console.error('Lỗi xóa: ', error);
      });
  };
  const reduceQuantity = itemId => {
    const updatedData = data1.map(item => {
      if (item.id === itemId) {
        const updatedQuantity = item.quantity - 1;
        fetch(`https://653b1ae72e42fd0d54d4b17a.mockapi.io/cart/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({quantity: updatedQuantity}),
        });
        return {...item, quantity: updatedQuantity};
      }
      return item;
    });
    setData(updatedData);
  };
  const incrementQuantity = async itemId => {
    const updatedData = data1.map(item => {
      if (item.id === itemId) {
        const updatedQuantity = item.quantity + 1;
        fetch(`https://653b1ae72e42fd0d54d4b17a.mockapi.io/cart/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({quantity: updatedQuantity}),
        });
        return {...item, quantity: updatedQuantity};
      }
      return item;
    });
    setData(updatedData);
  };
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
  const toggleItemCheckbox = (itemId: any) => {
    const updatedData = data1.map(item => (item.id === itemId ? {...item, checked: !item.checked} : item));
    setData(updatedData);
    const isAllChecked = updatedData.every(item => item.checked);
    if(data1.length===1){
      setToggleCheckBox(false);
    }
    else{
      setToggleCheckBox(isAllChecked);
    }
  };
  const textInput = (id, value) => {
    const updatedData = data1.map(item => {
      if (item.id === id) {
        fetch(`https://653b1ae72e42fd0d54d4b17a.mockapi.io/cart/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({quantity: value}),
        });
        return {...item, quantity: value};
      }
      return item;
    });
    setData(updatedData);
  };
  const toggleAllCheckboxes = newValue => {
    setData(prevData => prevData.map(item => ({...item, checked: newValue})));
    if (data1.length === 0) {
      setToggleCheckBox(true);
    }
    else{
      setToggleCheckBox(newValue)
    }
  };

  console.log(data1.length)
  const allItemsChecked = data1.every(item => !item.checked);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  useEffect(() => {
    calculateTotalCost();
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
  const handlePress = () => {
    
  };
  const data = data1
    .filter(item => item.checked)
    .map(item => {
      const totalCost = Number(item.price.replace('.', '')) * item.quantity;
      return {...item, totalCost};
    });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart title="Giỏ hàng" onBackPress={handleBackPress} />
      <View style={{flex: 1}}>
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
          <ScrollView indicatorStyle="black" showsVerticalScrollIndicator={false}>
            <FlatList
              data={data1}
              keyExtractor={item => item.id}
              horizontal={true}
              contentContainerStyle={styles.flatListContainer}
              renderItem={({item}) => (
                <View style={styles.item}>
                  <Checkbox disabled={false} value={item.checked} onValueChange={() => toggleItemCheckbox(item.id)} />
                  <View style={styles.view}>
                    <Image source={{uri: item.image}} style={styles.image} resizeMode="stretch" />
                    <View style={styles.viewText}>
                      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
                        {item.name}
                      </Text>
                      <Text style={styles.textPrice}>{item.price}₫</Text>
                      <View style={styles.viewCount}>
                        {item.quantity <= 1 ? (
                          <TouchableOpacity
                            disabled={true}
                            onPress={() => reduceQuantity(item.id)}
                            style={styles.buttomMinus}>
                            <Image
                              style={styles.imageCount}
                              source={{
                                uri: 'https://cdn-icons-png.flaticon.com/128/43/43625.png',
                              }}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            disabled={false}
                            onPress={() => reduceQuantity(item.id)}
                            style={styles.buttomMinus}>
                            <Image
                              style={styles.imageCount}
                              source={{
                                uri: 'https://cdn-icons-png.flaticon.com/128/43/43625.png',
                              }}
                            />
                          </TouchableOpacity>
                        )}
                        <TextInput
                          style={styles.textInputQuanity}
                          keyboardType="numeric"
                          maxLength={2}
                          onChangeText={value => {
                            textInput(item.id, value);
                          }}>
                          {item.quantity}
                        </TextInput>
                        <TouchableOpacity onPress={() => incrementQuantity(item.id)} style={styles.buttomAdd}>
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
                  <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                    <Image style={{width: 25, height: 25,}} source={require('../../assets/images/close.png')} />
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>
        )}
      </View>
      <BaseHeaderBottom
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue: any) => toggleAllCheckboxes(newValue)}
        SumText={calculateTotalCost()}
        check={allItemsChecked && !toggleCheckBox}
      />
    </SafeAreaView>
  );
};
export default React.memo(CartScreen);
