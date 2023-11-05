import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const BaseHeaderNoCart = ({ title, onBackPress, onCartPress }:any) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={onBackPress}>
            <Image source={require('../../../assets/images/back.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={{flex: 8, alignItems: 'flex-start', justifyContent: 'center'}}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
        </View>
      </View>
      <View style={{ borderColor: '#D9D9D9', borderWidth: 1.5 }} />

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical:15,
    backgroundColor: 'white',
  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 22,
    fontFamily: 'LibreBaskerville-Bold',
    color: 'black',
    marginLeft: 20
  },
});

export default BaseHeaderNoCart;