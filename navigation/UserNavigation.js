import React from 'react';
import {View, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
//import {createAppContainer} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';

import Profile from '../screens/Profile';
import ChangeProfile from '../screens/ChangeProfile';
import ChangePassword from '../screens/ChangePassword';

const UserNavigation = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        //header: null
        headerTitle: (
          <View style={{flex:1, alignItems:'center'}}>
            <Image
              source={require("../assets/images/logo.png")}
              style={{height:35}}
              resizeMode={"contain"}
            />
          </View>
        )
      }
    },
    ChangeProfile: {
      screen: ChangeProfile,
      navigationOptions: ({navigation}) => ({
        title: "회원정보 변경",
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
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: ({navigation}) => ({
        title: "비밀번호 변경",
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

export default UserNavigation;
