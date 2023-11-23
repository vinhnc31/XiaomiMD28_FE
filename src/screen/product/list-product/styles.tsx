import {ms, vs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
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

  //Gợi ý hôm nay
  flatListSuggestContainer: {
    justifyContent: 'space-between',
  },

  suggestItem: {
    width: Dimensions.get('window').width / 2 - 24,
    // width: 170,
    height: vs(256),
    borderColor: '#F6F8F6',
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: vs(8),
    marginVertical: vs(6),
    borderRadius: vs(10),
    backgroundColor: '#ffffff',

    elevation: 2,
    shadowColor: '#817F7F',
    shadowOffset: {width: 0, height: 2},
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

 
  viewFilter: {
    width: '100%',
    height: 100,
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
    color: '#fff',
    fontSize: ms(20),
    fontFamily: 'Lato-Bold',
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
});
