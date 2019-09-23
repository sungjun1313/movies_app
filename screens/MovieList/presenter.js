import React from 'react';
import PropTypes from 'prop-types';
import {
  View, ScrollView, RefreshControl,
  StyleSheet, Dimensions,
} from 'react-native';
import Movie from '../../components/Movie';

const {width, height} = Dimensions.get("window");

const MovieList = props => (
  <View style={styles.container}>
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={!props.loaded}
          onRefresh={() => props.getMovieList(1, props.inputSearch)}
          tintColor={'red'}
          titleColor={'blue'}
        />
      }
      onScroll={props.scrollApi}
      ref={props.setRef}
    >
    <View style={styles.smContainer}>
        {props.movie_list.map(movie => {
          return <Movie
                  key={movie.id}
                  navigate={props.navigate}
                  movieId={movie.id}
                  title={movie.title}
                  poster_image={movie.poster_image}
                  actor={movie.actor}
                  director={movie.director}
                  release={movie.release}
                  average_grade={movie.average_grade}
                  total_reviews={movie.total_reviews}
                  detail={false}
                />
        })}
      </View>
    </ScrollView>
  </View>
);
/*
<Button
  title="MovieDetail"
  color="black"
  onPress={() => props.navigate('MovieDetail')}
/>
*/

MovieList.propTypes = {
  loaded: PropTypes.bool.isRequired,
  inputSearch: PropTypes.string,
  getMovieList: PropTypes.func.isRequired,
  movie_list: PropTypes.arrayOf(
    PropTypes.shape({
      poster_image: PropTypes.string,
      title: PropTypes.string.isRequired,
      release: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      actor: PropTypes.string.isRequired,
      average_grade: PropTypes.number,
      total_reviews: PropTypes.number,
      id: PropTypes.number.isRequired,
    })
  ),
  scrollApi: PropTypes.func.isRequired,
  setRef: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  smContainer: {
    width: width - 80,
    alignSelf: "center",
    paddingTop: 30
  }
});

export default MovieList;
