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
    backgroundColor: 'white',
    margin: 5,
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
    width: hs(200),
  },
  textStatus: {
    fontSize: 15,
    fontFamily: 'LibreBaskerville-DpdE',
    width: hs(200),
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
    justifyContent:'space-around',
    paddingHorizontal:10,
    flexDirection: 'column',
    paddingVertical:5
  },
  buttonText: {
    margin: 10,
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
  buttonCancer:{backgroundColor:'#FF6900',width: 80,height: 40,}
});
