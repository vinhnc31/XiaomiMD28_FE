import {ms, vs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({

  //Gợi ý hôm nay
  flatListSuggestContainer: {
    justifyContent: 'space-between',
  },

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
  imgStar: {width: vs(15), height: vs(15), marginBottom: vs(3), marginRight: vs(2)},
  textCmt: {
    color: '#817F7F', // Màu văn bản
    fontSize: vs(14),
    fontFamily: 'LibreBaskerville-Bold',
  },

 
  viewFilter: {
    flexDirection: 'column',
    width: '100%',
    // height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: 'white',
    padding: 8,
    elevation: 2,
    shadowColor: '#817F7F',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 12,
    marginBottom: 12
  },


  buttonText: {
    color: '#000000',
    fontSize: ms(13),
    fontFamily: 'LibreBaskerville-Bold',
  },
  button: {
    height: vs(48),
    backgroundColor: Colors.primary,
    borderRadius: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(10),
    flexDirection: 'row',
  },



  modalContainer: {
    flex: 1,
    marginTop: vs(27),
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    backgroundColor: 'white',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    marginRight: 8,
  },
  checked: {
    backgroundColor: 'blue', // Màu nền khi checkbox được chọn
    borderColor: 'blue', // Màu viền khi checkbox được chọn
  },
  label: {
    fontSize: 16,
  },

  //
  dropdown: {
    height: 45,
    borderColor: 'gray',
    borderRadius: 4,paddingHorizontal: 8,
    flex: 1, 
    // marginHorizontal: 8,
    backgroundColor: '#D9D9D9',
    marginTop: 10
  },
  dropdown1: {
    height: 45,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 8,
    flex: 1, 
    backgroundColor: '#D9D9D9',
    marginTop: 10
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'LibreBaskerville-Bold',
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'LibreBaskerville-Bold',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  dropdownOptionText: {
    color: 'red'
  },
});