import {images} from '@src/res/images';
import {Colors} from '@src/styles/colors';
import {DimensionUtils} from '@src/utils/DimensionUtils';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {BaseImage} from './BaseImage';

export default function BaseScreenLoading() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
      }}>
      <BaseImage
        style={{marginTop: -DimensionUtils.getScreenHeight() * 0.5, alignSelf: 'center'}}
        image={images.logoApp}
        width={DimensionUtils.getScreenWidth() * 0.8}
        height={109}
      />
      <ActivityIndicator size="large" color="#b0b0b0" style={{bottom:-110}} />
    </View>
  );
}
