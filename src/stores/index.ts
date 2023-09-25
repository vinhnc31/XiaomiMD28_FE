import {configureStore} from '@reduxjs/toolkit';
import {MMKV} from 'react-native-mmkv';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AnyAction, Middleware} from 'redux';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, Storage} from 'redux-persist';
import thunk from 'redux-thunk';
import allReducers from './rootReducers';

const storage = new MMKV();
const reduxStorage: Storage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

/** add middlewares */
const middlewares: Middleware[] = [];

// middleware redux-thunk
middlewares.push(thunk);

const rootReducer = (state: ReturnType<typeof allReducers> | undefined, action: AnyAction) => {
  if (action.type === 'auth/signOut') return allReducers(undefined, {type: undefined});
  return allReducers(state, action);
};

/** config redux-persist */
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['authState'],
  blacklist: [''],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

/** create redux store */
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

const persistor = persistStore(store);

export default {store, persistor};

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
