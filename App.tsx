import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './Screens/AppNavigator';
import {PostProvider} from './Context/PostsContext';
import {CommentProvider} from './Context/CommentsContext';
import {UserProvider} from './Context/UserContext';
import {getMessaging} from '@react-native-firebase/messaging';
import {
  createNotificationChannel,
  // onDisplayNotification,
  requestFCMToken,
  requestUserPermission,
} from './Services/Notifications';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {getApp} from '@react-native-firebase/app';

const App = () => {
  const app = getApp();
  const messaging = getMessaging(app);

  useEffect(() => {
    requestFCMToken();
    requestUserPermission();
    createNotificationChannel();

    // Foreground notification listener
    const unsubscribe = messaging.onMessage(async remoteMessage => {
      console.log(remoteMessage);
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'Default Title',
        body: remoteMessage.notification?.body || 'Default Body',
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher',
          pressAction: {id: 'default'},
        },
      });
    });

    messaging.setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'New Notification',
        body: remoteMessage.notification?.body || 'New Body',
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher',
          pressAction: {id: 'default'},
        },
      });
    });
    const unsubscribeOnBackground = notifee.onBackgroundEvent(
      async ({type, detail}) => {
        if (type === EventType.PRESS) {
          console.log('User pressed notification', detail.notification);
        }
      },
    );

    return () => {
      unsubscribe();
      unsubscribeOnBackground();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <PostProvider>
            <CommentProvider>
              <UserProvider>
                <AppNavigator />
              </UserProvider>
            </CommentProvider>
          </PostProvider>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
function unsubscribeOnBackground() {
  throw new Error('Function not implemented.');
}
