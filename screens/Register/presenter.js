import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Image, StyleSheet, Dimensions, TouchableOpacity,
  TextInput, ActivityIndicator, TouchableWithoutFeedback, Keyboard,
  ScrollView
} from 'react-native';
import FitImage from 'react-native-fit-image';

const {width, height} = Dimensions.get("window");

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Register = (props) => (
  <DismissKeyboard>
    <ScrollView style={styles.container}>

      <View style={styles.content}>
        <TextInput
          placeholder="아이디"
          style={styles.textInput}
          autoCapitalize={"none"}
          autoCorrect={false}
          value={props.username}
          onChangeText={props.changeUsername}
        />
        <TextInput
          placeholder="이름"
          style={styles.textInput}
          autoCapitalize={"none"}
          autoCorrect={false}
          value={props.name}
          onChangeText={props.changeName}
        />
        <TextInput
          placeholder="이메일"
          style={styles.textInput}
          autoCapitalize={"none"}
          autoCorrect={false}
          value={props.email}
          onChangeText={props.changeEmail}
        />

        <View style={styles.photoBox}>
          <Text style={styles.photoBoxTitle}>
            프로필 사진
          </Text>
          <TouchableOpacity style={styles.photoTouch} onPressOut={props.changeTakePhoto}>
            <View style={styles.photoButton}>
              <Text style={styles.btnText}>
                촬영
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoTouch} onPressOut={props.changeGetPhoto}>
            <View style={styles.photoButton}>
              <Text style={styles.btnText}>
                사진첩
              </Text>
            </View>
          </TouchableOpacity>

          {props.profile_image
            && (
                <View style={styles.profileBox}>
                  <FitImage
                    source={props.profile_image}
                    style={{marginBottom:10}}
                  />
                  <TouchableOpacity style={styles.profileTouch} onPressOut={props.resetProfileImage}>
                    <View style={styles.photoButton}>
                      <Text style={styles.btnText}>
                        취소
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
          }

        </View>

        <TextInput
          placeholder="비밀번호"
          style={styles.textInput}
          autoCapitalize={"none"}
          secureTextEntry={true}
          value={props.password1}
          onChangeText={props.changePassword1}
        />
        <TextInput
          placeholder="비밀번호 확인"
          style={styles.textInput}
          autoCapitalize={"none"}
          secureTextEntry={true}
          value={props.password2}
          onChangeText={props.changePassword2}
          returnKeyType={"send"}
          onSubmitEditing={props.submit}
        />
        <TouchableOpacity style={styles.touchable} onPressOut={props.submit}>
          <View style={styles.button}>
            {props.isSubmitting
              ? (
                  <ActivityIndicator size="small" color="white" />
                )
              : (
                  <Text style={styles.btnText}>회원가입</Text>
                )
              }
          </View>
        </TouchableOpacity>

      </View>
    </ScrollView>
  </DismissKeyboard>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 4,
    backgroundColor: "#FFFFFF",
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  textInput: {
    width: width - 80,
    height: 50,
    borderColor: "#bbbbbb",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fafafa",
    fontSize: 14
  },
  touchable: {
    width: width - 80,
    backgroundColor: "#3e99ee",
    borderRadius: 5,
    marginTop: 25,
    marginBottom: 25
  },
  button: {
    paddingHorizontal: 7,
    height: 50,
    justifyContent: "center"
  },
  btnText: {
    color: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14
  },
  photoBox: {
    width: width - 80,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
    borderColor: "#bbbbbb",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 14,
  },
  photoBoxTitle: {
    width: '100%',
    color: "#bbbbbb",
    marginBottom: 10
  },
  photoTouch: {
    width: ((width - 140) / 2),
    backgroundColor: "#52aacc",
    borderRadius: 5
  },
  photoButton: {
    paddingHorizontal: 5,
    height: 40,
    justifyContent: "center"
  },
  profileBox: {
    width: "100%",
    marginTop: 10,
  },
  profileTouch: {
    width: ((width - 140) / 2),
    backgroundColor: "#52aacc",
    borderRadius: 5,
    alignSelf: "center"
  }

});

Register.propTypes = {
  username: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  password1: PropTypes.string,
  password2: PropTypes.string,
  profile_image: PropTypes.object,
  isSubmitting: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  changeUsername: PropTypes.func.isRequired,
  changeName: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  changePassword1:PropTypes.func.isRequired,
  changePassword2: PropTypes.func.isRequired,
  changeProfileImage: PropTypes.func.isRequired,
  resetProfileImage: PropTypes.func.isRequired,
  changeTakePhoto: PropTypes.func.isRequired,
  changeGetPhoto: PropTypes.func.isRequired,
};

export default Register;
