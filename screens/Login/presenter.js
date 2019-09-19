import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, Image,
  Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard,
  TextInput, StatusBar, ActivityIndicator, Button
} from 'react-native';
import {Ionicon} from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Login = props => (
  <DismissKeyboard>
    <View style={styles.container}>
      {/*<StatusBar barStyle={"light-content"} />*/}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo-white.png")}
          resizeMode="stretch"
          style={styles.logo}
        />
      </View>
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
          placeholder="비밀번호"
          style={styles.textInput}
          autoCapitalize={"none"}
          secureTextEntry={true}
          value={props.password}
          onChangeText={props.changePassword}
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
                  <Text style={styles.btnText}>로그인</Text>
                )
              }
          </View>
        </TouchableOpacity>

        <View style={styles.btnBox}>
          <View style={styles.btnContainer}>
            <Button
              title="회원가입"
              color="#5e5e5e"
              onPress ={() => props.navigate("Register")}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button
              title="비밀번호 초기화"
              color="#9c9c9c"
              onPress ={() => props.navigate("ResetPassword")}
            />
          </View>
        </View>

      </View>
    </View>
  </DismissKeyboard>
);

Login.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  changeUsername: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    backgroundColor: "#4E65B4",
    alignItems: "center",
    justifyContent: "center",
    width: width
  },
  logo: {
    width: 180,
    height: 65,
    marginTop: 20
  },
  content: {
    flex: 4,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
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
    marginTop: 25
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
  btnBox: {
    width: width - 80,
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 10
  },
  btnContainer: {
    width: (width - 90) / 2
  }
});

export default Login;
