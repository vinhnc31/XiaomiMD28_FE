import {Colors} from '@src/styles/colors';
import {hs, ms} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  dateContainer: {
    flex: 1,
    marginBottom: ms(20),
  },
  container: {
    borderColor: Colors.backgroundImg,
    borderWidth: ms(1),
    borderRadius: hs(4),
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    height: hs(30),
    paddingHorizontal: hs(12),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    position: 'absolute',
    backgroundColor: Colors.white,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: ms(10),
    borderTopRightRadius: ms(10),
  },
  modalHeder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(15),
    paddingTop: ms(15),
  },
  btnCancel: {
    fontFamily: 'Roboto-Bold',
    color: Colors.black,
  },
  btnSelect: {
    fontFamily: 'Roboto-Bold',
    color: Colors.black,
  },
});

export default styles;
