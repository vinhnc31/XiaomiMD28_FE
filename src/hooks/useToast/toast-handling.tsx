import {ToastType} from '@src/utils/toast/types';
import React, {useCallback} from 'react';
import Toast from 'react-native-toast-message';
import {ToastContext} from '.';
import {IToastPayload} from './';

const Component = (props: {children: any}) => {
  const showError = (payload: IToastPayload) => {
    Toast.show({
      type: ToastType.Error,
      text1: payload.title,
      text2: payload.message,
    });
  };

  const showThowError = (error: any) => {
    const message: string = error?.response?.data?.message || error.message;
    Toast.show({
      type: ToastType.Error,
      text1: 'Thông báo',
      text2: message,
    });
  };

  const showSuccess = (payload: IToastPayload) => {
    Toast.show({
      type: ToastType.Success,
      text1: 'Thông báo',
      text2: payload.messageText || '',
    });
  };

  const contextValue = {
    showError: useCallback((payload: IToastPayload) => showError(payload), []),
    showSuccess: useCallback((payload: IToastPayload) => showSuccess(payload), []),
    showThowError: useCallback((payload: any) => showThowError(payload), []),
  };

  return <ToastContext.Provider value={contextValue}>{props.children}</ToastContext.Provider>;
};

const ToastHandlingProvider = React.memo(Component);

export {ToastHandlingProvider};
