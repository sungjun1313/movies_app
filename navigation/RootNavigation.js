import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {MaterialIcons, Ionicons} from '@expo/vector-icons';

import MovieNavigation from './MovieNavigation';
import UserNavigation from './UserNavigation';
import InfoNavigation from './InfoNavigation';

const RootNavigation = createBottomTabNavigator(
  {
    Movie: {
      screen: MovieNavigation,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Ionicons
            name={focused ? "ios-tv" : "ios-film"}
            size={30}
            color={focused ? "#307dca" : "black"}
           />
        )
      }
    },
    User: {
      screen: UserNavigation,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <MaterialIcons
            name={focused ? "contacts" : "account-circle"}
            size={30}
            color={focused ? "#307dca" : "black"}
          />
        )
      }
    },
    AboutInfo: {
      screen: InfoNavigation,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Ionicons
            name={focused ? "ios-information-circle" : "ios-information-circle-outline"}
            size={30}
            color={focused ? "#307dca" : "black"}
          />
        )
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "#FBFBFB",
        height: 45
      }
    }
  }
);

export default createAppContainer(RootNavigation);
