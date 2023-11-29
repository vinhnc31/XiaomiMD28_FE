import {ms, vs, hs} from '@src/styles/scalingUtils';
import {StyleSheet, Dimensions} from 'react-native';
const WIDTH_50PT = Dimensions.get('window').width - hs(375 / 2);
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    marginBottom: 60,
  },
  borderBottom: {
    width: SCREEN_WIDTH,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
  },

  flatListContainer1: { 
    width: SCREEN_WIDTH, 
    marginVertical: vs(10),  
  },

  titleContainer: {
    flexDirection: 'row',
    height: vs(70),
    backgroundColor: '#F1F1F1',
  },

  textTitle: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: vs(70),
    marginTop: vs(5),
    backgroundColor: 'white',
  },
  titleTextContainer: { 
    flex: 9, 
    height: '100%', 
    justifyContent: 'center', 
    backgroundColor: '#F1F1F1' 
  },
  title: {
    fontSize: ms(35),
    marginLeft: hs(15),
    color: '#2A2A2A',
    fontFamily: 'LibreBaskerville-Bold',
  },

  buttonContainer: {
    flex: 2,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  // list yeu thich
  text: {
    fontSize: ms(14),
    color: '#2A2A2A',
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
  },
  textStar: {
    fontSize: ms(10),
    color: '#FB2A2A',
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
  },
  //danh sach yeu thich
  flatListContainer2: {
    flex: 1,
    flexDirection: 'column', // Chia đều theo chiều dọc
  },
  ProductItemContainer: {
    width: SCREEN_WIDTH,
  },
  item: {
    flex: 1,
    height: vs(233),
    marginTop: hs(8),
    marginBottom: vs(10),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, // Độ dày của đường kẻ border bên dưới
    borderBottomColor: '#C2C2C2', // Màu sắc của đường kẻ border bên dưới
    borderTopWidth: 0, // Độ dày của đường kẻ border bên trên (0px)

    elevation: 2, // Độ sâu của đổ bóng (cho Android)
    shadowColor: 'black', // Màu của đổ bóng (cho iOS)
    shadowOffset: {width: 0, height: vs(2)}, // Độ dài và độ rộng của đổ bóng (cho iOS)
    shadowOpacity: 0.2, // Độ trong suốt của đổ bóng (cho iOS)
    shadowRadius: ms(2), // Bán kính của đổ bóng (cho iOS)
  },
  imageContainer: {
    flex: 4,
    height: vs(150),
    marginBottom: vs(10),
    backgroundColor: '#FFFFFF',
  },

  image: {
    width: WIDTH_50PT,
    height: vs(165),
    resizeMode: 'contain',
    borderRadius: ms(5),
  },
  overlay: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: hs(20),
    top: vs(10),
    // backgroundColor: 'rgba(0, 0, 0, 0.2)', // Màu nền cho dòng văn bản (với độ trong suốt)
  },
  imgFavouriteContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  imgFavourite: {
    width: hs(70),
    height: vs(70),
  },
  productInfoContainer: {
    flex: 1.5,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  productNameContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 8,
  },
  //view đánh giá sản phẩm
  viewStar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vs(10),
  },
  imgStar: {
    width: hs(11),
    height: vs(11),
    marginRight: ms(5),
  },
  textCmt: {
    color: '#817F7F', // Màu văn bản
    fontSize: ms(10),
    fontFamily: 'LibreBaskerville-Bold',
    marginLeft: hs(5),
  },

  noDataContainer: {
    height: SCREEN_WIDTH,
    width: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noDataText: {
    color: 'black', // Màu văn bản
    fontSize: ms(18),
    fontFamily: 'LibreBaskerville-Bold',
    marginBottom: vs(250),
  },

  LoadingContainer: {
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
  },
});
