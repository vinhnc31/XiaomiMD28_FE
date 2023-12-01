import {ms, vs, hs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F1F1F1',
    width: '100%',
  },
  container: {
    marginBottom: vs(89),
  },
  backContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    marginTop: vs(20),
    marginLeft: hs(20),
  },
  iconBack: {
    width: hs(30),
    height: vs(38),
  },

  icon: {
    width: hs(30),
    height: vs(30),
  },

  title: {
    fontSize: ms(22),
    fontFamily: 'LibreBaskerville-Bold',
    color: 'black',
    marginLeft: hs(20),
  },

  item: {
    flex: 1,
    height: 'auto',
    marginBottom: vs(10),
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    marginTop: vs(10),
    height: vs(265),
    marginBottom: vs(30),
    backgroundColor: '#EFEFEF',
  },
  image: {
    height: vs(50),
    width: 'auto',
  },
  overlayIconFavorite: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    justifyContent: 'center',
    top: vs(100),
    left: 0,
    right: vs(-10),
    bottom: 0,
  },
  iconFavoriteContainer: {alignItems: 'flex-end', justifyContent: 'center'},
  imgFavourite: {
    width: hs(100),
    height: vs(100),
    marginRight: vs(10),
  },
  priceNameViewStarContainer: {
    flex: 1.5,
    marginHorizontal: hs(20),
  },
  nameContainer: {flex: 1, justifyContent: 'center', marginBottom: 8},
  text: {
    fontSize: ms(18),
    color: '#000',
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
  },
  textName: {
    marginTop: vs(5),
    fontSize: ms(20),
    color: '#000',
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
  },
  textStar: {
    fontSize: ms(14),
    color: '#000',
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
  },
  priceText: {
    marginTop: vs(5),
    color: '#F00',
    fontSize: ms(20),
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
  },
  viewStar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(8),
    marginBottom: vs(20),
  },
  imgStar: {
    width: hs(13),
    height: vs(15),
    marginRight: hs(5),
  },
  textCmt: {
    color: '#817F7F', // Màu văn bản
    fontSize: ms(14),
    fontFamily: 'LibreBaskerville-Bold',
    marginLeft: hs(5),
  },
  textSell: {
    color: '#817F7F', // Màu văn bản
    fontSize: ms(14),
    fontFamily: 'LibreBaskerville-Bold',
    marginLeft: 5,
  },
  textSellNumber: {
    color: '#000', // Màu văn bản
    fontSize: ms(14),
    fontFamily: 'LibreBaskerville-Bold',
  },
  // phan chọn màu
  flatListColorsContainer: {
    flex: 1,
    marginHorizontal: hs(20),
    marginBottom: vs(15),
  },
  mainDescription: {flex: 1, backgroundColor: '#FFFFFF', marginBottom: vs(10)},
  btnColorsContainer: {
    flex: 1,
    marginRight: hs(5),
  },
  btnColors: {
    height: vs(30),
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: ms(6),
    borderWidth: 0.3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  txtNameColors: {
    fontSize: ms(12),
    fontFamily: 'LibreBaskerville-Bold',
    fontWeight: '400',
    marginHorizontal: hs(14),
    color: '#000000',
  },
  // part 2
  // mo ta chi tiet
  descriptionContainer: {
    marginHorizontal: hs(20),
  },
  descriptionTitle: {
    fontSize: ms(14),
    color: '#000',
    fontWeight: '200',
    fontFamily: 'LibreBaskerville-Bold',
    marginTop: vs(14),
    marginBottom: vs(10),
  },
  descriptionText: {
    fontSize: ms(12),
    color: '#646464',
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
    marginBottom: vs(10),
  },
  descriptionImage: {
    width: hs(200),
    height: vs(200),
    alignSelf: 'center',
  },
  // xem them
  seeMore: {
    height: vs(30),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vs(15),
    backgroundColor: '#D9D9D9',
  },
  seeMoreText: {
    color: '#000',
    fontWeight: '400',
    fontSize: ms(13),
    fontFamily: 'LibreBaskerville-Bold',
    marginRight: hs(5),
  },
  imgPlus: {
    width: hs(13),
    height: vs(16),
  },
  // đánh giá về sp
  reviews: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: vs(15),
  },
  reviewBody: {marginHorizontal: 20},
  reviewsContainer: {
    width: '100%',
    height: vs(70),
  },
  reviewsContainer2: {
    flex: 1, //
    flexDirection: 'row',
    justifyContent: 'space-between', // Để căn chỉnh phần tử bên trong
    alignItems: 'center',
    marginTop: vs(8),
  },
  borderBottom: {width: '100%', borderBottomWidth: 1, borderColor: '#DDDDDD'},
  // tiêu đề và số lượng đánh giá
  reviewsTitle: {},
  reviewTitleText: {
    color: '#000',
    fontWeight: '400',
    fontSize: ms(14),
    fontFamily: 'LibreBaskerville-Bold',
  },
  reviewsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  numberReviews: {
    color: '#000',
    fontWeight: '400',
    fontSize: ms(14),
    fontFamily: 'LibreBaskerville-Bold',
    marginLeft: hs(5),
  },
  // điểm đánh giá và só sao
  starPoint: {
    flexDirection: 'row',
    marginVertical: vs(8),
    width: '50%',
  },
  pointText: {
    color: '#000',
    fontWeight: '400',
    fontSize: ms(12),
    fontFamily: 'LibreBaskerville-Bold',
  },
  seeMoreReviews: {
    marginLeft: vs(15),
    flexDirection: 'row',
    justifyContent: 'center', // Để căn chỉnh phần tử bên trong
    alignItems: 'center',
    alignSelf: 'center',
  },
  seeMoreReviewsText: {
    color: '#858383',
    fontWeight: '400',
    fontSize: ms(12),
    fontFamily: 'LibreBaskerville-Bold',
  },
  imgNext: {
    width: hs(8),
    height: vs(10),
    marginLeft: hs(1),
  },

  flatListContainer: {
    flex: 1,
    flexDirection: 'column', // Chia đều theo chiều dọc
  },

  // mua hang vv
  BuyandAddtoCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: vs(89),
  },
  leftContainerCart: {
    backgroundColor: '#2BBAA9',
    alignItems: 'center', // Canh giữa các phần tử theo chiều dọc
    justifyContent: 'center', // Canh giữa các phần tử theo chiều ngang
    width: '50%',
    height: '100%',
  },
  leftRowCart: {
    flexDirection: 'row', // Thiết lập hướng dòng là "row" để các phần tử con nằm ngang
    alignItems: 'center', // Canh giữa các phần tử theo chiều dọc
    justifyContent: 'center', // Canh giữa các phần tử theo chiều ngang
  },
  imgAddCart: {
    width: hs(33),
    height: vs(33),
  },
  txtAddCart: {
    color: '#FFFFFF',
    fontWeight: '300',
    fontSize: ms(11),
    fontFamily: 'LibreBaskerville-Bold',
    marginLeft: hs(5),
  },
  rightContainerBuy: {
    backgroundColor: '#FF6900',
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textBuy: {
    paddingHorizontal: '15%',
    paddingVertical: '5%',
    color: '#FFFFFF',
    fontWeight: '300',
    fontSize: ms(18),
    fontFamily: 'LibreBaskerville-Bold',
  },

  LoadingContainer: {
    height: '100%',
    justifyContent: 'center',
  },
});
