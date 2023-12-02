import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { BaseButton } from './BaseButton';

const BaseButtonPay = ({ totalPrice ,onOrderPress, check }) => {
  return (
    <View style={{ borderColor: '#D9D9D9', borderWidth: 1.5,}}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
          <Text style={styles.text}>
            Tổng thanh toán
          </Text>
          <Text style={styles.textPrice}>{totalPrice}</Text>
        </View>
        <BaseButton disable={check} onPress={() => {onOrderPress()}} text='Đặt hàng' style={{ width: 130, marginLeft: 10 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    fontFamily: 'LibreBaskerville-Bold',
  },
  textPrice: {
    fontSize: 16,
    fontFamily: 'LibreBaskerville-Bold',
    color: 'red',
  },
});

export default BaseButtonPay;
