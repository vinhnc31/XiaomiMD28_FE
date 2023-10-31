import {ms, vs} from '@src/styles/scalingUtils';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
      },
      icon: {
        width: 30,
        height: 30,
      },
      title: {
        fontSize: 22,
        fontFamily: 'LibreBaskerville-Bold',
        color: 'black',
        marginLeft: 20
      },
});
