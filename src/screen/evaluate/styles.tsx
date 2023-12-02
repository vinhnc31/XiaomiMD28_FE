import {ms, vs,hs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  star:{
    width:hs(30),
    height: vs(30),
    resizeMode:'cover',
    margin:ms(5)
  }
  });
  