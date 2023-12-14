import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import R from '@src/res'
import { useFocusEffect } from '@react-navigation/native';
import { CartModel } from '@src/services/cart/cart.model';
import CartService from '@src/services/cart';
import { useAuth } from '@src/hooks/useAuth';
import { vs, width } from '@src/styles/scalingUtils';
const BaseHeaderLisPrd = ({ title, onBackPress, onCartPress, onFilterPress }: any) => {
  const [filterIcon, setFilterIcon] = useState(R.images.iconFilter);
  const [data, setData] = useState<CartModel[]>([]);
  const cartService = new CartService();
  const {user} = useAuth();
  const toggleFilterIcon = () => {
    setFilterIcon(filterIcon === R.images.iconFilter ? R.images.iconFiltered : R.images.iconFilter);
  };
  useFocusEffect(
    React.useCallback(() => {
      featchCart();
    }, [user]),
  );
  const featchCart = async () => {
    if(user){
      const resultCart = await cartService.fetchCart(user?.id!);
      setData(resultCart.data);
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={onBackPress}>
            <Image source={R.images.iconBack} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 8, alignItems: 'flex-start', justifyContent: 'center' }}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
        </View>

        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <TouchableOpacity onPress={() => { onFilterPress(); toggleFilterIcon(); }}>
            {/* <Image source={R.images.iconFilter} style={styles.iconFilter} /> */}
            <Image source={filterIcon} style={styles.iconFilter} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1.2, }}>
          <TouchableOpacity onPress={onCartPress}>
          <View>
                <Image style={{width: vs(30), height: vs(30)}} source={R.images.iconCartBlack} />
                <View
                  style={{
                    height: 20,
                    width: 20,
                    backgroundColor: 'red',
                    position: 'absolute',
                    right: 3,
                    top: -5,
                    borderRadius: 20,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white'}}>{data.length}</Text>
                </View>
              </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ borderColor: '#D9D9D9', borderWidth: 1.5 }} />

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconFilter: {
    width: 28,
    height: 28,
  },
  title: {
    fontSize: 18,
    fontFamily: 'LibreBaskerville-Bold',
    color: 'black',
    marginLeft: 20
  },
});

export default BaseHeaderLisPrd;