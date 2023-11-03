import {ms, vs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  //dung chung
  titleText: {
    fontSize: vs(18),
    color: '#2A2A2A',
    fontFamily: 'LibreBaskerville-Bold',
  },

  //view đánh giá sản phẩm
  viewStar: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  text: {
    color: '#FF4C4C', // Màu văn bản
    fontSize: vs(14),
    fontFamily: 'LibreBaskerville-Bold',
  },

  textCmt: {
    color: '#817F7F', // Màu văn bản
    fontSize: vs(14),
    fontFamily: 'LibreBaskerville-Bold',
  },

  imgStar: {width: vs(12), height: vs(12)},
  //

  //search
  mainContainer: {
    flexDirection: 'row',
    height: vs(60),
    paddingHorizontal: vs(8), 
  },
  inputContainer: {
    flex: 9,
    marginLeft: vs(8),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    height: vs(48),
    marginVertical: vs(8),
    borderRadius: vs(16),
    borderColor: '#EEEAEA',
    backgroundColor: '#F0F0F0',
  },
  buttonContainer: {
    flex: 1.5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: ms(16),
    fontFamily: 'LibreBaskerville-Regular',
    color: '#7F7D7D',
  },

  // danh muc
  categoryView: {
    marginTop: vs(16),
    marginBottom: vs(8),
    height: vs(140),
    backgroundColor: 'white',
    marginHorizontal: vs(16)
  },

  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  viewButton: {flexDirection: 'row', alignItems: 'center'},

  seeMoreText: {
    color: '#5073EF',
    textDecorationLine: 'underline',
    marginRight: vs(4),
    fontFamily: 'LibreBaskerville-Regular',
    fontSize: vs(14),
  },

  rightArrowImage: {
    width: vs(12),
    height: vs(12),
    marginTop: vs(4),
  },

  categoryItem: {
    flex: 1,
    flexDirection: 'column',
    width: vs(90),
    height: vs(140),
    marginRight: vs(12),
  },

  viewCategoryImage: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vs(16),
    backgroundColor: 'white',

    elevation: 2, // Độ sâu của đổ bóng (cho Android)
    shadowColor: 'black', // Màu của đổ bóng (cho iOS)
    shadowOffset: { width: 0, height: 2 }, // Độ dài và độ rộng của đổ bóng (cho iOS)
    shadowOpacity: 0.2, // Độ trong suốt của đổ bóng (cho iOS)
    shadowRadius: 2, // Bán kính của đổ bóng (cho iOS)
   
  },

  viewCategoryText: {
    flex: 3,
    alignItems: 'center',
  },

  categoryImage: {
    width: "100%",
    height: '100%',
    borderRadius: vs(16),
  },

  viewCategoryTextName: {
    fontSize: vs(14),
    color: 'black',
    marginTop: vs(6),
    fontFamily: 'LibreBaskerville-Regular',
  },

  //danh sach yeu thich
  flatListContainer: {
    flex: 1,
    flexDirection: 'column', // Chia đều theo chiều dọc
  },
  itemContainer: {
    flex: 1,
    height: Dimensions.get('window').height / 3, // Chia đều thành 3 phần theo chiều dọc
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: vs(2),

    elevation: 5, // Độ sâu của đổ bóng (cho Android)
    shadowColor: 'black', // Màu của đổ bóng (cho iOS)
    shadowOffset: { width: 0, height: 2 }, // Độ dài và độ rộng của đổ bóng (cho iOS)
    shadowOpacity: 0.2, // Độ trong suốt của đổ bóng (cho iOS)
    shadowRadius: 2, // Bán kính của đổ bóng (cho iOS)
  },
  item: {
    flex:1,
    width: Dimensions.get('window').width,
    height: vs(168), 
    marginTop: vs(8),
    marginBottom: vs(10),
    borderRadius: vs(20),
    // borderWidth: 1,
    borderColor: '#C2C2C2',

    elevation: 2, // Độ sâu của đổ bóng (cho Android)
    shadowColor: 'black', // Màu của đổ bóng (cho iOS)
    shadowOffset: { width: 0, height: 2 }, // Độ dài và độ rộng của đổ bóng (cho iOS)
    shadowOpacity: 0.2, // Độ trong suốt của đổ bóng (cho iOS)
    shadowRadius: 2, // Bán kính của đổ bóng (cho iOS)
  },
  image: {
    flex: 1,
    height: '100%', // Ảnh sẽ đầy màn hình theo chiều cao
    width: 'auto',
    borderRadius: vs(20),
  },
  overlay: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.2)', // Màu nền cho dòng văn bản (với độ trong suốt)
  },


  imgFavourite: {
    width: vs(25),
    height: vs(25),
    marginRight: vs(10),
    marginBottom: vs(6),
  },

  //Gợi ý hôm nay
  flatListSuggestContainer: {
    justifyContent: 'space-between',
  },

  suggestItem: {
    width: Dimensions.get('window').width / 2 - 32 ,
    // width: 170,
    height: vs(256),
    borderColor: '#F6F8F6',
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: vs(8),
    marginVertical: vs(6),
    borderRadius: vs(20),
    backgroundColor: '#F8F6F6', 

    elevation: 5, 
    shadowColor: '#817F7F', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 2, 
  }, 

  viewSuggestImage: {
    flex: 6, 
    width: '100%',
    height: '100%',
    borderRadius: vs(20),
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewSuggestText: {
    flex: 3,
    width: '100%',
    height: '100%',
    borderRadius: vs(20),
    paddingHorizontal: vs(12),
    justifyContent: 'space-around',

  },
  suggestTextName: {
    fontSize: vs(16), 
    fontFamily: 'LibreBaskerville-Regular',
    color: '#000000'
  },

  suggestTextPrice: {
    color: '#FF4C4C', // Màu văn bản
    fontSize: vs(14),
    fontFamily: 'LibreBaskerville-Bold',
  },


  //slideshow
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vs(20),
    overflow: 'hidden',
  },
  
  image1: {
    width: '100%',
    height: '100%',
    borderRadius: vs(20),
    overflow: 'hidden'
  },


});
