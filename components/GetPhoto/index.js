import React, { Component } from "react";
import PropTypes from 'prop-types'
import { CameraRoll, Image, ScrollView, StyleSheet, Text} from "react-native";
import GetPhoto from "./presenter";
import { Constants } from 'expo';

class Container extends Component {
  state = {
    photos: null,
    pickedPhoto: null
  };

  static propTypes ={
    changeProfileImage: PropTypes.func.isRequired,
    changeMain: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this._getPhotosAsync().catch(error => {
      console.error(error);
    });
  }

  _getPhotosAsync= async () => {
    let photos = await CameraRoll.getPhotos({ first: 40 }).then((data) => {
      const assets = data.edges;
      const images = assets.map((asset) => asset.node.image);
      this.setState({
        photos: images
      })
    });
  //this.setState({ photos });
  }

  render() {
    const {photos} = this.state;
    //console.log(photos);
    return (
      <GetPhoto
        {...this.state}
        pickPhoto={this._pickPhoto}
        approvePhoto={this._approvePhoto}
      />
    );
  }

/*
  _renderPhotos(photos) {
    let images = [];
    let count = 0;
    for (let { node: photo } of photos.edges) {
      images.push(

        <Image
          key = {count}
          source={photo.image}
          resizeMode="contain"
          style={{ height: 100, width: 100, resizeMode: 'contain' }}
          onPress={() => this._pickPhoto()}
        />
      );
      count += 1;
    }
    return images;
  }
*/

  _pickPhoto = photo => {
    this.setState({
      pickedPhoto: photo
    });
  };

  _approvePhoto = () => {

    const { pickedPhoto } = this.state;
    const {changeProfileImage, changeMain} = this.props;
    changeProfileImage(pickedPhoto);
    changeMain();
  };
}

export default Container;
