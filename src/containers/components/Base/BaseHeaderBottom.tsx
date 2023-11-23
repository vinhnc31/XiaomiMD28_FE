import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { BaseButton } from './BaseButton';
import { navigateToPage } from '@src/navigations/services';
import { APP_NAVIGATION } from '@src/navigations/routes';

const BaseHeaderBottom = ({disabled, value, onValueChange, SumText, check, data}: any) => {
  console.log(check)
  return (
    <View>
      <View style={{borderColor: '#D9D9D9', borderWidth: 1.5}} />
      <View style={styles.container}>
        <View style={styles.viewSum}>
          <CheckBox disabled={disabled} value={value} onValueChange={onValueChange}></CheckBox>
          <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE', color: 'black', width: 120, marginLeft: 10}}>
            Tổng thanh toán :
          </Text>
        </View>
        <View style={styles.viewButton}>
          <Text style={{marginTop: 5,marginRight:5, color: '#FF0000', fontSize: 15, fontFamily: 'LibreBaskerville-DpdE'}}>
            {SumText}
          </Text>
          <BaseButton disable={check} onPress={()=>data()} text='Thanh toán' style={{height:40,width: 120,}}/>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewSum: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: 10,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf:"flex-end",
    backgroundColor: 'white',
    marginRight:10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 15,
    fontFamily: 'LibreBaskerville-Bold',
    color: 'black',
    marginLeft: 20,
  },
});

export default BaseHeaderBottom;
