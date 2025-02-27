import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './Splash';
import TabNavigator from './TabNavigator';
import Profile from './Profile';
import EditProfile from './EditProfile';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Back" component={TabNavigator} />
      <Stack.Screen name="Profile" component={Profile} options={{headerShown:true}}/>
      <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:true}}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;
