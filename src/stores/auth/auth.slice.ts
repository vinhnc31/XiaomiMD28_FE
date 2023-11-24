import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {StorageKey, StorageUtils} from '@src/utils/mmkv';
import {IAccount} from 'src/services/account/account.model';
import {logInAction, logOutAction} from './auth.actions';
import {AuthState} from './auth.state';

const initialState: AuthState = Object.freeze({
  isAuthenticated: false,
  status: 'idle',
  account: null,
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccount: (state, {payload}: PayloadAction<IAccount>) => ({
      ...state,
      account: payload,
    }),
  },
  extraReducers: builder => {
    /** Login action */
    builder
      .addCase(logInAction.pending, state => {
        state.status = 'pending';
      })
      .addCase(logInAction.fulfilled, (state, {payload}) => {
        state.isAuthenticated = true;
        state.status = 'resolved';
        state.account = payload;

        payload?.token && StorageUtils.save(StorageKey.AccessToken, payload?.token);
        payload?.refreshToken && StorageUtils.save(StorageKey.RefressToken, payload?.refreshToken);
        StorageUtils.saveObject(StorageKey.User, payload);
      })
      .addCase(logInAction.rejected, (state, {error}) => {
        state.isAuthenticated = false;
        state.status = 'rejected';
        state.account = null;
      });

    /** logOutAction action */
    builder
      .addCase(logOutAction.pending, state => {
        state.status = 'pending';
      })
      .addCase(logOutAction.fulfilled, state => {
        state.isAuthenticated = false;
        state.status = 'resolved';
        state.account = null;

        StorageUtils.clearAccount();
      })
      .addCase(logOutAction.rejected, state => {
        state.isAuthenticated = false;
        state.status = 'rejected';
        state.account = null;

        StorageUtils.clearAccount();
      });
  },
});

export const {setAccount} = authSlice.actions;

export default authSlice.reducer;
