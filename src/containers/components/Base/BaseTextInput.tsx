import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
const BaseTextInput = ({ name, hintext, onChangeText }) => {
  return (
      <View style={{alignSelf: 'flex-start', width: '100%'}}>
        <Text style={{fontSize: 16}}>{hintext}</Text>
        <TextInput
          placeholder= {hintext}
          style={styles.textInput}
          onChangeText={onChangeText}
          value={name}></TextInput>
      </View>
  );
};
const styles = StyleSheet.create({
    textInput:{
        borderWidth: 0.5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginVertical: 10,
        width: '100%',
      },
});

export default BaseTextInput;
