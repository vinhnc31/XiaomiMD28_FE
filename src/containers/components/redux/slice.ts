import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommonState} from './state';

export const initialCommonState: CommonState = {
  isLoading: false,
  hiddenOnBoard: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState: initialCommonState,
  reducers: {
    isLoading: (state: CommonState, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    }),

    hiddenOnBoard: (state: CommonState, action: PayloadAction<boolean>) => ({
      ...state,
      hiddenOnBoard: action.payload,
    }),
  },
});

export const {isLoading, hiddenOnBoard} = commonSlice.actions;

export default commonSlice.reducer;
