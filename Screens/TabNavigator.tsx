import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Search from './Search';
import Icon from 'react-native-vector-icons/FontAwesome';
import Account from './Account';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="home" size={20} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="search" size={20} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="user" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
