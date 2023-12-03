import {Colors} from '@src/styles/colors';
import {hs, ms, vs} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  wrap: {
    flex: 1,
  },

  header: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoImg: {
    width: hs(120),
    height: vs(120),
    resizeMode: 'contain',
  },

  body: {
    flex: 6,
    paddingHorizontal: hs(10),
    paddingBottom: vs(10),
  },

  bodyInner: {
    paddingVertical:20,
    backgroundColor: Colors.white,
    borderRadius: ms(40),
    paddingHorizontal: hs(33),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: 'center',
    borderBottomColor: 'transparent',
  },

  button: {
    height: vs(48),
    backgroundColor: Colors.primary,
    borderRadius: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(10),
    flexDirection: 'row',
  },

  buttonText: {
    color: '#fff',
    fontSize: ms(20),
    fontFamily: 'Lato-Bold',
  },

  bodyFooter: {
    marginTop: vs(20),
    flexDirection: 'row',
    justifyContent: 'center',
  },

  notAccount: {
    marginRight: hs(4),
    fontSize: ms(16),
    fontFamily: 'Lato-Bold',
  },

  textSignUp: {
    fontSize: ms(16),
    fontFamily: 'Lato-Bold',
    color: Colors.primary,
  },

  conditionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iAgree: {
    fontSize: ms(13),
    color: Colors.black,
    fontFamily: 'Lato-Bold',
  },
  conditions: {
    fontSize: ms(13),
    fontFamily: 'Lato-Bold',
    color: Colors.primary,
    textDecorationLine: 'underline',
    textDecorationColor: Colors.primary,
  },
  forgotPass: {
    color: Colors.gray,
    fontSize: ms(16),
    fontFamily: 'Lato-Bold',
  },
});
