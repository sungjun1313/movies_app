import React from 'react';
import {View, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {Ionicons} from '@expo/vector-icons';

import Info from '../screens/Info';
import PrivacyTerms from '../screens/PrivacyTerms';
import TermsOfUse from '../screens/TermsOfUse';

const InfoNavigation = createStackNavigator(
  {
    Info: {
      screen: Info,
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
    PrivacyTerms: {
      screen: PrivacyTerms,
      navigationOptions: ({navigation}) => ({
        title: "Privacy Terms",
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
    TermsOfUse: {
      screen: TermsOfUse,
      navigationOptions: ({navigation}) => ({
        title: "Terms Of Use",
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

export default InfoNavigation;
