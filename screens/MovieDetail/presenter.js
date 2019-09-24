import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, View, Text, RefreshControl, StyleSheet, Dimensions,
  TouchableOpacity, Image
} from 'react-native'
import Moment from 'moment';
import FitImage from 'react-native-fit-image';
import Movie from '../../components/Movie';
import Comment from '../../components/Comment';
import CommentForm from '../../components/CommentForm';

const {width, height} = Dimensions.get("window");

const MovieDetail = (props) => (
  <View style={styles.container}>
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={!props.loaded}
          onRefresh={props.getMovieDetail}
          tintColor={'red'}
          titleColor={'blue'}
        />
      }
    >
      <View style={styles.smContainer}>
        <Movie
          movieId={props.id}
          title={props.title}
          poster_image={props.poster_image}
          actor={props.actor}
          director={props.director}
          release={props.release}
          average_grade={props.average_grade}
          total_reviews={props.total_reviews}
          story={props.story}
          detail={true}
        />
      </View>
      {props.isEditing
        &&  (
              <View style={styles.anotherContainer}>
                <CommentForm
                  isCreate={false}
                  body={props.updateBody}
                  grade={props.updateGrade}
                  changeBody={props.changeUpdateBody}
                  changeGrade={props.changeUpdateGrade}
                  changeMode={props.changeMode}
                  submit={props.submitUpdate}
                  />
              </View>
            )
      }

      {!props.isEditing
        && (
            <View style={styles.anotherContainer}>
              <CommentForm
                isCreate={true}
                body={props.createBody}
                grade={props.createGrade}
                changeBody={props.changeCreateBody}
                changeGrade={props.changeCreateGrade}
                submit={props.submitCreate}
                />
            </View>
          )
      }

      {!props.isEditing
        && (
            <View style={styles.borderContainer}>
              <View>
                <Text style={styles.reviewHeader}>
                  평점: {props.average_grade} / 총 리뷰: {props.total_reviews}
                </Text>
                <TouchableOpacity onPressOut={props.myReviewShow}>
                  <Text style={styles.reviewHeader}>
                    {props.mine ? "모든 리뷰 보기" : "내 리뷰만 보기"}
                  </Text>
                </TouchableOpacity>
              </View>
              {props.cinema_reviews.map(review => {
                if(review.isMine){
                  return <Comment
                          key={review.id}
                          {...review}
                          changeMode={props.changeMode}
                          submit={props.submitDelete}
                          />
                }else{
                  return <Comment key={review.id} {...review} />
                }
              })}
            </View>
          )
      }
    </ScrollView>
  </View>
);

MovieDetail.propTypes = {
  id: PropTypes.number.isRequired,
  post_image: PropTypes.string,
  title: PropTypes.string,
  release: PropTypes.string,
  director: PropTypes.string,
  actor: PropTypes.string,
  story: PropTypes.string,
  average_grade: PropTypes.number,
  total_reviews: PropTypes.number,
  cinema_reviews: PropTypes.arrayOf(
    PropTypes.shape({
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
      modified: PropTypes.string
    })
  ),
  loaded: PropTypes.bool.isRequired,
  mine: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  createBody: PropTypes.string,
  createGrade: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  updateBody: PropTypes.string,
  updateGrade: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  changeMode: PropTypes.func.isRequired,
  changeCreateBody: PropTypes.func.isRequired,
  changeCreateGrade: PropTypes.func.isRequired,
  changeUpdateBody: PropTypes.func.isRequired,
  changeUpdateGrade: PropTypes.func.isRequired,
  submitCreate: PropTypes.func.isRequired,
  submitUpdate: PropTypes.func.isRequired,
  submitDelete: PropTypes.func.isRequired,
  getMovieDetail: PropTypes.func.isRequired,
  myReviewShow: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  smContainer: {
    width: width - 80,
    alignSelf: "center",
    paddingTop: 30
  },
  anotherContainer: {
    width: width - 80,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 15
  },
  reviewHeader: {
    width: "100%",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "right",
    marginBottom: 7
  },
  borderContainer: {
    width: width - 80,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15,
    borderColor: "#cccccc",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    borderRadius: 5,
  }
});

export default MovieDetail;
