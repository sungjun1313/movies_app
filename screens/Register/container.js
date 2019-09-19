import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, View, Text} from 'react-native';
import Register from './presenter';
import GetPhoto from '../../components/GetPhoto';
import TakePhoto from '../../components/TakePhoto';

class Container extends Component {
  state = {
    username: '',
    name: '',
    email: '',
    password1: '',
    password2: '',
    profile_image: null,
    show_image: '',
    isSubmitting: false,
    isTakePhoto: false,
    isGetPhoto: false,
    isRegister: true
  };

  static propTypes = {
    createAccountAction: PropTypes.func.isRequired
  };

  _changeUsername = text => {
    this.setState({username: text});
  };

  _changeName = text => {
    this.setState({name: text});
  };

  _changeEmail = text => {
    this.setState({email: text});
  };

  _changePassword1 = text => {
    this.setState({password1: text});
  };

  _changePassword2 = text => {
    this.setState({password2: text});
  };

  _changeProfileImage = photo => {
    this.setState({profile_image:photo});
  };

  _resetProfileImage = () => {
    this.setState({profile_image:null});
  };

  /*
  handleInputChange = event => {
    const {target: {value, name}} = event;
    if(name === 'profile_image'){
      //이미지 보여주기

      const files = event.target.files;
      const file = files[0];
      if(!file.type.match('image')){
        Alert.alert('이미지 파일만 가능합니다');
        return false;
      }
      console.log(file);

      this.setState({
        [name]: file,
        show_image: URL.createObjectURL(file)
      });

    }else{
      this.setState({
        [name]: value
      });
    }

  };
  */

  _submit = async (event) => {
    const {username, name, email, password1, password2, profile_image, isSubmitting} = this.state;
    const {createAccountAction} = this.props;

    if(!isSubmitting){
      if(username && name && email && password1 && password2){
        this.setState({isSubmitting: true});

        const result = await createAccountAction(username, name, email, password1, password2, profile_image);
        console.log(`[result] ${result}`);
        if(result !== 'success'){
          if(result.non_field_errors){
            alert(result.non_field_errors.toString());
          }else if(result.username){
            alert(`[아이디] ${result.username.toString()}`);
          }else if(result.name){
            alert(`[이름] ${result.name.toString()}`);
          }else if(result.email){
            alert(`[이메일] ${result.email.toString()}`);
          }else if(result.password1){
            alert(`[비밀번호] ${result.password1.toString()}`);
          }else if(result.password2){
            alert(`[비밀번호] ${result.password2.toString()}`);
          }else if(result.profile_image){
            alert(`[프로필사진] ${result.profile_image.toString()}`);
          }else{
            alert(`네트워크가 불안정합니다`);
          }

          this.setState({isSubmitting: false});
        }

      }else{
        Alert.alert("아이디, 이름, 이메일, 비밀번호는 필수 항목입니다.");
      }
    }

  };

  _changeMain = () => {
    this.setState({
      isRegister: true,
      isTakePhoto: false,
      isGetPhoto: false,
    });
  };

  _changeTakePhoto = () => {
    this.setState({
      isRegister: false,
      isTakePhoto: true,
      isGetPhoto: false,
    });
  };

  _changeGetPhoto = () => {
    this.setState({
      isRegister: false,
      isTakePhoto: false,
      isGetPhoto: true,
    });
  };

  render(){
      const {username, name, email, password1, password2, profile_image, show_image, isSubmitting, isTakePhoto, isGetPhoto, isRegister} = this.state;
      //console.log(`[profile_image] ${profile_image}`);
      if(isRegister){
        return (
          <Register
            username={username}
            name={name}
            email={email}
            password1={password1}
            password2={password2}
            profile_image = {profile_image}
            show_image={show_image}
            isSubmitting={isSubmitting}
            changeUsername={this._changeUsername}
            changeName={this._changeName}
            changeEmail={this._changeEmail}
            changePassword1={this._changePassword1}
            changePassword2={this._changePassword2}
            changeProfileImage={this._changeProfileImage}
            resetProfileImage={this._resetProfileImage}
            submit={this._submit}
            changeTakePhoto={this._changeTakePhoto}
            changeGetPhoto={this._changeGetPhoto}
           />
        );
      }else if(isTakePhoto){
        return <TakePhoto
                changeProfileImage={this._changeProfileImage}
                changeMain={this._changeMain}
                />
      }else if(isGetPhoto){
        return <GetPhoto
                changeProfileImage={this._changeProfileImage}
                changeMain={this._changeMain}
                />
      }else{
        return (
          <View>
            <Text>
              잘못된 접근입니다.
            </Text>
          </View>
        );
      }


  }

}

export default Container;
