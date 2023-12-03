import {ToastHandlingProvider} from '@src/hooks/useToast/toast-handling';
import store from '@src/stores';
import {DimensionUtils} from '@src/utils/DimensionUtils';
import {Toast, toastConfig} from '@src/utils/toast';
import React, { useEffect } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootComponent from '@src/navigations/index';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// 1023021056607-c254lknv34hjen50d9bmigbv3o3fbsbm.apps.googleusercontent.com
// android 1023021056607-7e6a12jql7ttt0m6rrop702bn05bfppt.apps.googleusercontent.com

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
     webClientId:'1023021056607-8ipdiimvi5c8rl7v8qbk4dhdimb2g80n.apps.googleusercontent.com'
    });
  },[])
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <SafeAreaProvider>
          <ToastHandlingProvider>
            <RootComponent />
          </ToastHandlingProvider>
        </SafeAreaProvider>
      </PersistGate>

      <Toast config={toastConfig} topOffset={DimensionUtils.getStatusBarHeight()} />
    </Provider>
  );
};

export default App;
