import InternetError from '@src/containers/components/InternetError';
import Spinner from '@src/containers/components/Spinner';
import {GlobalVariables} from '@src/contants/global';
import useOneSignal from '@src/hooks/useOneSignal';
import useSocket from '@src/hooks/useSocket';
import useToast from '@src/hooks/useToast';
import NavigationComponent from '@src/navigations/boot';
import {logOutAction} from '@src/stores/auth/auth.actions';
import {EventBus, EventBusName} from '@src/utils/event-bus';
import {SOCKET_EVENTS} from '@src/utils/socket';

import React, {useEffect, useRef} from 'react';
import DeviceInfo from 'react-native-device-info';
import {checkInternetConnection, offlineActionCreators} from 'react-native-offline';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import {Subscription} from 'rxjs';

const RootComponent = () => {
  const dispatch = useDispatch();
  const subscriptions = useRef<any>();
  const {socket} = useSocket();
  const toast = useToast();
  // useLocation();

  useOneSignal();

  useEffect(() => {
    const {connectionChange} = offlineActionCreators;
    checkInternetConnection()
      .then(isConnected => {
        if (isConnected) SplashScreen.hide();
        dispatch(connectionChange(isConnected));
      })
      .catch(() => dispatch(connectionChange(false)));

    DeviceInfo.getUniqueId().then(uniqueId => {
      console.log('deviceId uniqueId: ', uniqueId);
      GlobalVariables.deviceId = uniqueId;
    });

    registerEventBus();
    return () => {
      subscriptions.current?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect_error', (error: {message: any}) => {
        console.log('connect_error: ', error, error.message);
      });

      socket.on('connect', () => {
        console.log('connect');
        EventBus.getInstance().post({
          type: EventBusName.RECONNECT_SOCKET,
        });
        // socket.emit(SOCKET_EVENTS.JOIN_TRACKING_LOCATION); // vào phòng nhận thông báo cập nhật vị trí
      });

      socket.on('reconnect', attempt => {
        console.log('attempt: ', attempt);
        EventBus.getInstance().post({
          type: EventBusName.RECONNECT_SOCKET,
        });
      });

      socket.on('disconnect', () => {
        console.log('disconnect');
      });
      // socket.on(SOCKET_EVENTS.TRACKING_LOCATION, (payload: any) => {
      //   console.log('TRACKING_LOCATION payload: ', payload);
      //   if (location) {
      //     const payload: ILocationPayload = {
      //       lat: location.latitude,
      //       lng: location.longitude,
      //     };
      //     console.log('payload', payload);

      //     socket.emit(SOCKET_EVENTS.TRACKING_LOCATION, payload);
      //   }
      // });
      // socket.on(SOCKET_EVENTS.TRACKING_ROUTE, (payload: any) => {
      //   console.log('TRACKING_ROUTE payload: ', payload);
      //   if (location) {
      //     try {
      //       const storage = new MMKV();
      //       const bookingId = storage.getNumber(ASYNC_STORE.BOOKING_ID);

      //       const locationPayload: any = {
      //         lat: location.latitude,
      //         lng: location.longitude,
      //         bookingId: bookingId,
      //       };
      //       socket.emit(SOCKET_EVENTS.TRACKING_ROUTE, locationPayload);
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   }
      // });

      socket.on(SOCKET_EVENTS.DRIVER_LOCATION, (payload: any) => {
        console.log('DRIVER_LOCATION payload: ', payload);
        GlobalVariables.driverLocation = {
          latitude: payload.lat,
          longtitude: payload.lng,
        };
        EventBus.getInstance().post({
          type: EventBusName.REFRESH_DRIVER_LOCATION,
          payload: {
            bookingId: payload.bookingId,
            location: {
              latitude: payload.lat,
              longtitude: payload.lng,
            },
          },
        });
      });
    }
  }, [socket]);

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
