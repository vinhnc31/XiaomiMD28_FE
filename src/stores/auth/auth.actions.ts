import {createAsyncThunk} from '@reduxjs/toolkit';
import AccoutnService from '@src/services/account';
import {IAccount} from '@src/services/account/account.model';

export const logInAction = createAsyncThunk('auth/logIn', async (loginData: IAccount, thunkAPI) => {
  return loginData;
});

export const logOutAction = createAsyncThunk('auth/logOut', async (noApi: boolean, thunkAPI) => {
  console.log('noApi: ', noApi);
  try {
    if (!noApi) {
      const sv = new AccoutnService();
      await sv.logOut();
    }
    return true;
  } catch (err) {
    // return thunkAPI.rejectWithValue(err.response.data);
    return true;
  }
});
