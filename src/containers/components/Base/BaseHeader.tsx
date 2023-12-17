import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {ms, vs, hs} from '@src/styles/scalingUtils';
import R from '@src/res';
import {useAuth} from '@src/hooks/useAuth';
import {CartModel} from '@src/services/cart/cart.model';
import CartService from '@src/services/cart';


const BaseHeader = ({title, onBackPress, onCartPress, onFilterPress, data}: any) => {

  const [cartData, setData] = useState<CartModel[]>([]);

  useEffect(() => {
    featchCart();
  }, []);


  const cartService = new CartService();
  const { user } = useAuth();

  const featchCart = async () => {
    if (user) {
      const resultCart = await cartService.fetchCart(user?.id!);
      setData(resultCart.data);
      console.log(resultCart.data)
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={onBackPress}>
            <Image source={R.images.iconBack} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={{flex: 8, alignItems: 'flex-start', justifyContent: 'center'}}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>

        <View style={{flex: 1, alignItems: 'flex-start', marginRight: 8}}>
          <TouchableOpacity onPress={onCartPress}>
            <View>
              <Image style={{ width: vs(35), height: vs(35) }} source={R.images.iconCartBlack} />
              <View
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: 'red',
                  position: 'absolute',
                  right: -5,
                  top: -5,
                  borderRadius: 20,
                  alignItems: 'center',
                }}>
                <Text style={{ color: 'white' }}>{cartData.length}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

            
      </View>
      <View style={{borderColor: '#D9D9D9', borderWidth: 1.5}} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: vs(60),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  icon: {
    width: vs(30),
    height: vs(30),
  },
  iconFilter: {
    width: 28,
    height: 28,
  },
  title: {
    fontSize: ms(18),
    fontFamily: 'LibreBaskerville-Bold',
    color: 'black',
    marginLeft: hs(20),
  },
});

export default BaseHeader;
