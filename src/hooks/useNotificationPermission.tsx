import { useEffect } from 'react';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';

const useNotificationPermission = () => {
  const requestNotificationPermissionAndroid = async () => {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting notification permission on Android:', error);
      return false;
    }
  };

  const checkNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await requestNotificationPermissionAndroid();
      if (!granted) {
        showAlert();
      }
    } else if (Platform.OS === 'ios') {
      // You should replace the following line with the actual method you use for iOS notification permission.
      // For simplicity, I'm assuming the method always returns 'granted'.
      const status = 'granted';
      if (status !== 'granted') {
        showAlert();
      }
    }
  };

  const showAlert = () => {
    Alert.alert(
      'Permission Required',
      'Please enable notifications to receive updates.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Settings',
          onPress: () => {
            // Open app settings
            Linking.openSettings();
          },
        },
      ],
    );
  };

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  return null; // You might return something else based on your needs
};

export default useNotificationPermission;