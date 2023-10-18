import Config from 'react-native-config';
console.log('Config: ', Config);

export const API_URL = Config.API_URL;

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
