import React from 'react';
import {View, Text, Button} from 'react-native';

const MovieList = props => (
  <View>
    <Text>
      MovieList
    </Text>
    <Button
      title="MovieDetail"
      color="black"
      onPress={() => props.navigate('MovieDetail')}
    />
  </View>
);

export default MovieList;
