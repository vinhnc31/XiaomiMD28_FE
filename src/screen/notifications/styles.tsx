import { ms, vs, hs } from '@src/styles/scalingUtils';
import { StyleSheet, Dimensions } from 'react-native';
const WIDTH_50PT = Dimensions.get('window').width - hs(375 / 2);
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vs(15),
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: ms(22),
    fontFamily: 'LibreBaskerville-Bold',
    color: 'black',
    marginLeft: hs(20),
  },
  viewItemNotification: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: vs(6),
    height: vs(120),
    borderRadius: ms(10),
    borderWidth: 0.8,
    paddingHorizontal: hs(8),
    paddingVertical: vs(8),
    borderColor: '#000000',
    marginHorizontal: hs(16),
    elevation: 5, // Độ sâu của đổ bóng (cho Android)
    shadowColor: '#000000', // Màu của đổ bóng (cho iOS)
    shadowOffset: { width: 0, height: 4 }, // Độ dài và độ rộng của đổ bóng (cho iOS)
    shadowOpacity: 0.4, // Độ trong suốt của đổ bóng (cho iOS)
    shadowRadius: 4, // Bán kính của đổ bóng (cho iOS)
  },
  imgNotification: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: ms(8),
  },
  viewTextNotification: {
    flex: 8,
    paddingLeft: hs(8),
  },
  textContentNotification: {
    marginTop: vs(5),
    fontSize: ms(14),
    fontFamily: 'LibreBaskerville-Bold',
    color: '#000000',
  },
  textQuantityNotification: {
    fontSize: ms(14),
    fontFamily: 'LibreBaskerville-Bold',
    color: '#000000',
  },
  LoadingContainer: {
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
  },
  noDataContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  noDataText: {
    color: 'black', // Màu văn bản
    fontSize: ms(18),
    fontFamily: 'LibreBaskerville-Bold',
    marginBottom: vs(250),
  },
});
