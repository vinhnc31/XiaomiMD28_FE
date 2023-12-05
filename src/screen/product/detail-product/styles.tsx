import {ms, vs, hs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F1F1F1',
    width: '100%',
  },
  container: {
    //marginBottom: vs(60),
  },
  backContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    marginTop: vs(20),
    marginLeft: hs(15),
  },
  iconbackContainer: {
    flex: 1,
    width: vs(25),
    height: vs(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBack: {
    width: vs(30),
    height: vs(30),
  },

  title: {
    fontSize: ms(18),
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
    backgroundColor: '#FFF',
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
    top: vs(110),
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconFavoriteContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  imgFavourite: {
    width: hs(60),
    height: hs(60),
    marginRight: vs(10),
  },
  priceNameViewStarContainer: {
    flex: 1.5,
    marginHorizontal: hs(15),
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
  nameContainer: {flex: 1, justifyContent: 'center', marginBottom: 8},
  text: {
    fontSize: ms(18),
    color: '#000',
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
  },
  textName: {
    marginTop: vs(5),
    fontSize: ms(18),
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
    fontSize: ms(18),
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
    height: hs(13),
    marginRight: hs(5),
    marginBottom: vs(3),
  },
  imgStarCmt: {
    width: vs(15),
    height: vs(15),
    marginRight: hs(5),
  },
  imgStar2Cmt: {
    width: vs(13),
    height: vs(13),
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
    fontSize: ms(13),
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
    height: vs(40),
    marginHorizontal: hs(15),
    marginBottom: vs(18),
  },
  mainDescription: {flex: 1, backgroundColor: '#FFFFFF', marginBottom: vs(10)},
  btnColorsContainer: {
    flex: 1,
    height: vs(40),
    flexDirection: 'row',
  },
  btnColors: {
    marginRight: hs(10),
    height: vs(35),
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: ms(6),
    borderWidth: 0.4,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  txtNameColors: {
    fontSize: ms(13),
    fontFamily: 'LibreBaskerville-Bold',
    fontWeight: '400',
    marginHorizontal: hs(14),
    color: '#000000',
  },
  // part 2
  // mo ta chi tiet
  descriptionContainer: {
    marginHorizontal: hs(15),
  },
  descriptionTitle: {
    fontSize: ms(15),
    color: '#000',
    fontWeight: '200',
    fontFamily: 'LibreBaskerville-Bold',
    marginTop: vs(14),
    marginBottom: vs(10),
  },
  descriptionText: {
    fontSize: ms(13),
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
    backgroundColor: '#E8E8E8',
  },
  seeMoreText: {
    color: '#000',
    fontWeight: '400',
    fontSize: ms(13),
    fontFamily: 'LibreBaskerville-Bold',
    marginRight: hs(5),
  },
  imgPlus: {
    width: vs(15),
    height: vs(15),
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
    fontSize: ms(13),
    fontFamily: 'LibreBaskerville-Bold',
  },
  imgStarContainer: {marginLeft: hs(5), flexDirection: 'row', alignItems: 'center'},
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
    fontSize: ms(13),
    fontFamily: 'LibreBaskerville-Bold',
  },
  imgNext: {
    width: hs(8),
    height: vs(10),
    marginLeft: hs(1),
  },
  btnSeeMoreComment: {
    width: '100%',
    height: vs(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreComment: {
    color: '#858383',
    fontWeight: '400',
    fontSize: ms(13),
    fontFamily: 'LibreBaskerville-Bold',
  },

  flatListContainer: {
    flex: 1,
    flexDirection: 'column', // Chia đều theo chiều dọc
  },

  // mua hang vv
  BuyandAddtoCartContainer: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: vs(60),
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
    fontSize: ms(13),
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

  // model
  centeredViewModal: {
    flex: 1,
    justifyContent: 'flex-end',
    height: 'auto',
  },
  modalView: {
    width: '100%',
    height: '55%',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: ms(10),
    borderTopRightRadius: ms(10),
    borderWidth: 1,
    borderColor: '#DCDCDC',
    shadowColor: '#DCDCDC',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  //product info
  productModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  productModalImage: {width: hs(80), height: vs(80), marginLeft: hs(10), marginTop: vs(20)},
  productModalPriceQuantity: {flex: 1, marginLeft: hs(10), marginTop: vs(10), alignSelf: 'flex-end'},
  productModalPriceText: {
    marginTop: vs(5),
    color: '#F00',
    fontSize: ms(14),
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
  },
  productModalQuantityText: {
    color: '#817F7F',
    fontSize: ms(13),
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
    marginBottom: vs(10),
  },
  btnCloseModal: {marginBottom: vs(40), marginRight: hs(10)},
  iconCloseModal: {width: 30, height: 30},
  // colors modal
  modalProductColorContainer: {width: SCREEN_WIDTH - hs(25), marginLeft: hs(15)},
  modalProductColorTitle: {
    marginVertical: vs(10),
    color: '#000',
    fontSize: ms(13),
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
  },
  // thông số sản phẩm (ram)
  modalProductConfigContainer: {width: SCREEN_WIDTH - hs(25), marginLeft: hs(15)},
  modalProductConfigTitle: {
    marginVertical: vs(10),
    color: '#000',
    fontSize: ms(13),
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
  },
  // số lượng muốn thêm
  modalNumberProductContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH - hs(25),
    marginLeft: hs(15),
    alignItems: 'center',
  },
  modalNumberProductTitle: {color: '#000', fontSize: ms(15), fontWeight: '400', fontFamily: 'LibreBaskerville-Bold'},
  modalQuantityProductContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: hs(16),
    width: hs(100),
    height: vs(30),
  },
  modalBtnMinusPlus: {
    backgroundColor: '#E6E3E3',
    width: hs(30),
    height: vs(23),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalIconMinusPlus: {width: hs(13), height: vs(13)},
  modalQuantiyTextContainer: {
    alignItems: 'center', 
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#ECEAEA',
    width: hs(32),
    height: vs(23),
  },
  modalQuantiyText: {color: '#000', fontSize: ms(17), fontWeight: '400', fontFamily: 'LibreBaskerville-Bold'},

  // btn them 
  modalBtnAdd: {
    marginTop: vs(12),
    width: SCREEN_WIDTH - hs(25),
    height: vs(55),
    backgroundColor: '#FF6900',
    borderRadius: ms(10),
    marginBottom: vs(8),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalBtnText: {
    fontSize: ms(18),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  //renderItemComments
  itemCmtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(15),
    marginBottom: vs(8),
  },
  imgCmtAvatar: {width: vs(20), height: vs(20)},
  txtCmtName: {
    color: '#2A2A2A',
    fontWeight: '400',
    fontSize: ms(14),
    fontFamily: 'LibreBaskerville-Bold',
    marginLeft: hs(5),
  },
  imgStarCmtContainer: {flexDirection: 'row', alignItems: 'center', marginBottom: vs(8)},
  txtCmtBody: {
    marginBottom: vs(15),
    color: '#2A2A2A',
    fontWeight: '100',
    fontSize: ms(13),
    fontFamily: 'LibreBaskerville-Bold',
  },
  imgCmtBody: {width: hs(80), height: vs(80), marginBottom: vs(15)},
});
