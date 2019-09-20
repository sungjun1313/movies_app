import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, Image,
  Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard,
  TextInput, ActivityIndicator, Button
} from 'react-native';

const {width, height} = Dimensions.get("window");

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ResetPassword = (props) => (
  <DismissKeyboard>
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          placeholder="이메일"
          style={styles.textInput}
          autoCapitalize={"none"}
          autoCorrect={false}
          value={props.email}
          onChangeText={props.changeEmail}
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
                  <Text style={styles.btnText}>비밀번호 초기화</Text>
                )
              }
          </View>
        </TouchableOpacity>

      </View>
    </View>
  </DismissKeyboard>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  }
});

ResetPassword.propTypes = {
  email: PropTypes.string,
  isSubmitting: PropTypes.bool.isRequired,
  changeEmail: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default ResetPassword;
