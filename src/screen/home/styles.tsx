import {ms, vs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  //dung chung
  titleText: {
    fontSize: 18,
    color: '#2A2A2A',
    fontFamily: 'LibreBaskerville-Bold',
  },
  //search
  mainContainer: {
    flexDirection: 'row',
    height: vs(60),
  },
  inputContainer: {
    flex: 9,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    height: vs(48),
    marginVertical: vs(8),
    borderRadius: 16,
    borderColor: '#C2C2C2',
    backgroundColor: '#E8E8E8',
  },
  buttonContainer: {
    flex: 1.7,
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
    marginTop: 8,
    height: vs(140),
    backgroundColor: 'white',
    paddingHorizontal: 8,
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
    marginRight: 4,
    fontFamily: 'LibreBaskerville-Regular',
    fontSize: vs(14),
  },

  rightArrowImage: {
    width: vs(12),
    height: vs(12),
    marginTop: 4,
  },

  categoryItem: {
    width: vs(90),
    height: vs(140),
    marginRight: vs(12),
    padding: 8,
    alignItems: 'center',
  },

  viewCategoryImage: {
    width: vs(90),
    height: vs(90),
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: vs(1),
    borderColor: '#EEEAEA',
    borderRadius: vs(20),
  },

  categoryImage: {
    width: 85,
    height: 85,
    borderRadius: 16,
  },

  viewCategoryTextName: {
    fontSize: vs(12),
    color: 'black',
    marginTop: vs(6),
    fontFamily: 'LibreBaskerville-Regular',
  },

  //danh sach yeu thich
  flatListContainer: {
    flexDirection: 'column', // Chia đều theo chiều dọc
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
    height: Dimensions.get('window').height / 3, // Chia đều thành 3 phần theo chiều dọc
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 2,
  },
  item: {
    width: Dimensions.get('window').width - 16, // Width full màn hình
    height: 168, // Chiều cao cố định cho mỗi item
    marginTop: 5,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 8,
    borderColor: '#C2C2C2',
  },
  image: {
    width: '100%', // Ảnh sẽ đầy màn hình theo chiều ngang
    height: '100%', // Ảnh sẽ đầy màn hình theo chiều cao
    aspectRatio: 16 / 9,
    borderRadius: 16,
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
  text: {
    color: '#FF4C4C', // Màu văn bản
    fontSize: 14,
    fontFamily: 'LibreBaskerville-Bold',
  },

  imgFavourite: {
    width: 25,
    height: 25,
    marginRight: 8,
    marginBottom: 4,
  },


  //Gợi ý hôm nay
  flatListSuggestContainer: {
    // padding: 8, 
  },
  suggestItem: {
    flex: 1,
    flexDirection: 'column',
    width: Dimensions.get('screen').width / 2 - 20,
    height: 256,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 20
  }, 

  viewSuggestImage: {
    flex: 6, 
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewSuggestText: {
    flex: 4,
    backgroundColor: 'blue',
    width: '100%',
    height: '100%',
    borderRadius: 20

  }

});
