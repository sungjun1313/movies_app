import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';
import ResetPassword from './presenter';

class Container extends Component {
  state = {
    email: "",
    isSubmitting: false
  };

  static propTypes = {
    passwordResetAction: PropTypes.func.isRequired
  };

  _changeEmail = text => {
    this.setState({email: text});
  };

  _submit = async (event) => {
    const {email, isSubmitting} = this.state;
    const {passwordResetAction, navigation} = this.props;

    if(!isSubmitting){
      if(email){
        this.setState({isSubmitting: true});

        const result = await passwordResetAction(email);
        //console.log(`result ${result}`);
        if(result === 'success'){
          Alert.alert("메일이 전송되었습니다.");
          navigation.navigate("Login");
        }else{
          if(result.non_field_errors){
            alert(result.non_field_errors.toString());
          }else if(result.email){
            alert(`[이메일] ${result.email.toString()}`);
          }else{
            alert('존재하지 않는 이메일이거나 네트워크가 불안정합니다.');
          }

          this.setState({isSubmitting: false});

        }

      }else{
        Alert.alert("이메일을 입력해주세요.");
      }
    }

  }

  render(){
    const {email, isSubmitting} = this.state;

    return (
      <ResetPassword
        email={email}
        isSubmitting={isSubmitting}
        changeEmail={this._changeEmail}
        submit={this._submit}
       />
    );

  }

}

export default Container;
