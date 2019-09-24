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
        title: "회원가입",
        headerLeft: (
          <Ionicons
            name="md-arrow-round-back"
            size={30}
            color={"#ffffff"}
            onPress={() => navigation.goBack(null)}
            style={{paddingLeft:10}}
          />
        ),
        headerStyle: {
          backgroundColor: "#4e65b4",
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
      })
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: ({navigation}) => ({
        title: "비밀번호 초기화",
        headerLeft: (
          <Ionicons
            name="md-arrow-round-back"
            size={30}
            color={"#ffffff"}
            onPress={() => navigation.goBack(null)}
            style={{paddingLeft:10}}
          />
        ),
        headerStyle: {
          backgroundColor: "#4e65b4",
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
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
