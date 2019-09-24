import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Image, StyleSheet, Dimensions, TouchableOpacity,
  TextInput, ActivityIndicator, TouchableWithoutFeedback, Keyboard,
  ScrollView
} from 'react-native';
import FitImage from 'react-native-fit-image';
import {MaterialIcons} from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ChangeProfile = (props) => (
  <DismissKeyboard>
    <ScrollView style={styles.container}>

      <View style={styles.content}>
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

          {props.profile_image && props.profile_image === props.pi
            && (
                <View style={styles.profileBox}>
                  <View style={styles.circleBox}>
                    <FitImage
                      source={{uri:props.profile_image}}
                      style={styles.img}
                    />
                  </View>

                  <TouchableOpacity onPressOut={props.deleteProfileImage}>
                    <View style={styles.checkBox}>
                      <MaterialIcons
                        name={props.delete_image ? "check-box" : "check-box-outline-blank"}
                        color="#3e99ee"
                        size={40}
                      />
                      <Text>
                        삭제
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
          }

          {props.profile_image && props.profile_image !== props.pi
            && (
                <View style={styles.profileBox}>

                <View style={styles.circleBox}>
                  <FitImage
                    source={props.profile_image}
                    style={styles.img}
                  />
                </View>


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


        <TouchableOpacity style={styles.touchable} onPressOut={props.submit}>
          <View style={styles.button}>
            {props.isSubmitting
              ? (
                  <ActivityIndicator size="small" color="white" />
                )
              : (
                  <Text style={styles.btnText}>변경</Text>
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
  circleBox: {
    width: width - 200,
    height: width - 200,
    marginBottom: 10,
    borderRadius: (width - 200) / 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
  },
  img: {
    width: width - 200,
    height: width - 200,
    resizeMode: "contain"
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
  },
  checkBox: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center"
  }
});

ChangeProfile.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  profile_image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  pi: PropTypes.string,
  delete_image: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  changeName: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  resetProfileImage: PropTypes.func.isRequired,
  deleteProfileImage: PropTypes.func.isRequired,
  changeTakePhoto: PropTypes.func.isRequired,
  changeGetPhoto: PropTypes.func.isRequired,
};

export default ChangeProfile;
