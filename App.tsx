import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './Screens/AppNavigator';
import {PostProvider} from './Context/PostsContext';
import {CommentProvider} from './Context/CommentsContext';
import {UserProvider} from './Context/UserContext';

const App = () => {
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
