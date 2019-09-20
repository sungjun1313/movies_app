import React from 'react';
import PropTypes from 'prop-types';
import {
  View, ScrollView, Text, RefreshControl,
  StyleSheet, Dimensions, TouchableOpacity, Image
} from 'react-native';
import FitImage from 'react-native-fit-image';
import FadeIn from 'react-native-fade-in-image';
import Moment from 'moment';

const {width, height} = Dimensions.get("window");

const Profile = props => {
  //console.log(props);
  return (
  <View style={styles.container}>
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={!props.loaded}
          onRefresh={props.getProfileAction}
          tintColor={'red'}
          titleColor={'blue'}
        />
      }
    >
      <View style={styles.smContainer}>
        <View style={styles.circleBox}>
          {props.profile_image
            ? <FitImage source={{uri:props.profile_image}} />
            : <Image source={require("../../assets/images/noPhoto.jpg")} />
          }
        </View>

        <View style={styles.textBox}>
            <Text style={styles.titleText}>아이디</Text>
            <Text style={styles.bodyText}>{props.username}</Text>
        </View>
        <View style={styles.textBox}>
            <Text style={styles.titleText}>이름</Text>
            <Text style={styles.bodyText}>{props.name}</Text>
        </View>
        <View style={styles.textBox}>
            <Text style={styles.titleText}>이메일</Text>
            <Text style={styles.bodyText}>{props.email}</Text>
        </View>
        <View style={styles.textBox}>
            <Text style={styles.titleText}>가입일</Text>
            <Text style={styles.bodyText}>{Moment(props.date_joined).format("YYYY-MM-DD")}</Text>
        </View>
        <View style={styles.textBox}>
            <Text style={styles.titleText}>최종접속날짜</Text>
            <Text style={styles.bodyText}>{Moment(props.last_login).format("YYYY-MM-DD")}</Text>
        </View>

        <View style={styles.btnBox}>
          <TouchableOpacity onPressOut={() => props.navigate("ChangeProfile")}>
            <View style={styles.button}>
              <Text style={styles.btnText}>
                프로필{'\n'}변경
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPressOut={() => props.navigate("ChangePassword")}>
            <View style={styles.button}>
              <Text style={styles.btnText}>
                비밀번호{'\n'}변경
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPressOut={props.logout}>
            <View style={styles.button}>
              <Text style={styles.btnText}>
                로그아웃
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center"
  },
  smContainer: {
    width: width - 30,
  },
  circleBox: {
    width: width-200,
    height: width-200,
    borderRadius: (width - 80) / 2,
    overflow: "hidden",
    backgroundColor: "black",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10
  },
  textBox: {
    flexDirection: "row"
  },
  titleText: {
    width:100,
    borderRightColor: "#aaaaaa",
    borderRightWidth: 1
  },
  bodyText: {
    width: width - 100 - 30,
    paddingLeft: 10
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 15
  },
  button: {
    width: 80,
    height: 40,
    backgroundColor: '#55cc99',
    justifyContent: "center"
  },
  btnText: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
  }
});

export default Profile;
