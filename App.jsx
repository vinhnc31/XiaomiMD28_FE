import {ToastHandlingProvider} from '@src/hooks/useToast/toast-handling';
import RootComponent from '@src/navigations';
import store from '@src/stores';
import {DimensionUtils} from '@src/utils/DimensionUtils';
import {Toast, toastConfig} from '@src/utils/toast';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
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
