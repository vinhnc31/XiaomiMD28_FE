import {combineReducers} from '@reduxjs/toolkit';
import commonState from '@src/containers/redux/slice';
import {reducer as network} from 'react-native-offline';
import authSlice from './auth/auth.slice';

export default combineReducers({
  network,
  authSlice,
  commonState,
});
