import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const BaseAddressPay = ({name, phone,note,address, onCartPress}) => {
  return (
    <View>
      <TouchableOpacity onPress={onCartPress}>
        <View style={styles.container}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>{name}</Text>
            <View style={{height: 20, width: 1, backgroundColor: 'grey',marginHorizontal:10}}></View>
            <Text style={styles.text}>{phone}</Text>
          </View>
            {note !== null && note !== ""?<Text style={styles.textAddress}>Ghi chú: {note}</Text>:null}
            <Text style={styles.textAddress} >Địa chỉ: {address}</Text>
        </View>
        <Image source={require("../../../assets/images/next.png")}style ={{height:20,width: 20,}}/>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth:.5,
    marginHorizontal:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal:10,
    alignItems:'center',
    backgroundColor: 'white',
    borderRadius :10
  },
  text:{
    fontSize: 18, fontFamily: 'LibreBaskerville-Bold'
  },
  textAddress:{
    fontSize: 16, fontFamily: 'LibreBaskerville-Bold'
  }
});
export default BaseAddressPay;
