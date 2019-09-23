import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, TextInput, Picker, TouchableOpacity
} from 'react-native';

const CommentForm = props => (
  <View style={styles.container}>
    <Text style={styles.header}>
      리뷰 작성
    </Text>
    <TextInput
      style={styles.textArea}
      multiline={true}
      numberOfLines={4}
      value={props.body}
      onChangeText={props.changeBody}
      placeholder="후기를 작성해주세요."
    />
    <Picker
      selectedValue={props.grade}
      style={styles.selectBox}
      onValueChange={(itemValue, itemIndex) =>
        props.changeGrade(itemValue)
        }
    >
      <Picker.Item label="평점을 선택해주세요" value="" />
      <Picker.Item label="0" value="0" />
      <Picker.Item label="1" value="1" />
      <Picker.Item label="2" value="2" />
      <Picker.Item label="3" value="3" />
      <Picker.Item label="4" value="4" />
      <Picker.Item label="5" value="5" />
    </Picker>

    {!props.isCreate
      ? (
          <View style={styles.btnBox}>
            <TouchableOpacity>
              <View style={styles.btn}>
                <Text style={styles.btnText}>
                  저장
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      : (
          <View style={styles.btnBox}>
            <TouchableOpacity>
              <View style={styles.btn}>
                <Text style={styles.btnText}>
                  수정
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
    }

  </View>
);

CommentForm.propTypes = {
  isCreate: PropTypes.bool.isRequired,
  body: PropTypes.string,
  grade: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  changeBody: PropTypes.func.isRequired,
  changeGrade: PropTypes.func.isRequired,
  changeMode: PropTypes.func,
  submit: PropTypes.func.isRequired,
  submitDelete: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    flexWrap: "wrap"
  },
  header: {
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 14,
    fontWeight: "600",
    height: 28,
    textAlign:"center",
    justifyContent: "center",
    borderBottomColor: "#cccccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textArea: {
    width: "90%",
    alignSelf: "center",
    borderColor: "#cccccc",
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 10
  },
  selectBox: {
    width: "90%",
    height: 50,
    alignSelf: "center",
  },
  btnBox: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 10
  },
  btn: {
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3e99ee",
    borderRadius: 5
  },
  btnText: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  }
});

export default CommentForm;
