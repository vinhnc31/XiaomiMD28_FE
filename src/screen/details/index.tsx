import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BaseHeader from '@src/containers/components/Base/BaseHeader';
import {APP_NAVIGATION, GUEST_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, FlatList, TouchableWithoutFeedback, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';

interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.DETAILS>;
}

const DetailsScreen = (props: Props) => {
  const [data, setData] = useState<Details[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  type Details = {
    id: string;
    image: string;
    name: string;
    quantityCategory: number;
  };

  const handleBackPress = () => {
    // Xử lý khi nút back được nhấn
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      <View>
        <View style={styles.container}>

          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image source={require('../../assets/images/back.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <View style={{flex: 8, alignItems: 'flex-start', justifyContent: 'center'}}>
            <Text numberOfLines={1} style={styles.title}>
              Chi tiết
            </Text>
          </View>

        </View>
        <View style={{borderColor: '#D9D9D9', borderWidth: 1.5}} />
      </View>

      <View style={{flex: 1, paddingHorizontal: 16}}></View>
    </SafeAreaView>
  );
};

export default React.memo(DetailsScreen);
