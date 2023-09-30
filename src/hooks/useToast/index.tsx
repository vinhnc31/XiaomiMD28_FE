import React, {useContext} from 'react';

export interface IToastPayload {
  title?: string;
  message?: string;
  messageText?: string;
}

interface IToastContext {
  showError: (payload: IToastPayload) => void;
  showSuccess: (payload: IToastPayload) => void;
  showThowError: (error: any) => void;
}

const useToast = () => {
  const {showError, showSuccess, showThowError} = useContext(ToastContext);
  return {showError, showSuccess, showThowError};
};

export const ToastContext = React.createContext<IToastContext>({
  showError: (payload: IToastPayload) => ({}),
  showThowError: (error: any) => ({}),
  showSuccess: (payload: IToastPayload) => ({}),
});

export default useToast;
