import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {ms, vs, hs} from '@src/styles/scalingUtils';
import R from '@src/res'

const BaseHeader = ({ title, onBackPress, onCartPress, onFilterPress, data }:any) => {
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

        {/* <View style={{flex: 1, alignItems: 'flex-start'}}>
          <TouchableOpacity onPress={onFilterPress}>
            <Image source={R.images.iconFilter} style={styles.iconFilter} />
          </TouchableOpacity>
        </View> */}
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <TouchableOpacity onPress={onCartPress}>
            <Image source={R.images.iconCartBlack} style={styles.icon} />
            <View
                  style={{
                    height: hs(16),
                    width: hs(16),
                    backgroundColor: 'red',
                    position: 'absolute',
                    right: hs(-5),
                    top: vs(-5),
                    borderRadius: ms(20),
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white'}}>{data?.length || 0}</Text>
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
    height:28,
  },
  title: {
    fontSize: ms(18),
    fontFamily: 'LibreBaskerville-Bold',
    color: 'black',
    marginLeft: hs(20)
  },
});

export default BaseHeader;