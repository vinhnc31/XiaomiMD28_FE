import {Colors} from '@src/styles/colors';
import {hs, ms, vs} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  tabBarLabelStyle: {
    fontFamily: 'Lato-Medium',
    fontSize: ms(13),
    lineHeight: vs(16),
    verticalAlign: 'top',
    letterSpacing: vs(-0.28),
    color: 'rgba(0, 0, 0, 0.6)',
  },
  tabBarActiveLabelStyle: {
    fontFamily: 'Lato-Bold',
    fontSize: ms(13),
    lineHeight: vs(16),
    verticalAlign: 'top',
    letterSpacing: vs(-0.28),
    color: Colors.primary,
  },
});
