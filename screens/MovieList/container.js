import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MovieList from './presenter.js'

class Container extends Component {
  state = {
    loaded: false,
    inputSearch: '',
  };

  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
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
    page_count: PropTypes.number,
    page_next: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    page_prev: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    getMovieList: PropTypes.func.isRequired,
  };

  componentDidMount = async() => {

   const {getMovieList, initUser} = this.props;

   const result = await getMovieList(1, '');

   initUser();

   if(result === 'success'){
     this.setState({
       loaded: true
     });
   }else{

     if(result.detail){
       alert(result.detail);
     }else{
       alert('네트워크가 불안정합니다.');
     }

   }
 };

 componentDidUpdate(prevProps, prevState){
    const {movie_list} = this.props;

    if(movie_list !== prevProps.movie_list){
      this.setState({
        loaded: true
      });
    }
  }

  render(){
    console.log(this.state.loaded);
    return (
      <MovieList
        {...this.props.navigation}
      />
    )
  }
}

export default Container;
