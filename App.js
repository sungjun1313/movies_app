import React, {Component} from 'react';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {Asset} from 'expo-asset';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import { StyleSheet, Image } from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import AppContainer from './components/AppContainer';
import configureStore from './redux/configureStore';

const {persistor, store} = configureStore();

class App extends Component {
  state = {
    loaded: false
  };

  render(){
    const {loaded} = this.state;

    if(!loaded){
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
         />
      );
    }

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  };

  cacheImage = (images) => {
    return images.map(image => {
      if(typeof image === 'string'){
        return Image.prefetch(image);
      }else{
        return Asset.fromModule(image).downloadAsync();
      }
    });
  };

  cacheFonts = (fonts) => {
    return fonts.map(font => Font.loadAsync(font));
  };

  _loadAssetsAsync = async () => {
    const imageAssets = this.cacheImage([
      require('./assets/images/logo.png'),
      require('./assets/images/logo-white.png'),
      require('./assets/images/noPhoto.jpg'),
      require('./assets/images/photoPlaceholder.png'),
    ]);

    const fontAssets = this.cacheFonts([
      Ionicons.font,
      MaterialIcons.font
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  _handleLoadingError = error => {
    console.log(error);
  }

  _handleFinishLoading = async () => {
    this.setState({
      loaded: true
    });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
