import {Colors} from '@src/styles/colors';
import {hs, ms, vs} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: vs(24),
    paddingHorizontal: hs(40),
  },
  avatar: {
    width: hs(100),
    height: vs(100),
    borderRadius: ms(50),
  },
  name: {
    fontSize: ms(25),
    fontFamily: 'LibreBaskerville-Italic',
  },
  itemMenu: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: hs(13),
    paddingVertical: vs(20),
  },
  menuName: {
    fontSize: ms(20),
    fontFamily: 'LibreBaskerville-Italic',
  },
  btnLogout: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: Colors.red,
    paddingHorizontal: hs(19),
    paddingVertical: vs(13),
    borderRadius: ms(19),
    alignItems: 'center',
    columnGap: hs(12),
  },
  textLogout: {
    color: Colors.white,
    fontSize: ms(20),
    fontFamily: 'LibreBaskerville',
  },
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
});
