import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BaseHeader from '@src/containers/components/Base/BaseHeader';
import {APP_NAVIGATION, GUEST_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, FlatList, TouchableWithoutFeedback, Image, TouchableOpacity} from 'react-native';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import styles from './styles';
import { goBack } from '@src/navigations/services';
interface Props {
    navigation: NativeStackNavigationProp<AppStackParam>;
    route: RouteProp<AppStackParam, GUEST_NAVIGATION.CART>;
}
const CartScreen =(props: Props)=> {
    return (
      <View>

      </View>
    );
}
export default React.memo(CartScreen);