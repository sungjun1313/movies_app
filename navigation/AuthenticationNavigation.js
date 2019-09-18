import React from 'react';
import {View, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';

import Login from '../screens/Login';
import Register from '../screens/Register';
import ResetPassword from '../screens/ResetPassword';

const AuthenticationNavigation = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: Register,
      navigationOptions: ({navigation}) => ({
        title: "Register",
        headerLeft: (
          <Ionicons
            name="md-arrow-round-back"
            size={30}
            color={"black"}
            onPress={() => navigation.goBack(null)}
            style={{paddingLeft:10}}
          />
        )
      })
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: ({navigation}) => ({
        title: "Reset Password",
        headerLeft: (
          <Ionicons
            name="md-arrow-round-back"
            size={30}
            color={"black"}
            onPress={() => navigation.goBack(null)}
            style={{paddingLeft:10}}
          />
        )
      })
    }
  },
  {
    mode: "modal",
    defaultNavigationOptions: {
      headerStyle: {
        height: 40,
      }
    }
  }
);

export default createAppContainer(AuthenticationNavigation);
