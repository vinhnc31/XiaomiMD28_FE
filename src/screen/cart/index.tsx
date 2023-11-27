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
import CartService from '@src/services/cart';
import {CartModel} from '@src/services/cart/cart.model';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.CART>;
}
const CartScreen = (props: Props) => {
  const [error, setError] = useState('');
  const [data, setData] = useState<CartModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const handleDeleteItem = (itemId:number) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa sản phẩm này không?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Hủy xóa'),
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: async () => {
            try {
              const savedData = await AsyncStorage.getItem('cartData');
              if (savedData) {
                const cartData = JSON.parse(savedData);
                const updatedCartData = cartData.filter((item)=>item.id !== itemId);
                await AsyncStorage.setItem('cartData', JSON.stringify(updatedCartData));
                setData(updatedCartData);
              }
              const cartService = new CartService();
              const result = await cartService.deleteCart(itemId);
            } catch (error) {
              console.error('Error deleting item from AsyncStorage', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const cartService = new CartService();
      const result = await cartService.fetchCart();
      const latestData = result.data.data;
      const savedData = await AsyncStorage.getItem('cartData');
      const isDataChanged = JSON.stringify(latestData) !== savedData;
    if (isDataChanged) {
      setData(latestData);
      await AsyncStorage.setItem('cartData', JSON.stringify(latestData));
    }
    setData(latestData);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu', error);
      setLoading(false);
    }
  };
  const updateQuantity = async (itemId: number, newQuantity: number) => {
    try {
      const savedData = await AsyncStorage.getItem('cartData');
      if (savedData) {
        const cartData = JSON.parse(savedData);
        const updatedCartData = cartData.map((item: CartModel) => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity: newQuantity,
            };
          }
          return item;
        });
        await AsyncStorage.setItem('cartData', JSON.stringify(updatedCartData));
        setData(updatedCartData);
      }
    } catch (error) {
      console.error('Error updating quantity in AsyncStorage', error);
    }
  };
  
  const incrementQuantity = async (itemId: number, newQuantity: number) => {
    await updateQuantity(itemId, newQuantity + 1);
  };
  
  const minusQuantity = async (itemId: number, newQuantity: number) => {
    await updateQuantity(itemId, newQuantity - 1);
  };
  
  const textInput = async (itemId: number, newQuantity: number) => {
    await updateQuantity(itemId, newQuantity);
  };
  const toggleCheckbox = (itemId: number) => {
    const isSelected = selectedItems.includes(itemId);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  const selectAllItems = () => {
    const allItemIds = data.map((item) => item.id);
    const allSelected = allItemIds.every((id) => selectedItems.includes(id));
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(allItemIds);
    }
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedItems.forEach((itemId) => {
      const selectedItem = data.find((item) => item.id === itemId);
      if (selectedItem) {
        totalPrice += selectedItem.Product['price'] * selectedItem.quantity;
      }
    });

    return totalPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };
  useEffect(() => {
    setLoading(true);
    if (refreshing) {
      fetchData()
        .then(() => setRefreshing(false))
        .catch(() => setRefreshing(false));
    } else {
      fetchData();
    }
  }, [refreshing]);
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
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
                   <Checkbox
                   style={{width: 30,}}
                      value={selectedItems.includes(item.id)}
                      onValueChange={() => toggleCheckbox(item.id)}
                    />
                  <View style={styles.view}>
                    <Image source={{uri: item.Product['images']}} style={styles.image} resizeMode="stretch" />
                    <View style={styles.viewText}>
                      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
                        {item.Product['name']}
                      </Text>
                      <Text style={styles.textPrice}>{item.Product['price'].toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</Text>
                      <View style={styles.viewCount}>
                        <TouchableOpacity
                          disabled={item.quantity <= 1 ? true : false}
                          onPress={() => {
                            minusQuantity(item.id, item.quantity);
                          }}
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
                          value={item.quantity.toString()}
                          onChangeText={(value) => {
                            const newQuantity = parseInt(value, 10) || 0;
                              textInput(item.id, newQuantity);
                          }}
                          />
                          <View>
                            
                          </View>
                        <TouchableOpacity 
                          onPress={() => {
                            incrementQuantity(item.id, item.quantity);
                          }}
                          style={styles.buttomAdd}>
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
                  <View>
                  <TouchableOpacity style={{position:'relative',zIndex:1,top:-10,right:-5}} onPress={() => {handleDeleteItem(item.id)}}>
                    <Image style={{width: 25, height: 25}} source={require('../../assets/images/close.png')} />
                  </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </ScrollView>
        )}
      </View>
      <BaseHeaderBottom disabled={false} 
      value={selectedItems.length === data.length&& data.length > 0}
      onValueChange={selectAllItems}
      SumText={calculateTotalPrice()}
      check={selectedItems.length <= 0}
      />
    </SafeAreaView>
  );
};
export default React.memo(CartScreen);
