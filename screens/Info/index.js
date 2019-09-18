import React from 'react';
import {View, Text, Button} from 'react-native';

const Info = props => (
  <View>
    <Text>
      Info
    </Text>
    <Button
      title="PrivacyTerms"
      color="black"
      onPress={() => props.navigation.navigate("PrivacyTerms")}
    />
    <Button
      title="TermsOfUse"
      color="blue"
      onPress={() => props.navigation.navigate("TermsOfUse")}
    />
  </View>
);

export default Info;
