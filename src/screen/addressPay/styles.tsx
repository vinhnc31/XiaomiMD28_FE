import {ms, vs,hs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
   
      item: {
        width: Dimensions.get("window").width-60,
        backgroundColor:'white',
        margin: 10,
        borderRadius: 10,
        borderWidth:.5,
        flexDirection:'row',
        justifyContent:'space-between',
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
      container: {
        marginHorizontal:10,
        paddingVertical: 15,
        paddingHorizontal:10,
        alignItems:'center',
        backgroundColor: 'white',
        borderRadius :10
      },
      textPhone:{
        fontSize: 16, fontFamily: 'LibreBaskerville-DpdE'
      },
      textName:{
        fontSize: 18, fontFamily: 'LibreBaskerville-Bold',
      },
      textAddress:{
        fontSize: 16, fontFamily: 'LibreBaskerville-Bold'
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      },
      modalContent: {
        width: hs(300),
        paddingHorizontal:20,
        paddingVertical:10,
        alignItems:'center',
        flexDirection:'column',
        backgroundColor: 'white',
        borderRadius: 10,

      },
      flatListContainer: {
        flex: 1,
        margin:10,
        flexDirection: 'column', 
      },
})