import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        title: remoteMessage.data?.title || 'Default Title',
        body: remoteMessage.data?.body || 'Default Body',
        
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher',
          pressAction: {id: 'default'},
        },
      });
    });


    messaging.setBackgroundMessageHandler(async (remoteMessage) => {
      console.log(remoteMessage.data)
      if (remoteMessage.data) { 
        await notifee.displayNotification({
          title: remoteMessage.data?.title, 
          body: remoteMessage.data?.body,  
          image: remoteMessage.data?.image, 
          android: {
            channelId: 'default', // Your channel ID
            importance: AndroidImportance.HIGH, // or AndroidImportance.MAX
          },
        });
      }
    });
    const unsubscribeOnBackground = notifee.onBackgroundEvent(
      async ({type, detail}) => {
        console.log(detail.notification)
        if (type === EventType.PRESS) {
          navigation.navigate('Home');
        }
      },
    );

    return () => {
      unsubscribe();
      unsubscribeOnBackground();
    };
  }, []);

  messaging.setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);

    if (remoteMessage.data) {
        const notificationDisplayed = await AsyncStorage.getItem('newNotificationDisplayed');

        if (!notificationDisplayed) {
            await notifee.displayNotification({
                title: remoteMessage.notification?.title || 'NEW Title',
                body: remoteMessage.notification?.body || 'NEW Body',
                android: {
                    channelId: 'default',
                    importance: AndroidImportance.MAX,
                    smallIcon: 'ic_launcher',
                    pressAction: {id: 'default'},
                },
            });
            console.log(remoteMessage)
            await AsyncStorage.setItem('newNotificationDisplayed', 'true');
        } else {
            console.log('Notification already displayed, skipping.');
        }
    } else {
        console.log("Notification message received in background. Only data messages should be sent.");
    }
  });

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
