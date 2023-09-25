import {createAsyncThunk} from '@reduxjs/toolkit';
import AccoutnService from '@src/services/account';
import {IAccount} from '@src/services/account/account.model';
import OneSignal from 'react-native-onesignal';

export const logInAction = createAsyncThunk('auth/logIn', async (loginData: IAccount, thunkAPI) => {
  return loginData;
});

export const logOutAction = createAsyncThunk('auth/logOut', async (noApi: boolean, thunkAPI) => {
  console.log('noApi: ', noApi);
  try {
    if (!noApi) {
      const sv = new AccoutnService();
      OneSignal.deleteTags(['app', 'userId']);
      await sv.logOut();
    }
    return true;
  } catch (err) {
    // return thunkAPI.rejectWithValue(err.response.data);
    return true;
  }
});
