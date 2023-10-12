import {ms, vs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
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
    height: vs(160),
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },

  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  categoryText: {
    fontSize: 20,
    color: '#2A2A2A',
    fontFamily: 'LibreBaskerville-Bold',
  },

  viewButton: {flexDirection: 'row', alignItems: 'center'},

  seeMoreText: {
    color: '#5073EF',
    textDecorationLine: 'underline',
    marginRight: 4,
    fontFamily: 'LibreBaskerville-Regular',
    fontSize: vs(14)
  },

  rightArrowImage: {
    width: vs(12),
    height: vs(12),
    marginTop: 4,
  },

  categoryItem: {
    width: vs(90),
    height: vs(150),
    marginRight: vs(12),
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: 'center',
  },

  categoryImage: {
    width: vs(90),
    height: vs(110), 
  },

  viewCategoryImage: {
    width: vs(90), 
    height: vs(90), 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: vs(1),
    borderColor: '#CCCCCC',
    borderRadius: vs(20),
  },


  viewCategoryTextName: {
    fontSize: vs(14), 
    color: 'black', 
    marginTop: vs(4),
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
    width: '100%'
  },
  itemImage: {
    width: '100%', // Ảnh sẽ đầy màn hình theo chiều ngang
    // height: '100%',
    aspectRatio: 16/8, // Chỉ số khung hình ảnh (thay đổi theo ảnh)
  },
  itemText: {
    position: 'absolute',
    bottom: 0, // Đặt vị trí dưới cùng của hình ảnh
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền cho dòng văn bản (với độ trong suốt)
    color: 'white', // Màu văn bản
    padding: 10,
    fontSize: 20,
  },

  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

 
});
