import InternetError from '@src/containers/InternetError';
import Spinner from '@src/containers/Spinner';
import useToast from '@src/hooks/useToast';
import NavigationComponent from '@src/navigations/boot';
import {logOutAction} from '@src/stores/auth/auth.actions';
import {EventBus, EventBusName} from '@src/utils/event-bus';
import React, {useEffect, useRef} from 'react';
import {checkInternetConnection, offlineActionCreators} from 'react-native-offline';

import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import {Subscription} from 'rxjs';

const RootComponent = () => {
  const dispatch = useDispatch();
  const subscriptions = useRef<any>();
  const toast = useToast();

  useEffect(() => {
    const {connectionChange} = offlineActionCreators;
    checkInternetConnection()
      .then(isConnected => {
        if (isConnected) SplashScreen.hide();
        dispatch(connectionChange(isConnected));
      })
      .catch(() => dispatch(connectionChange(false)));

    registerEventBus();
    return () => {
      subscriptions.current?.unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    dispatch(logOutAction(true)).unwrap();
    toast.showError({
      messageText: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại',
    });
  };

  const handleForbidden = () => {
    toast.showError({messageText: 'Bạn không có quyền sử dụng tính năng này!'});
  };

  function registerEventBus(): void {
    subscriptions.current = new Subscription();
    subscriptions.current.add(
      EventBus.getInstance().events.subscribe((data: any) => {
        switch (data.type) {
          case EventBusName.INVALID_TOKEN:
            handleLogout();
            break;
          case EventBusName.FORBIDDEN:
            handleForbidden();
            break;

          default:
            break;
        }
      }),
    );
  }

  return (
    <>
      <NavigationComponent />
      <InternetError />
      <Spinner />
    </>
  );
};

export default React.memo(RootComponent);
