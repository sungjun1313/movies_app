import React from 'react';
import {Image, View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {Ionicons} from '@expo/vector-icons';

import MovieList from '../screens/MovieList';
import MovieDetail from '../screens/MovieDetail';

const MovieNavigation = createStackNavigator(
  {
    MovieList: {
      screen: MovieList,
      navigationOptions: {
        //header: null
        /*
        headerTitle: (
          <View style={{flex:1, alignItems:'center'}}>
            <Image
              source={require("../assets/images/logo.png")}
              style={{height:35}}
              resizeMode={"contain"}
            />
          </View>
        )
        */
      }
    },
    MovieDetail: {
      screen: MovieDetail,
      navigationOptions: ({navigation}) => ({
        title: navigation.getParam('title', 'Movie Detail'),
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

export default MovieNavigation;
