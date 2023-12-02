import {ms, vs, hs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  viewText: {
    flex: 1,
    justifyContent: 'center',
  },
  styleText: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  item: {
    paddingVertical:10,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    flexDirection: 'row',
  },
  view: {
    flexDirection: 'row',
  },
  image: {
    margin: ms(8),
    height: vs(80),
    width: hs(80),
  },
  text: {
    fontSize: 15,
    fontFamily: 'LibreBaskerville-DpdE',
  },
  textStatus: {
    marginHorizontal:15,
    marginTop:5,
    alignSelf:'flex-end',
    fontSize: 15,
    fontFamily: 'LibreBaskerville-DpdE',
    color:'#FF0000'
  },
  textPrice: {
    marginRight: 10,
    color: '#6D6D6D', // Màu văn bản
    fontSize: 18,
    fontFamily: 'LibreBaskerville-DpdE',
  },
  textColor: {
    color: '#6D6D6D',
    fontSize: 18,
    fontFamily: 'LibreBaskerville-DpdE',
  },
  viewItem: {
    width:Dimensions.get("window").width,
    justifyContent:'space-around',
    paddingHorizontal:10,
    flexDirection: 'column',
  },
  buttonText: {
    margin: vs(10),
    width: hs(350),
  },
  flatListContainer: {
    flex: 1,
    margin:10,
    flexDirection: 'column', 
  },
  viewTextTotal:{
    flexDirection:'row',marginHorizontal:15,marginVertical:10,justifyContent:'space-between'
  },
  textQuantity:{color:'#6D6D6D',fontSize:16},
  buttonCancer:{backgroundColor:'#FF6900',width: 80,height: 40,},
  modalWrap: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  modalInner: {
    backgroundColor: Colors.white,
    borderRadius: ms(20),
    paddingHorizontal: hs(10),
    paddingVertical: vs(20),
    marginHorizontal: hs(20),
    alignItems: 'center',
    rowGap: vs(16),
    justifyContent: 'center',
  },
  menuName: {
    fontSize: ms(18),
    fontFamily: 'LibreBaskerville-DpdE',
  },
});
