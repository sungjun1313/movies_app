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
        title: "Change Profile",
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
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: ({navigation}) => ({
        title: "Change Password",
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

export default UserNavigation;
