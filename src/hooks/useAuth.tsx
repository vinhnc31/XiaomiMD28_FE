import AccountService from '@src/services/account';
import {useAppDispatch, useAppSelector} from '@src/stores';
import {logInAction} from '@src/stores/auth/auth.actions';
import {useCallback} from 'react';
import useToast from './useToast';

export function useAuth() {
  const authState = useAppSelector(state => state.authSlice);
  const toast = useToast();
  const dispath = useAppDispatch();

  const fetchProfile = useCallback(async (redirect?: boolean) => {
    try {
      const sv = new AccountService();
      const user = await sv.fetchProfile();
      console.log('user: ', user);
      dispath(logInAction(user));
      // if (redirect) {
      //   resetStack(APP_NAVIGATION.ROOT);
      // }
      return true;
    } catch (error) {
      toast.showThowError(error);
      return false;
    }
  }, []);

  return {user: authState?.account, fetchProfile};
}
