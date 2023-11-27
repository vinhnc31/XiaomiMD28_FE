import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

class CustomRadioButton extends React.Component {
  render() {
    const { selected, onPress} = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
       <View style={styles.radioOuterCircle}>
          {selected && <Image source={require('../../../assets/images/confirm.png')} style={styles.innerImage} />}
        </View></TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  radioOuterCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerImage: {
    width: 20,
    height: 20,
    borderRadius: 8,
  },
});

export default CustomRadioButton;
