import React, {useEffect, useRef, useState} from 'react';
import {Image, Text, View} from 'react-native';
import csStyles from './styles';
import R from '@src/res';
import NetInfo from '@react-native-community/netinfo';

export default function InternetErrorComponent() {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return !isConnected ? (
    <View style={csStyles.view_loading}>
      <View style={csStyles.viewContent}>
        {/* <ActivityIndicator color="red" /> */}
        <Image source={R.images.noNetwork} />
        <Text style={csStyles.content}>Không có kết nối mạng</Text>
        <Text style={csStyles.title}>Vui lòng kiểm tra kết nối mạng của bạn</Text>
      </View>
    </View>
  ) : null;
}
