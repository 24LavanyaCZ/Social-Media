import {Platform, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from './Screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Search from './Screens/Search';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './Screens/Profile';
import Icon from 'react-native-vector-icons/FontAwesome';



const App = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const TabNavigator = () => (
    <Tab.Navigator>
      <Tab.Screen
       name="Home"
       component={Home}
       options={{headerShown: false,
       tabBarIcon:()=>(
        <Icon name="home" size={20}/>
       )
       }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{headerShown: false,
          tabBarIcon:()=>(
            <Icon name="search" size={20}/>
           )
        }}
        
      />
    </Tab.Navigator>
  );

  return (
      <SafeAreaView style={styles.container}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
              <Stack.Screen
                name="Back"
                component={TabNavigator}
              />
              <Stack.Screen name="Profile" component={Profile} options={{headerShown: true}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
