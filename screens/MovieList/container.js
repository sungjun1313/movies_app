import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, View, TextInput, TouchableOpacity, Text, Dimensions} from 'react-native';
import MovieList from './presenter.js';

const {width, height} = Dimensions.get('window');

class Container extends Component {
  state = {
    loaded: false,
    inputSearch: '',
    current: 1
  };

  static navigationOptions = ({navigation}) => {
    return{
      headerTitle: (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 10,
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%"
          }}
          >
          <TextInput
            placeholder="search"
            placeholderTextColor= 'gray'
            style={{
              height: 30,
              width: 160,
              borderBottomColor: '#aaaaaa',
              borderBottomWidth: 1,
              fontSize: 20
            }}
            autoCapitalize={"none"}
            value={navigation.getParam('inputSearch')}
            onChangeText={navigation.getParam('changeInputSearch')}
            returnKeyType={"send"}
            onSubmitEditing={navigation.getParam('submit')}
            />
            <TouchableOpacity onPressOut={navigation.getParam('submit')}>
            <View
              style={{
                width: 45,
                height: 30,
                backgroundColor: "#3399ee",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4
              }}
              >
              <Text
                style={{
                  color: "#ffffff"
                }}
              >
                검색
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ),
    };
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
   const {initUser} = this.props;

   await initUser();
   await this._getMovieList(1, '');

   this.props.navigation.setParams({
     inputSearch: this.state.inputSearch,
     changeInputSearch: this._changeInputSearch,
     submit: this._submit
   });

 };

 componentDidUpdate(prevProps, prevState){
    const {movie_list} = this.props;

    if(movie_list !== prevProps.movie_list){
      this.setState({
        loaded: true
      });
    }
  }

  _getMovieList = async (page, search) => {
    const {getMovieList} = this.props;
    const result = await getMovieList(page, search);
    if(result === 'success'){
      this.setState({loaded: true, current: page});
    }else{
      if(result.detail){
        Alert.alert(result.detail.toString());
      }else{
        Alert.alert('네트워크가 불안정합니다.');
      }
    }
    console.log('get movie list');
  };

  _scrollApi = async (event) => {
    const {loaded, current, inputSearch} = this.state
    const {page_next} = this.props;
    //현재 top의 y축 높이 + 현재 내용의 높이 >= 총 내용의 높이
    //console.log(`${event.nativeEvent.contentOffset.y}, ${event.nativeEvent.layoutMeasurement.height}, ${event.nativeEvent.contentSize.height}`);
    if(event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height >= event.nativeEvent.contentSize.height-1){
      if(loaded){
        console.log('api must be call');
        this.setState({loaded: false});
        if(page_next){
          const next_page = current + 1;
          await this._getMovieList(next_page, inputSearch);
          //this.setState({current: next_page});
        }else{
          Alert.alert("더 이상 게시글이 없습니다.");
          this.setState({loaded: true})
        }
      }

    }
  };

  _changeInputSearch = text => {
    this.setState({inputSearch: text});
    this.props.navigation.setParams({inputSearch:text});
  };

  _submit = async () => {
    const {inputSearch, loaded} = this.state;
    //console.log(this.childRef);
    if(loaded){
      this.setState({loaded: false});
      this.childRef.scrollTo({y:0, animated: false});
      await this._getMovieList(1, inputSearch);
    }

  };

  _setRef = (scrollView) => {
    this.childRef = scrollView;
  }

  render(){
    const {loaded, inputSearch} = this.state;
    const {movie_list} = this.props;
    //console.log(inputSearch);
    return (
      <MovieList
        {...this.props.navigation}
        loaded={loaded}
        inputSearch={inputSearch}
        getMovieList={this._getMovieList}
        movie_list={movie_list}
        scrollApi={this._scrollApi}
        setRef={this._setRef}
      />
    )
  }
}

export default Container;
