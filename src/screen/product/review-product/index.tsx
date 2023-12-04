import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BaseHeader from '@src/containers/components/Base/BaseHeader';
import {GuestStackParam} from '@src/navigations/GuestNavigation/stackParam';
import {GUEST_NAVIGATION} from '@src/navigations/routes';
import {goBack} from '@src/navigations/services';
import ProductService from '@src/services/product';
import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import styles from '../list-product/styles';
import {BaseButton} from '@src/containers/components/Base';

import TouchableScale from 'react-native-touchable-scale';
import {ProductModel} from '@src/services/product/product.model';
import {ScrollView} from 'react-native';
import {hs} from '@src/styles/scalingUtils';
import R from '@src/res';
import BaseHeaderNoBack from '@src/containers/components/Base/BaseHeaderNoBack';

interface Props {
  navigation: NativeStackNavigationProp<GuestStackParam>;
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.REVIEWPRODUCT>;
}

const ReviewProductScreen = (props: Props) => {

  const handleBackPress = () => {
    goBack();
  };

  const handleCartPress = () => {};
  
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      <BaseHeaderNoBack title={'Đánh giá'} onCartPress={handleCartPress} />

      <ScrollView style={{paddingHorizontal: 8, backgroundColor: '#FBEFE5'}} showsVerticalScrollIndicator={false}>
        <Text>REVIEWS</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(ReviewProductScreen);
