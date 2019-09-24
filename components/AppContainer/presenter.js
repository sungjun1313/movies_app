import React from 'react';
import PropTypes from 'prop-types';
import {View, StatusBar, StyleSheet} from 'react-native';

import RootNavigation from '../../navigation/RootNavigation';
import AuthenticationNavigation from '../../navigation/AuthenticationNavigation';

const AppContainer = (props) => {
  console.log('render');
  return (
  <View style={styles.container}>
    <StatusBar hidden={false} />
    {props.isLogin ? <RootNavigation /> : <AuthenticationNavigation />}
  </View>
  );
};

AppContainer.propTypes = {
  isLogin: PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});

export default AppContainer;
