import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, View, Text} from 'react-native';
import GetPhoto from '../../components/GetPhoto';
import TakePhoto from '../../components/TakePhoto';
import ChangeProfile from './presenter';


class Container extends Component {

  state = {
    name: '',
    email: '',
    profile_image: null,
    delete_image: false,
    isSubmitting: false,
    isTakePhoto: false,
    isGetPhoto: false,
    isChangeProfile: true
  };

  static propTypes = {
    profile: PropTypes.object,
    changeProfileAction: PropTypes.func.isRequired,
  };


  componentDidMount = () => {
    //console.log('update');
    const {profile} = this.props;

    this.setState({
      name: profile.name,
      email: profile.email,
      profile_image: profile.profile_image
    });

  };
/*
  handleInputChange = event => {
    const {target: {value, name}} = event;
    if(name === 'profile_image'){
      //이미지 보여주기

      const files = event.target.files;
      const file = files[0];
      if(!file.type.match('image')){
        alert('이미지 파일만 가능합니다');
        return false;
      }
      console.log(file);

      this.setState({
        [name]: file,
        show_image: URL.createObjectURL(file)
      });

    }else if(name === 'delete_image'){
      this.setState(prevState => {
        let delete_image = 'n';
        if(prevState.delete_image === 'n'){
          delete_image = 'y';
        }
        return {
          delete_image: delete_image
        };
      });
    }else{
      this.setState({
        [name]: value
      });
    }

  };
*/
  _changeName = text => {
    this.setState({name:text});
  };

  _changeEmail = text => {
    this.setState({email:text})
  };

  _changeProfileImage = photo => {
    this.setState({profile_image: photo, delete_image: false});
  };

  _resetProfileImage = () => {
    const {profile} = this.props;
    this.setState({profile_image: profile.profile_image});
  };

  _deleteProfileImage = () => {
    this.setState(prevState => {
      return {
        delete_image: !prevState.delete_image
      };
    });
  };

  _submit = async (event) => {
    const {name, email, profile_image, delete_image, isSubmitting} = this.state;
    const {changeProfileAction, profile:{name : propsName, email: propsEmail, profile_image: propsProfileImage}} = this.props;
    //event.preventDefault();
    const formName = name ? name : propsName;
    const formEmail = email ? email : propsEmail;
    //const formProfileImage = propsProfileImage === profile_image ? propsProfileImage: profile_image.uri

    if(!isSubmitting){
      this.setState({isSubmitting: true});

      const result = await changeProfileAction(formName, formEmail, profile_image, delete_image);
      //console.log(result);
      if(result === 'success'){
        const {navigation} = this.props;
        navigation.navigate("Profile");
      }else{
        if(result.non_field_errors){
          Alert.alert(result.non_field_errors.toString());
        }else if(result.name){
          Alert.alert(`[이름] ${result.name.toString()}`);
        }else if(result.email){
          Alert.alert(`[이메일] ${result.email.toString()}`);
        }else if(result.profile_image){
          Alert.alert(`[프로필사진] ${result.profile_image.toString()}`);
        }else{
          Alert.alert(`네트워크가 불안정합니다`);
        }
        this.setState({isSubmitting: false});
      }
    }

  };

  _changeMain = () => {
    this.setState({
      isChangeProfile: true,
      isTakePhoto: false,
      isGetPhoto: false,
    });
  };

  _changeTakePhoto = () => {
    this.setState({
      isChangeProfile: false,
      isTakePhoto: true,
      isGetPhoto: false,
    });
  };

  _changeGetPhoto = () => {
    this.setState({
      isChangeProfile: false,
      isTakePhoto: false,
      isGetPhoto: true,
    });
  };

  render(){
    const {name, email, profile_image, show_image, delete_image, isSubmitting, isTakePhoto, isGetPhoto, isChangeProfile} = this.state;
    const {profile: {profile_image : pi}} = this.props;
    //const {profile} = this.props;
    //console.log(delete_image);

    if(isChangeProfile){
      return (
        <ChangeProfile
          name={name}
          email={email}
          profile_image={profile_image}
          delete_image={delete_image}
          pi={pi}
          submit={this._submit}
          isSubmitting={isSubmitting}
          changeName={this._changeName}
          changeEmail={this._changeEmail}
          resetProfileImage={this._resetProfileImage}
          deleteProfileImage={this._deleteProfileImage}
          changeTakePhoto={this._changeTakePhoto}
          changeGetPhoto={this._changeGetPhoto}
         />
      );
    }else if(isTakePhoto){
      return (
        <TakePhoto
          changeProfileImage={this._changeProfileImage}
          changeMain={this._changeMain}
        />
      );
    }else if(isGetPhoto){
      return (
        <GetPhoto
          changeProfileImage={this._changeProfileImage}
          changeMain={this._changeMain}
        />
      );
    }else{
      return (
        <View>
          <Text>
            잘못된 접근입니다.
          </Text>
        </View>
      )
    }

  };
}

export default Container;
