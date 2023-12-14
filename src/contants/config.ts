import Config from 'react-native-config';
console.log('Config: ', Config);

// export const API_URL = 'http://192.168.0.179:3000'; // ae làm tự đổi địa chỉ ip nhé
export const API_URL = 'http://54.206.98.206:3000'; // ae làm tự đổi địa chỉ ip nhé
console.log('API_URL: ', API_URL);

export const RESPONSE_STATUS = {
  SUCESS: 200,
  NOT_FOUND: 404,
  INTERVAL_SERVER: 500,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
};

export const INVALID_TOKEN = 'INVALID_TOKEN';

export enum NotificationType {}

export const defaultPageSize = 10;
