import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {Alert} from 'react-native';
import Profile from './presenter';

class Container extends Component {
  state ={
    loaded: false
  }

  static propTypes = {
    logoutAction: PropTypes.func.isRequired,
    getProfileAction: PropTypes.func.isRequired,
    profile: PropTypes.object
  };

  componentDidMount =  () => {
    this._getProfileAction();
  };

  _getProfileAction = async () => {
    const {getProfileAction} = this.props;
    const result = await getProfileAction();
    if(result === 'success'){
      this.setState({
        loaded: true
      });
    }else{
      Alert.alert(result);
    }
  };

  logout = () => {
    const {logoutAction} = this.props;
    Alert.alert(
      '로그아웃',
      '정말로 로그아웃하시겠습니까?',
      [
        {
          text: 'OK',
          onPress: () => logoutAction(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };


  render(){
    const {loaded} = this.state;
    return (
        <Profile
          {...this.props.navigation}
          {...this.props.profile}
          loaded={loaded}
          logout={this.logout}
          getProfileAction={this._getProfileAction}
        />
    );
  };
}

export default Container;
