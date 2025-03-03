import {Platform, Linking, Alert, PermissionsAndroid} from 'react-native';
import messaging, { AuthorizationStatus, getMessaging, getToken } from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { getApp } from '@react-native-firebase/app';

export async function requestUserPermission() {
  try {
    const settings = await notifee.requestPermission();

    if(settings.authorizationStatus>= AuthorizationStatus.AUTHORIZED){
      console.log('Permission settings:', settings);
    } else {
      console.log('User declined permissions:');
    }
  }
   catch (e) {
    console.log(e);
  }
}

export const createNotificationChannel = async () => {
  try {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      sound: 'default',
    });
  } catch (error) {
    console.log(error)
  }
}
export const requestFCMToken = async () => {
  try {
    const app = getApp()
    const messaging = getMessaging(app);
    await messaging.registerDeviceForRemoteMessages();
    const token = await getToken(messaging);
    console.log('FCM Token:', token);
  } catch (error) {
    console.error('Error fetching FCM token:', error);
  }
};


