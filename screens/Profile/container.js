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

  componentDidMount = async () =>{
    const {getProfileAction} = this.props;

    const result = await getProfileAction();
    /*
    if(result !== 'success'){
      alert(result);
    }
    */
    if(result === 'success'){
      this.setState({
        loaded: true
      });
    }else{
      alert(result);
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
    console.log(this.state.loaded);
    return (
        <Profile
          {...this.props.navigation}
          logout={this.logout}
        />
    );
  };
}

export default Container;
