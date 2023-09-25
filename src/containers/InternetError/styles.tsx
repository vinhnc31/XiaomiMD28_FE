import {ms, vs} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  view_loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2,
  },
  viewContent: {
    backgroundColor: '#FCF0F0',
    padding: ms(20),
    borderRadius: 10,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: ms(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: '#943525',
    fontFamily: 'Lato-Medium',
    fontSize: ms(15),
  },
  content: {
    color: '#943525',
    fontFamily: 'Lato-Bold',
    fontSize: ms(18),
    marginVertical: vs(20),
  },
});
