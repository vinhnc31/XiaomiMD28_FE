import {Dimensions, Platform, StatusBar} from 'react-native';

const STATUSBAR_DEFAULT_HEIGHT = 20;
const STATUSBAR_X_HEIGHT = 44;
const STATUSBAR_IP12_HEIGHT = 47;
const STATUSBAR_IP12MAX_HEIGHT = 47;
const STATUSBAR_IP14PRO_HEIGHT = 49;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const IP12_WIDTH = 390;
const IP12_HEIGHT = 844;

const IP12MAX_WIDTH = 428;
const IP12MAX_HEIGHT = 926;

const IP14PRO_WIDTH = 393;
const IP14PRO_HEIGHT = 852;

const IP14PROMAX_WIDTH = 430;
const IP14PROMAX_HEIGHT = 932;

export class DimensionUtils {
  static getStatusBarHeight(skipAndroid = true): number {
    const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window');

    let statusBarHeight = STATUSBAR_DEFAULT_HEIGHT;
    // let isIPhoneX_v = false;
    // let isIPhoneXMax_v = false;
    // let isIPhone12_v = false;
    // let isIPhone12Max_v = false;
    // let isIPhoneWithMonobrow_v = false;
    // let isIPhoneWithDynamicIsland_v = false;

    if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV) {
      if (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) {
        // isIPhoneWithMonobrow_v = true;
        // isIPhoneX_v = true;
        statusBarHeight = STATUSBAR_X_HEIGHT;
      } else if (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT) {
        // isIPhoneWithMonobrow_v = true;
        // isIPhoneXMax_v = true;
        statusBarHeight = STATUSBAR_X_HEIGHT;
      } else if (W_WIDTH === IP12_WIDTH && W_HEIGHT === IP12_HEIGHT) {
        // isIPhoneWithMonobrow_v = true;
        // isIPhone12_v = true;
        statusBarHeight = STATUSBAR_IP12_HEIGHT;
      } else if (W_WIDTH === IP12MAX_WIDTH && W_HEIGHT === IP12MAX_HEIGHT) {
        // isIPhoneWithMonobrow_v = true;
        // isIPhone12Max_v = true;
        statusBarHeight = STATUSBAR_IP12MAX_HEIGHT;
      } else if (W_WIDTH === IP14PROMAX_WIDTH && W_HEIGHT === IP14PROMAX_HEIGHT) {
        // isIPhoneWithDynamicIsland_v = true;
        statusBarHeight = STATUSBAR_IP14PRO_HEIGHT;
      } else if (W_WIDTH === IP14PRO_WIDTH && W_HEIGHT === IP14PRO_HEIGHT) {
        // isIPhoneWithDynamicIsland_v = true;
        statusBarHeight = STATUSBAR_IP14PRO_HEIGHT;
      }
    }

    return Platform.select({
      ios: statusBarHeight,
      android: skipAndroid ? 0 : StatusBar.currentHeight,
      default: 0,
    });
  }

  static getScreenWidth(): number {
    return Dimensions.get('window').width;
  }

  static getScreenHeight(): number {
    return Dimensions.get('window').height;
  }

  static ifIphoneX(iPhoneXHeight: number, iPhoneNormalHeight: number): number {
    if (this.isIphoneX()) {
      return iPhoneXHeight;
    }
    return iPhoneNormalHeight;
  }

  static isIphoneX(): boolean {
    const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTV &&
      ((W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT) ||
        (W_WIDTH === IP12_WIDTH && W_HEIGHT === IP12_HEIGHT) ||
        (W_WIDTH === IP12MAX_WIDTH && W_HEIGHT === IP12MAX_HEIGHT) ||
        (W_WIDTH === IP14PROMAX_WIDTH && W_HEIGHT === IP14PROMAX_HEIGHT) ||
        (W_WIDTH === IP14PRO_WIDTH && W_HEIGHT === IP14PRO_HEIGHT))
    );
  }

  static getBottomSpace(): number {
    return this.isIphoneX() ? 34 : 0;
  }
}
