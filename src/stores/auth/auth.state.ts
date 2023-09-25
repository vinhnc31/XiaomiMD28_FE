import {AuthStatus, IAccount} from '@src/services/account/account.model';

export interface AuthState {
  status: AuthStatus;
  isAuthenticated: boolean;
  account: IAccount | null;
}
