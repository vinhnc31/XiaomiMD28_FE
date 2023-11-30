import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import R from '@src/res'

const BaseHeader = ({ title, onBackPress, onCartPress, onFilterPress }:any) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={onBackPress}>
            <Image source={R.images.iconBack} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={{flex: 8, alignItems: 'flex-start', justifyContent: 'center'}}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
        </View>

        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <TouchableOpacity onPress={onFilterPress}>
            <Image source={R.images.iconFilter} style={styles.iconFilter} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <TouchableOpacity onPress={onCartPress}>
            <Image source={R.images.iconCartBlack} style={styles.icon} />
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
    height:30,
  },
  iconFilter: {
    width: 28,
    height:28,
  },
  title: {
    fontSize: 18,
    fontFamily: 'LibreBaskerville-Bold',
    color: 'black',
    marginLeft: 20
  },
});

export default BaseHeader;