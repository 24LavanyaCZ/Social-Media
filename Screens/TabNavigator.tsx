import React, { use, useEffect } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Search from './Search';
import Icon from 'react-native-vector-icons/FontAwesome';
import Account from './Account';
import { useNavigation } from '@react-navigation/native';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();
  // useEffect(() => {
//   const unsubscribeOnBackground = notifee.onBackgroundEvent(
//     async ({type, detail}) => {
//       console.log(detail.notification)
//       if (type === EventType.PRESS) {
//         navigation.navigate('Home');
//       }
//     },
//   );

//   return () => {
//     unsubscribeOnBackground();
//   };
// }, [navigation]);
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
