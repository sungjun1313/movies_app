import React from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity
} from 'react-native';

const {width, height} = Dimensions.get('window');

const Info = props => (
  <View style={styles.container}>
    <Text style={styles.header}>
      앱정보
    </Text>
    <View style={styles.textBox}>
      <Text style={styles.titleText}>
        버전
      </Text>
      <Text style={styles.bodyText}>
        1.0.0
      </Text>
    </View>
    <View style={styles.textBox}>
      <TouchableOpacity onPress={() => props.navigation.navigate("PrivacyTerms")}>
        <Text style={styles.titleText}>
          개인정보처리방침
        </Text>
      </TouchableOpacity>
    </View>
    <View style={styles.textBox}>
      <TouchableOpacity onPress={() => props.navigation.navigate("TermsOfUse")}>
        <Text style={styles.titleText}>
          이용약관
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 10
  },
  header: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  textBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  titleText: {
    width: width / 3,
    fontSize: 12,
    color: "#333333",
    textDecorationLine: "underline",
  },
  bodyText: {
    width: width / 3,
    textAlign: "right",
    fontSize: 12,
    color: "#333333"
  }
});

export default Info;
