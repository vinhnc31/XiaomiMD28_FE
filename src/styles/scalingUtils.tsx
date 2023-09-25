import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/** width, marginLeft, marginRight, marginHorizontal, paddingLeft,
 *  paddingRight, paddingHorizontal, likewise...
 */
const hs = (size: number) => (width / guidelineBaseWidth) * size;

/** height, marginTop, marginBottom, marginVertical, line-height, paddingTop,
 *  paddingBottom, paddingVertical, likewise...
 */
const vs = (size: number) => (height / guidelineBaseHeight) * size;

/** font-size, bordeRadius, likewise...
 */
const ms = (size: number, factor = 0.5) => size + (hs(size) - size) * factor;

export {hs, vs, ms, width};
