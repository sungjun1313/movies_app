import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as userActions} from "../../redux/modules/users";
import {actionCreators as movieActions} from "../../redux/modules/movies";

const mapStateToProps = (state, ownProps) => {
  const {users: {isLogin}} = state;
  const {movies: {movie_list, page_count, page_next, page_prev}} = state;
  return {
    isLogin,
    movie_list,
    page_count,
    page_next,
    page_prev
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMovieList: async (page, search) => {
      return await dispatch(movieActions.getMovieList(page, search));
    },
    initUser: () => {
      //dispatch(userActions.getNotifications()); API 구현
      //dispatch(userActions.registerPushAction());
      console.log('initUser');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
