import {API_URL} from '@src/contants/config';
import R from '@src/res';
import {ImageSourcePropType} from 'react-native';

export const convertImage = (path?: string, defaultImage: ImageSourcePropType = R.images.avataEmpty) => {
  if (!path) {
    return defaultImage;
  }

  return {uri: API_URL + path};
};

export const substring = (str = '', char = '.', isLast = true) => {
  return str.substring(isLast ? str.lastIndexOf(char) + 1 : str.indexOf(char) + 1);
};

export const convertUploadFile = (file: any) => {
  const uri = file.path || file.sourceURL || file.uri;
  let name = file.filename || file.name || substring(uri, '/');
  const type = file.mime || file.type;

  // if (!name.includes('.') && type === 'audio/mpeg') {
  //   name = `${name}.mp3`;
  // }

  return {
    uri,
    name,
    type,
  };
};

export const convertMoney = (money?: number) => {
  if (!money) return 0;
  return Intl.NumberFormat('vi-VN').format(money);
};
