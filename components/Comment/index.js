import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet
} from 'react-native';

const Comment = props => (
  <View style={styles.container}>
    <Text>
      Comment
    </Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    flexWrap: "wrap"
  }
});

export default Comment;
