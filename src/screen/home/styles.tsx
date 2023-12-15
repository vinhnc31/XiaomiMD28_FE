import {ms, vs} from '@src/styles/scalingUtils';
import {Dimensions, Platform, StyleSheet} from 'react-native';
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
    alignItems: 'center',
    backgroundColor: '#FF6900',
    backgroundImage: 'linear-gradient(to bottom, #FF6900, #FFA500)',
  },


  inputContainer: {
    flex: 8,
    marginLeft: vs(16),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    height: vs(41),
    marginVertical: vs(8),
    borderRadius: vs(8),
    borderColor: '#EEEAEA',
    backgroundColor: '#F0F0F0',
  },
  buttonContainer: {
    flex: 1.3,
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
    marginTop: vs(8),
    marginBottom: vs(8),
    height: vs(140),
    // marginHorizontal: vs(16)
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
    width: vs(13),
    height: vs(11),
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
    borderRadius: vs(10),
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
    height: vs(160), 
    marginTop: vs(4),
    marginBottom: vs(4),
    borderRadius: vs(10),
    // borderWidth: 1,
    borderColor: '#C2C2C2',

    shadowColor: 'black', // Màu của đổ bóng (cho iOS)
    shadowOffset: { width: 0, height: 2 }, // Độ dài và độ rộng của đổ bóng (cho iOS)
    shadowOpacity: 0.2, // Độ trong suốt của đổ bóng (cho iOS)
    shadowRadius: 2, // Bán kính của đổ bóng (cho iOS)
  },
  image: {
    flex: 1,
    height: '100%', // Ảnh sẽ đầy màn hình theo chiều cao
    width: 'auto',
    borderRadius: vs(10),
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
    width: Dimensions.get('window').width / 2 - 16 ,
    // width: 170,
    height: vs(270),
    borderColor: '#F6F8F6',
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: vs(4),
    marginVertical: vs(4),
    borderRadius: vs(10),
    backgroundColor: '#ffffff', 
    padding: 12,

    elevation: 1, 
    shadowColor: '#817F7F', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 0, 
  }, 

  viewSuggestImage: {
    flex: 7, 
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



  //
  videoContainer: {
    width: 275,
    paddingVertical: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  videoPreview: {
    width: 275,
    height: 155,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  desc: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 18,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },

});
