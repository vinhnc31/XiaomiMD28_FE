import {ms, vs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  viewItemCategory: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#F4F4F4',
    marginVertical: 8,
    height: 90,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 20,
    borderWidth: 1,
    padding: 8,
    borderColor: '#F4F4F4',
    marginHorizontal: 16,
    
    elevation: 5, // Độ sâu của đổ bóng (cho Android)
    shadowColor: 'black', // Màu của đổ bóng (cho iOS)
    shadowOffset: {width: 0, height: 2}, // Độ dài và độ rộng của đổ bóng (cho iOS)
    shadowOpacity: 0.2, // Độ trong suốt của đổ bóng (cho iOS)
    shadowRadius: 2, // Bán kính của đổ bóng (cho iOS)
  },
  imgCategory: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  viewTextCategory: {
    flex: 8,
    justifyContent: 'center',
    paddingLeft: 16,
  },
  textNameCategory: {
    fontSize: 20,
    fontFamily: 'LibreBaskerville-Regular',
    color: '#000000',
  },
  textQuantityCategory: {
    fontSize: 14,
    fontFamily: 'LibreBaskerville-Regular',
    color: '#000000',
  },
});
