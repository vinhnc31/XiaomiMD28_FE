import {ms, vs,hs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  flatListContainer: {
    flex: 1,
    margin:10,
    flexDirection: 'column', // Chia đều theo chiều dọc
  },
  itemContainer: {
    flex: 1,
    height: Dimensions.get('window').height / 3, // Chia đều thành 3 phần theo chiều dọc
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 2,
    elevation: 5, // Độ sâu của đổ bóng (cho Android)
    shadowColor: 'black', // Màu của đổ bóng (cho iOS)
    shadowOffset: { width: 0, height: 2 }, // Độ dài và độ rộng của đổ bóng (cho iOS)
    shadowOpacity: 0.2, // Độ trong suốt của đổ bóng (cho iOS)
    shadowRadius: 2,
  },
  item: {
    backgroundColor:'white',
    flex:1,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal:5,
    borderRadius: 10,
    borderWidth:.5,
    flexDirection:'row',
  },
  view:{
    flex:1,
    flexDirection:'row',
  },
  viewText:{
    flex:1,
    flexDirection:'column',
  },
  image: {
    margin:ms(5),
    height: vs(120),
    width: hs(120),
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
  imgFavourite: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginBottom: 6,
  },
  text: {
    marginTop:10,
    color: '#000000', // Màu văn bản
    fontSize: 17,
    fontFamily: 'LibreBaskerville-DpdE',
    width: hs(180),
  },
  textPrice: {
    marginTop:5,
    color: '#FF0000', // Màu văn bản
    fontSize: 16,
    fontFamily: 'LibreBaskerville-DpdE',
  },
  buttomMinus:{
    width: hs(25),
    height :vs(30),
    padding: 5,
    alignItems:'center',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  buttomAdd:{
    width: hs(25),
    height :vs(30),
    padding: 5,
    alignItems:'center',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  viewCount:{
    flexDirection: "row",
    marginTop:10,
    height: 35,
  },
  imageCount:{
    height:vs(10),
    width:hs(10),
  },
  textInputQuanity:{
    padding:ms(0),
    width: hs(50),
    height :vs(30),
    borderWidth:1,
    color: 'red',
    fontSize:16,
    textAlign: "center"
  }
  });
  