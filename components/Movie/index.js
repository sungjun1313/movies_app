import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import FitImage from 'react-native-fit-image';
import Moment from 'moment';

const Movie = props => (
  <View style={styles.container}>
    {!props.detail
      && (
          <TouchableOpacity onPressOut={() => props.navigate('MovieDetail', {movieId:props.movieId, title:props.title})}>
            <Text style={styles.header}>
              {props.title}
            </Text>
          </TouchableOpacity>
        )
    }

    <View style={styles.contentBox}>

      {props.poster_image
        ? <FitImage source={{uri:props.poster_image}} />
        : <Image source={require("../../assets/images/photoPlaceholder.png")} style={styles.noImage} />
      }

      <View style={styles.topBox}>
        <Text style={styles.leftText}>
          감독
        </Text>
        <Text style={styles.rightText}>
          {props.director}
        </Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.leftText}>
          주연
        </Text>
        <Text style={styles.rightText}>
          {props.actor}
        </Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.leftText}>
          개봉날짜
        </Text>
        <Text style={styles.rightText}>
          {Moment(props.release).format('YYYY-MM-DD')}
        </Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.leftText}>
          평점
        </Text>
        <Text style={styles.rightText}>
          {props.average_grade}
        </Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.leftText}>
          리뷰
        </Text>
        <Text style={styles.rightText}>
          {props.total_reviews} 개
        </Text>
      </View>

      {props.detail
        && (
            <View>
              <Text style={styles.storyTitle}>
                내용
              </Text>
              <Text style={styles.storyContent}>
                {props.story}
              </Text>
            </View>
          )
      }

    </View>
  </View>
);

Movie.propTypes = {
  navigate: PropTypes.func,
  movieId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  poster_image: PropTypes.string,
  actor: PropTypes.string,
  director: PropTypes.string,
  release: PropTypes.string,
  average_grade: PropTypes.number,
  total_reviews: PropTypes.number,
  story: PropTypes.string,
  detail: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    flexWrap: "wrap"
  },
  header: {
    fontSize: 16,
    fontWeight: "600",
    height: 32,
    textAlign: "justify",
    justifyContent: "center",
    borderBottomColor: "#cccccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 4,
  },
  contentBox: {
    padding: 0
  },
  noImage: {
    resizeMode: "contain",
    width: "80%",
    alignSelf: "center",
  },
  topBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10,
    paddingBottom: 4,
    paddingLeft: 10,
    borderTopColor: "#cccccc",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  textBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
  },
  leftText: {
    width: 80,
    borderRightColor: "#cccccc",
    borderRightWidth: StyleSheet.hairlineWidth,
    fontWeight: "600"
  },
  rightText: {
    width: 100,
    paddingLeft: 10
  },
  storyTitle: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    fontWeight: "600"
  },
  storyContent: {
    paddingHorizontal: 10,
    paddingBottom: 15
  }
});

export default Movie;
