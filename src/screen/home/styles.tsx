import {ms, vs} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';
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
    fontFamily: 'LibreBaskerville-Bold',
    color: '#7F7D7D',
  },

  // danh muc
  categoryView: {
    marginTop: 8,
    height: vs(180),
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
    fontFamily: 'Ledger-Regular',
  },

  rightArrowImage: {
    width: 12,
    height: 12,
    marginTop: 4,
  },

  categoryItem: {
    width: vs(110),
    height: vs(150),
    marginRight: vs(12),
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  categoryImage: {
    width: vs(110),
    height: vs(110), 
  },

  viewCategoryImage: {
    width: '100%', alignItems: 'center', 
    justifyContent: 'center', 
    height: vs(110), 
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,

    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,

    // elevation: 3,
  },


  viewCategoryTextName: {
    fontSize: vs(16), 
    color: 'black', 
    marginTop: vs(4),
    fontFamily: 'LibreBaskervilleBold-A606',
  }
});
