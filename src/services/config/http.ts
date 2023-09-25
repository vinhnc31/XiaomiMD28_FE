import {API_URL} from '@src/contants/config';
import {EventBus, EventBusName} from '@src/utils/event-bus';
import {StorageKey, StorageUtils} from '@src/utils/mmkv';
import Axios, {AxiosResponse} from 'axios';
import endpoint from './endpoint';

const REQ_TIMEOUT = 30 * 1000;

const http = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    apptype: 'CUSTOMER',
    lang: 'vi',
  },
  timeout: REQ_TIMEOUT,
  withCredentials: true,
});

/**
 * intercepts any response and checks the response from our api for a 401 status in the response. ie. the token has now expired and is no longer valid, or no valid token was sent.
 * If such a status exists then we log out the user and clear the profile from redux state.
 */
http.interceptors.request.use((config: any) => requestHandler(config));

const requestHandler = (request: any) => {
  // if (__DEV__) {
  //   console.log(`Request API: ${request.method?.toUpperCase()} - ${request.url}`, request.params, request.data);
  // }
  const accessToken = StorageUtils.get(StorageKey.AccessToken);
  const refreshToken = StorageUtils.get(StorageKey.RefressToken);

  if (accessToken) {
    console.log('token', accessToken);
    request.headers.authorization = `Bearer ${accessToken}`;
  }

  if (refreshToken) {
    request.headers.refreshtoken = `Bearer ${refreshToken}`;
  }

  request.headers.lang = 'vi';

  if (request?.data?._parts) {
    delete request.headers['Content-Type'];
    delete request.headers.Accept;

    request.headers['content-type'] = 'multipart/form-data';
    request.headers.accept = 'application/json';
  }

  return request;
};

http.interceptors.response.use(
  (response: AxiosResponse) => successHandler(response),
  (error: any) => errorHandler(error),
);

const errorHandler = async (error: any) => {
  const isInvalidToken = error?.response?.data?.statusCode === 401;
  // const isForbidden = error?.response?.data?.statusCode === 403;
  const methodNotAllow = error?.response?.data?.statusCode === 405;
  const originalRequest = error.config;

  if (isInvalidToken || !originalRequest || (methodNotAllow && originalRequest?.url !== endpoint.auth.logout)) {
    EventBus.getInstance().post({
      type: EventBusName.INVALID_TOKEN,
    });
  }

  // if (isForbidden) {
  //   EventBus.getInstance().post({
  //     type: EventBusName.FORBIDDEN,
  //   });
  // }

  // if (isInvalidToken && !originalRequest._retry) {
  //   // call api refresh token
  //   originalRequest._retry = true;
  //   const refreshRes: any = await http.get(endpoint.auth.refreshToken);
  //   // {accessToken: string; refreshToken: string}

  //   if (refreshRes?.data) {
  //     StorageUtils.save(StorageKey.AccessToken, refreshRes.data.accessToken);
  //     StorageUtils.save(StorageKey.RefressToken, refreshRes.data.refreshToken);

  //     originalRequest.headers['Authorization'] = 'Bearer ' + refreshRes.data.accessToken;
  //     originalRequest.headers['refreshtoken'] = 'Bearer ' + refreshRes.data.refreshToken;
  //     return http(originalRequest);
  //   }
  // }
  if (__DEV__) {
    console.log('API Error:', error?.response?.data);
  }
  return Promise.reject(error);
};

const successHandler = (response: AxiosResponse) => {
  // if (__DEV__) {
  //   console.log(`Response API: ${response.config.url}`, response.data);
  // }

  return response;
};

export default http;
