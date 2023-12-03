import {ms, vs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FF6900',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: vs(28),
    height: vs(28),
  },
  searchContainer: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: '95%',
    height: 40,
    marginRight: 4,
  },
  

  ///
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff', // Màu nền của mỗi phần tử gợi ý
  },
  suggestionText: {
    fontSize: 16,
    color: '#333', // Màu văn bản của mỗi phần tử gợi ý
  },

   // Kiểu dáng cho danh sách kết quả tìm kiếm
   resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },


  //
  suggestItem: {
    width: Dimensions.get('window').width / 2 - 12,
    height: vs(270),
    borderColor: '#F6F8F6',
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: vs(4),
    borderRadius: vs(10),
    backgroundColor: '#ffffff',

    elevation: 2,
    shadowColor: '#817F7F',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 12
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
    color: '#000000',
  },

  suggestTextPrice: {
    color: '#FF4C4C', // Màu văn bản
    fontSize: vs(14),
    fontFamily: 'LibreBaskerville-Bold',
  },

  text: {
    color: '#FF4C4C', // Màu văn bản
    fontSize: vs(14),
    fontFamily: 'LibreBaskerville-Bold',
  },
  viewStar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgStar: {width: vs(12), height: vs(12)},
  textCmt: {
    color: '#817F7F', // Màu văn bản
    fontSize: vs(14),
    fontFamily: 'LibreBaskerville-Bold',
  },


  flatListSuggestContainer: {
    justifyContent: 'space-between',
  },

});