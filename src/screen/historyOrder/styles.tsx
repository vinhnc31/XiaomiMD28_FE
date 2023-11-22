import {ms, vs, hs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  viewText: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
  },
  styleText: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  viewImageVocher: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: ms(8),
    height: vs(100),
    width: hs(100),
    backgroundColor: 'orange',
    borderRadius: 10,
  },
  item: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    flexDirection: 'row',
  },
  view: {
    flexDirection: 'row',
  },
  image: {
    margin: ms(8),
    height: vs(40),
    width: hs(40),
  },
  text: {
    color: '#000000', // Màu văn bản
    fontSize: 20,
    fontFamily: 'LibreBaskerville-Bold',
    width: hs(200),
  },
  textPrice: {
    marginRight: 10,
    color: '#6D6D6D', // Màu văn bản
    fontSize: 18,
    fontFamily: 'LibreBaskerville-DpdE',
  },
  textColor: {
    color: '#6D6D6D',
    fontSize: 18,
    fontFamily: 'LibreBaskerville-DpdE',
  },
  viewItem: {
    flexDirection: 'column',
  },
  buttonText: {
    margin: 10,
    width: hs(350),
  },
  flatListContainer: {
    flex: 1,
    margin:10,
    flexDirection: 'column', 
  },
});
