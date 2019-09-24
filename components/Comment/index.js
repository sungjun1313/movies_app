import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Dimensions
} from 'react-native';
import FitImage from 'react-native-fit-image';
import Moment from 'moment';

const {width, height} = Dimensions.get("window");

const Comment = props => (
  <View style={styles.container}>
    <View style={styles.leftBox}>
      <View style={styles.circleBox}>
        {props.user.profile_image
          ? <FitImage source={{uri:props.user.profile_image}} style={styles.img} />
          : <Image source={require("../../assets/images/noPhoto.jpg")} style={styles.img} />
        }
      </View>
    </View>
    <View style={styles.rightBox}>
      <Text style={styles.idBox}>
        {props.user.username} / 평점 {props.grade}
      </Text>
      <Text style={styles.bodyBox}>
        {props.body}
      </Text>
      <Text style={styles.dateBox}>
        {Moment(props.modified).format("YYYY-MM-DD")}
      </Text>
      {props.isMine
        && (
            <View style={styles.btnBox}>
              <TouchableOpacity onPressOut={props.changeMode}>
                <View style={styles.updateBtn}>
                  <Text style={styles.btnText}>
                    수정
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPressOut={props.submit}>
                <View style={styles.deleteBtn}>
                  <Text style={styles.btnText}>
                    삭제
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )
      }
    </View>
  </View>
);

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    profile_image: PropTypes.string,
    id: PropTypes.number.isRequired
  }),
  cinema: PropTypes.number,
  grade: PropTypes.number,
  body: PropTypes.string,
  isMine: PropTypes.bool.isRequired,
  created: PropTypes.string,
  modified: PropTypes.string,
  changeMode: PropTypes.func,
  submit: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    flexWrap: "wrap",
    flexDirection: "row"
  },
  leftBox: {
    width: 80,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  circleBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: "contain"
  },
  rightBox: {
    width: width - 80 - 80 - 30,
    paddingTop: 10,
    paddingBottom: 10
  },
  idBox: {
    marginTop: 3,
    marginBottom: 3,
    fontWeight: "500"
  },
  bodyBox: {
    marginTop: 3,
    marginBottom: 3,
  },
  dateBox: {
    marginTop: 3,
    marginBottom: 3,
    fontSize: 11,
    color: "#888888"
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  updateBtn: {
    width: 60,
    height: 30,
    backgroundColor: "#5cbf00",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  deleteBtn: {
    width: 60,
    height: 30,
    backgroundColor: "#e00034",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  btnText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#ffffff"
  }
});

export default Comment;
