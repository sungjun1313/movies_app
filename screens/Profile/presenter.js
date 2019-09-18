import React from 'react';
import {View, Text, Button} from 'react-native';

const Profile = props => {
  //console.log(props);
  return (
  <View>
    <Text>
      Profile
    </Text>
    <Button
      title="ChangeProfile"
      color="black"
      onPress={() => props.navigate("ChangeProfile")}
    />
    <Button
      title="ChangePassword"
      color="blue"
      onPress={() => props.navigate("ChangePassword")}
    />
    <Button
      title="로그아웃"
      color="red"
      onPress={props.logout}
    />
  </View>
  );
};

export default Profile;
