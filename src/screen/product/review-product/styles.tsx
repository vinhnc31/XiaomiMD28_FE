import {ms, vs, hs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  //renderItemComments
  itemCmtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(15),
    marginBottom: vs(8),
  },
  imgCmtAvatar: {width: vs(30), height: vs(30), borderRadius: ms(150)},
  txtCmtName: {
    color: '#2A2A2A',
    fontWeight: '400',
    fontSize: ms(16),
    fontFamily: 'LibreBaskerville-Bold',
    marginLeft: hs(5),
  },

  imgStarCmtContainer: {flexDirection: 'row', alignItems: 'center', marginTop: vs(5)},
  txtCmtBody: {
    marginVertical: vs(10),
    color: '#2A2A2A',
    fontWeight: '100',
    fontSize: ms(13),
    fontFamily: 'LibreBaskerville-Bold',
  },
  imgCmtBody: {width: hs(120), height: hs(120), marginBottom: vs(15), marginTop: vs(10)},
  borderBottom: {width: '100%', borderBottomWidth: 1, borderColor: '#DAD6D6', flex: 0.01},
  imgStarCmt: {
    width: hs(10),
    height: hs(10),
    marginRight: hs(5),
  },
  btnSeeMoreComment: {
    width: '100%',
    height: vs(35),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vs(5),
  },
  seeMoreReviewsText: {
    color: '#858383',
    fontWeight: '400',
    fontSize: ms(13),
    fontFamily: 'LibreBaskerville-Bold',
  },
  imgStar2Cmt: {
    width: vs(13),
    height: vs(13),
    marginRight: hs(5),
  },

  noDataContainer: {
    marginTop: vs(12),
    backgroundColor: '#FFFFFF',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  noDataText: {
    color: 'black', // Màu văn bản
    fontSize: ms(18),
    fontFamily: 'LibreBaskerville-Bold',
    marginBottom: vs(250),
  },
});
