import { useEffect } from 'react';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useNotificationPermission = () => {

  const checkNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      const permissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      handlePermissionStatusAndroid(permissionStatus);
    } else if (Platform.OS === 'ios') {
      // Replace the following line with your actual method for iOS notification permission.
      const hasPrompted = await AsyncStorage.getItem('notificationPrompted');
      if (!hasPrompted) {
        showAlert();
        // Set the prompted flag to true to avoid showing the alert again
        await AsyncStorage.setItem('notificationPrompted', 'true');
      }
    }
  };

  const handlePermissionStatusAndroid = async (status) => {
    if (status !== 'granted') {
      // Check if the user has already been prompted
      const hasPrompted = await AsyncStorage.getItem('notificationPrompted');
      if (!hasPrompted) {
        // Set the prompted flag to true to avoid showing the alert again
        await AsyncStorage.setItem('notificationPrompted', 'true');
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