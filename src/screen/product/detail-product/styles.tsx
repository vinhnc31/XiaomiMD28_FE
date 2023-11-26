import {ms, vs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  container: {
    marginBottom: vs(60),
  },
  backContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    marginTop: 20,
    marginLeft: 20,
  },
  iconBack: {
    width: 30,
    height: 30,

  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 22,
    fontFamily: 'LibreBaskerville-Bold',
    color: 'black',
    marginLeft: 20,
  },

  item: {
    flex: 1,
    height: 'auto',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    marginTop: 10,
    height: 265,
    marginBottom: vs(30),
    backgroundColor: '#EFEFEF',
  },
  image: {
    // flex: 1,
    height: 50, 
    width: 'auto',
  },
  overlay: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    justifyContent: 'center',
    top: vs(100),
    left: 0,
    right: 0,
    bottom: 0,
  },
  imgFavourite: {
    width: 120,
    height: 120,
    marginRight: vs(10),
  },
  text: {
    fontSize: 18,
    color: '#2A2A2A',
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
  },
  textName: {
    marginTop: 5,
    fontSize: 25,
    color: '#2A2A2A',
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
  },
  textStar: {
    fontSize: 16,
    color: '#2A2A2A',
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
  },
  priceText: {
    marginTop: 5,
    color: 'red',
    fontSize: 25,
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
  },
  viewStar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  imgStar: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  textCmt: {
    color: '#817F7F', // Màu văn bản
    fontSize: 16,
    fontFamily: 'LibreBaskerville-Bold',
    marginLeft: 5,
  },
  textSell: {
    color: '#817F7F', // Màu văn bản
    fontSize: 16,
    fontFamily: 'LibreBaskerville-Bold',
    marginLeft: 5,
  },
  textSellNumber: {
    color: '#2A2A2A', // Màu văn bản
    fontSize: 16,
    fontFamily: 'LibreBaskerville-Bold',
  },
  // part 2
  // mo ta chi tiet
  descriptionContainer: {
    marginHorizontal: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    color: '#2A2A2A',
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
    marginTop: 14,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#646464',
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
    marginBottom: 10,
  },
  descriptionImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  // xem them
  seeMore: {
    height: vs(30),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
    marginBottom: 15,
  },
  seeMoreText: {
    color: '#2A2A2A',
    fontWeight: '400',
    fontSize: 16,
    fontFamily: 'LibreBaskerville-Bold',
    marginRight: 5,
  },
  imgPlus: {
    width: vs(15),
    height: vs(15),
  },
  // đánh giá về sp
  reviews: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
  },
  reviewsContainer: {
    width: '100%',
    height: vs(70),
  },
  reviewsContainer2: {
    flex: 1, //
    flexDirection: 'row',
    justifyContent: 'space-between', // Để căn chỉnh phần tử bên trong
    alignItems: 'center',
    marginTop: 8,
  },
  // tiêu đề và số lượng đánh giá
  reviewsTitle: {},
  reviewTitleText: {
    color: '#2A2A2A',
    fontWeight: '400',
    fontSize: 18,
    fontFamily: 'LibreBaskerville-Bold',
  },
  reviewsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  numberReviews: {
    color: '#2A2A2A',
    fontWeight: '400',
    fontSize: 16,
    fontFamily: 'LibreBaskerville-Bold',
    marginLeft: 5,
  },
  // điểm đánh giá và só sao
  starPoint: {
    flexDirection: 'row',
    marginVertical: 8,
    width: '50%',
  },
  pointText: {
    color: '#2A2A2A',
    fontWeight: '400',
    fontSize: 16,
    fontFamily: 'LibreBaskerville-Bold',
  },
  seeMoreReviews: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'center', // Để căn chỉnh phần tử bên trong
    alignItems: 'center',
    alignSelf: 'center',
  },
  seeMoreReviewsText: {
    color: '#858383',
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'LibreBaskerville-Bold',
  },
  imgNext: {
    width: 14,
    height: 14,
    marginLeft: 4,
    marginTop: 2,
  },

  flatListContainer: {
    flex: 1,
    flexDirection: 'column', // Chia đều theo chiều dọc
  },

  // mua hang vv
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: vs(60),
  },
  leftContainerStyle: {
    backgroundColor: '#2BBAA9',
    flexDirection: 'row',
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBtn: {
    width: vs(100),
    alignItems: 'center',
  },

  imageStyle: {
    width: 50,
    height: 50,
  },
  lineverticalLines: {
    height: 35,
    borderLeftWidth: 0.8,
    borderColor: '#727272',
  },
  rightContainerStyle: {
    backgroundColor: '#FF6900',
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textLabelStyle: {
    paddingHorizontal: '15%',
    paddingVertical: '5%',
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 25,
    fontFamily: 'LibreBaskerville-Bold',
  },

  LoadingContainer: {
    height: '100%',
    justifyContent: 'center',
  },
});
