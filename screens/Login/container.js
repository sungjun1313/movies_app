import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';
import Login from './presenter';

class Container extends Component {
  state = {
    username: '',
    password: '',
    isSubmitting: false
  };

  static propTypes = {
    loginAction: PropTypes.func.isRequired
  };

  _changeUsername = text => {
    this.setState({username:text});
  };

  _changePassword = text => {
    this.setState({password:text});
  };

  _submit = async () => {
    const {username, password, isSubmitting} = this.state;
    const {loginAction} = this.props;
    if(!isSubmitting){
      if(username && password){
        this.setState({isSubmitting: true});

        const result = await loginAction(username, password);
        console.log(`[result] ${result}`);
        if(result !== 'success'){
          if(result.non_field_errors){
            Alert.alert(result.non_field_errors.toString());
          }else if(result.username){
            Alert.alert(result.username.toString());
          }else if(result.password){
            Alert.alert(result.password.toString());
          }else{
            Alert.alert('네트워크가 불안정합니다.');
          }

          this.setState({isSubmitting: false});
        }
      }else{
        Alert.alert("아이디 비밀번호 모두 기입해주세요.");
      }
    }
  }

  render(){
    return (
      <Login
        {...this.state}
        {...this.props.navigation}
        changeUsername={this._changeUsername}
        changePassword={this._changePassword}
        submit={this._submit}
      />
    );
  }
}

export default Container;
