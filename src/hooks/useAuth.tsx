import AccountService from '@src/services/account';
import {useAppDispatch, useAppSelector} from '@src/stores';
import {logInAction} from '@src/stores/auth/auth.actions';
import {useCallback} from 'react';
import useToast from './useToast';
import { resetStack } from '@src/navigations/services';
import { APP_NAVIGATION } from '@src/navigations/routes';

export function useAuth() {
  const authState = useAppSelector(state => state.authSlice);
  const toast = useToast();
  const dispath = useAppDispatch();

  const fetchProfile = useCallback(async (redirect?: boolean) => {
    try {
      const sv = new AccountService();
      const user = await sv.fetchProfile();
      //@ts-ignore
      console.log('user: ', user.data);
      //@ts-ignore
      dispath(logInAction(user.data));
    
      resetStack(APP_NAVIGATION.ROOT);
      
      return true;
    } catch (error) {
      resetStack(APP_NAVIGATION.ROOT);
      toast.showThowError(error);
      return false;
    }
  }, []);

  return {user: authState?.account, fetchProfile};
}
