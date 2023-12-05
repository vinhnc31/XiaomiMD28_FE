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
import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
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
