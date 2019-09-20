import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';
import ResetPassword from './presenter';

class Container extends Component {
  state = {
    old_password: "",
    new_password1: "",
    new_password2: "",
    isSubmitting: false
  };

  static propTypes = {
    changePasswordAction: PropTypes.func.isRequired
  };

  _changeOldPassword = text => {
    this.setState({old_password: text});
  };

  _changeNewPassword1 = text => {
    this.setState({new_password1: text});
  };

  _changeNewPassword2 = text => {
    this.setState({new_password2: text});
  };

  _submit = async (event) => {
    const {old_password, new_password1, new_password2, isSubmitting} = this.state;
    const {changePasswordAction, navigation} = this.props;

    if(!isSubmitting){
      if(old_password && new_password1 && new_password2){
        this.setState({isSubmitting: true});

        const result = await changePasswordAction(old_password, new_password1, new_password2);
        //console.log(`result ${result}`);
        if(result === 'success'){
          Alert.alert("비밀번호가 변경되었습니다.");
          navigation.navigate("Profile");
        }else{
          if(result.non_field_errors){
            alert(result.non_field_errors.toString());
          }else if(result.old_password){
            alert(`[기존 비밀번호] ${result.old_password.toString()}`);
          }else if(result.new_password1){
            alert(`[새 비밀번호] ${result.new_password1.toString()}`);
          }else if(result.new_password2){
            alert(`[비밀번호 확인] ${result.new_password2.toString()}`);
          }else{
            alert('존재하지 않는 이메일이거나 네트워크가 불안정합니다.');
          }

          this.setState({isSubmitting: false});

        }

      }else{
        Alert.alert("모든 항목을 입력해주세요.");
      }
    }

  }

  render(){
    const {old_password, new_password1, new_password2, isSubmitting} = this.state;

    return (
      <ResetPassword
        old_password={old_password}
        new_password1={new_password1}
        new_password2={new_password2}
        isSubmitting={isSubmitting}
        changeOldPassword={this._changeOldPassword}
        changeNewPassword1={this._changeNewPassword1}
        changeNewPassword2={this._changeNewPassword2}
        submit={this._submit}
       />
    );

  }

}

export default Container;
