import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';
import MovieDetail from './presenter';

class Container extends Component {
  state = {
    loaded: false,
    mine: false,
    createBody: '',
    createGrade: '',
    updateBody: '',
    updateGrade: '',
    isEditing: false,
    isSubmittingCreate: false,
    isSubmittingUpdate: false,
    isSubmittingDelete: false,
  };

  static propTypes = {
    movie_detail: PropTypes.shape({
      id: PropTypes.number.isRequired,
      post_image: PropTypes.string,
      title: PropTypes.string,
      release: PropTypes.string,
      director: PropTypes.string,
      actor: PropTypes.string,
      story: PropTypes.string,
      average_grade: PropTypes.number,
      total_reviews: PropTypes.number,
      cinema_id: PropTypes.arrayOf(
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
      )
    }),
    getMovieDetail: PropTypes.func.isRequired,
    createReviewAction: PropTypes.func.isRequired,
    updateReviewAction: PropTypes.func.isRequired,
    deleteReviewAction: PropTypes.func.isRequired,
  };

  componentDidMount = async () => {
    await this._getMovieDetail();
  };

  componentDidUpdate(prevProps, prevState){
    const {movie_detail} = this.props;
    if(movie_detail !== prevProps.movie_detail){
      this.setState({
        loaded: true
      });
    }
  };

  _getMovieDetail = async () => {
    const {getMovieDetail, navigation} = this.props;
    const movieId = navigation.getParam('movieId', -1);
    if(movieId <= 0){
      Alert.alert('존재하지 않는 게시물입니다.');
    }else{
      const result = await getMovieDetail(movieId);
      if(result === 'success'){
        this.setState({
          loaded: true
        });
      }else{
        if(result.detail){
          Alert.alert(result.detail.toString());
        }else{
          Alert.alert('네트워크가 불안정합니다.');
        }
      }
    }
  };

  _findMine = () => {
    const {movie_detail: {cinema_reviews}} = this.props;
    const myReview = cinema_reviews.filter(review => review.isMine)[0];
    return myReview;
  };

  _changeCreateBody = text => {
    this.setState({createBody: text});
  };

  _changeCreateGrade = text => {
    this.setState({createGrade: text});
  };

  _changeUpdateBody = text => {
    this.setState({updateBody: text});
  };

  _changeUpdateGrade = text => {
    this.setState({updateGrade: text});
  };

  _submitCreate = async (event) => {

    const {createBody, createGrade, isSubmittingCreate} = this.state;
    const cinema_id = this.props.navigation.getParam('movieId', -1);
    if(cinema_id <= 0){
      Alert.alert('존재하지 않는 게시글입니다.');
    }else{
      const {createReviewAction} = this.props;
      if(!isSubmittingCreate){
        if(createBody && createGrade){
          this.setState({isSubmittingCreate: true});
          const result = await createReviewAction(cinema_id, createGrade, createBody);
          if(result === 'success'){
            Alert.alert('성공적으로 저장하였습니다.');
            this.setState({
              createGrade: '',
              createBody: '',
              isSubmittingCreate: false
            });
          }else{
            Alert.alert(result.toString());
            this.setState({isSubmittingCreate: false});
          }

        }else{
          Alert.alert("리뷰와 점수 모두 입력해주세요.");
        }
      }
    }
  };

  _submitUpdate = async (event) => {
    const {updateBody, updateGrade, isSubmittingUpdate} = this.state;
    const cinema_id = this.props.navigation.getParam('movieId', -1);
    const myReview = this.findMine();
    if(cinema_id <= 0){
      Alert.alert('존재하지 않는 게시글입니다.');
    }else{
      const {updateReviewAction} = this.props;
      if(!isSubmittingUpdate){
        if(updateBody && updateGrade){
          this.setState({isSubmittingUpdate: true});
          const result = await updateReviewAction(myReview.id, cinema_id, updateGrade, updateBody);
          if(result === 'success'){
            Alert.alert('성공적으로 수정하였습니다.');
            this.setState({
              isEditing: false,
              isSubmittingUpdate: false
            })
          }else{
            Alert.alert(result.toString());
            this.setState({isSubmittingUpdate: false});
          }
        }else{
          Alert.alert("리뷰와 점수 모두 입력해주세요.");
        }
      }
    }
  };

  _submitDelete = async (event) => {
    const {isSubmittingDelete} = this.state;
    const myReview = this.findMine();
    const cinema_id = this.props.navigation.getParam("movieId", -1);
    if(cinema_id <= 0){
      Alert.alert("존재하지 않는 게시글입니다.");
    }else{
      const {deleteReviewAction} = this.props;
      if(!isSubmittingDelete){
        Alert.alert(
          '리뷰 삭제',
          '정말로 리뷰를 삭제하시겠습니까?',
          [
            {
              text: 'OK',
              onPress: async () => {
                this.setState({isSubmittingDelete: true});
                const result = await deleteReviewAction(myReview.id, cinema_id);
                if(result === 'success'){
                  Alert.alert('성공적으로 삭제하였습니다.');
                  this.setState({isSubmittingDelete: false});
                }else{
                  Alert.alert(result.toString());
                  this.setState({isSubmittingDelete: false});
                }
              }
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      }

    }

  };

  _changeMode = () => {

    const myReview = this.findMine();
    //console.log(myReview);
    this.setState(prevState => {
      const {isEditing} = prevState;
      return {
        isEditing: !isEditing,
        updateBody: myReview.body,
        updateGrade: myReview.grade
      };
    });
  };

  _myReviewShow = () => {
    this.setState(prevState => {
      const mine = prevState.mine;
      return {
        mine: !mine
      };
    });

  }

  render(){
    const {loaded, mine, createBody, createGrade, isEditing, updateBody, updateGrade} = this.state;

    const {movie_detail} = this.props;

    let {cinema_reviews} = movie_detail;
    if(mine){
      cinema_reviews = cinema_reviews.filter(review => review.isMine);
    }


    //console.log(cinema_reviews);

    return (
      <MovieDetail
        id={movie_detail.id}
        poster_image={movie_detail.poster_image}
        title={movie_detail.title}
        release={movie_detail.release}
        director={movie_detail.director}
        actor={movie_detail.actor}
        average_grade={movie_detail.average_grade}
        story={movie_detail.story}
        total_reviews={movie_detail.total_reviews}
        cinema_reviews={cinema_reviews}
        loaded={loaded}
        isEditing={isEditing}
        createBody={createBody}
        createGrade={createGrade}
        updateBody={updateBody}
        updateGrade={updateGrade}
        changeMode={this._changeMode}
        changeCreateBody={this._changeCreateBody}
        changeCreateGrade={this._changeCreateGrade}
        changeUpdateBody={this._changeUpdateBody}
        changeUpdateGrade={this._changeUpdateGrade}
        submitCreate={this._submitCreate}
        submitUpdate={this._submitUpdate}
        submitDelete={this._submitDelete}
        getMovieDetail={this._getMovieDetail}
        myReviewShow={this._myReviewShow}
      />
    );
  }

}

export default Container;
