import {ms, vs,hs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  flatListContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  item: {
    backgroundColor:'white',
    margin: 10,
    borderRadius: 10,
    borderWidth:.5,
    flexDirection:'row',
    elevation:3,
  },view:{
    flexDirection:'row',
  },
  viewText:{
    justifyContent:'space-around',
    flex:1,
    flexDirection:'column',
  }, image: {
    margin:ms(8),
    height: vs(100),
    width: hs(100),
  },
  text: {
    color: '#000000', // Màu văn bản
    fontSize: 20,
    fontFamily: 'LibreBaskerville-Bold',
    width: hs(200),
  },
  textPrice: {
    marginRight:10,
    color: '#6D6D6D', // Màu văn bản
    fontSize: 18,
    fontFamily: 'LibreBaskerville-DpdE',
  },
  textColor:{
    color:'#6D6D6D',
    fontSize:18,
    fontFamily:'LibreBaskerville-DpdE'
  },
  viewItem:{
    backgroundColor:'white',
    flexDirection:'column',
  },
  viewNote:{
    borderTopWidth:1,
    borderBottomWidth:1,
    paddingVertical:10,
    borderColor:'#6D6D6D'
  },
  textNote:{
    fontSize:18,
    fontFamily:'LibreBaskerville-DpdE',
    color:'black'
  },
  textInput:{
    width: hs(200),
    fontFamily:'LibreBaskerville-DpdE',
    color:'black',
    padding:0,
    fontSize:15,
    textAlign:'right'
  },
  viewSumPrice:{
    margin:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  textSumPrice:{
    color: '#FF0000',
    fontSize: 18,
    fontFamily: 'LibreBaskerville-DpdE',
  },
  viewVoucher:{
    justifyContent:'space-between',
    alignItems:'center',
    flex:1,
    flexDirection:'row',
    marginBottom:10,
    marginHorizontal:10
  },
  textVoucher:{
    marginTop:5,
    marginHorizontal:10,
    fontSize:15,
    fontFamily:'LibreBaskerville-DpdE',
    color:'black'
  },
  textVoucherSale:{
    width: 100,
    fontSize:15,
    fontFamily:'LibreBaskerville-DpdE',
    color:'#F0761E'
  },
  textVoucherShip:{
    marginHorizontal:10,
    fontSize:15,
    fontFamily:'LibreBaskerville-DpdE',
    color:'#0032E4'
  },
  viewPaymentMethods:{
    flexDirection:'column',
    marginHorizontal:10,
  },
  dropdown: {
    marginVertical:10,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  textDetail:{
    fontSize:15,
    fontFamily:'LibreBaskerville-DpdE',
    color:'#6D6D6D'
  },
  textSumAllPrice:{
    fontSize:18,
    fontFamily:'LibreBaskerville-DpdE',
    color:'black',
  },
  });