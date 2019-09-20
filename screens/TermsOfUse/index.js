import React from 'react';
import {View, ScrollView,Text, StyleSheet} from 'react-native';

const TermsOfUse = (props) => (
  <ScrollView style={styles.container}>
    <View style={styles.textBox}>
      <Text style={styles.titleText}>
        제1조(목적)
      </Text>
      <Text style={styles.bodyText}>
        본 약관은 노마드영화앱을 이용함에 있어 회사와 이용자 간의 권리, 의무 및 책임
        사항과 절차 등을 정하기 위해 만들어졌습니다.
      </Text>
    </View>
    <View style={styles.textBox}>
      <Text style={styles.titleText}>
        제2조(정의)
      </Text>
      <Text style={styles.bodyText}>
        이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
        {"\n"}
        {"\n"}
        2.1 노마드영화앱은 회원이 온라인 상의 공개된 이미지, 텍스트, 이미지 등을
        활용하여 영화의 리뷰를 볼 수 있도록 돕는 애플리케이션을 의미합니다.
        {"\n"}
        {"\n"}
        2.2 회원이란 본 약관에 따라 회사와 이용계약을 체결하고 서비스를 이용하는
        이용자를 말합니다.
        {"\n"}
        {"\n"}
        2.3 콘텐츠란 회사가 서비스를 위해 회원에게 제공하는 내용물 일체를 의미합니다.
        {"\n"}
        {"\n"}
        2.4 공개 콘텐츠란 회사가 제공하는 콘텐츠에 포함되어 있는 텍스트, 음성, 영상, 이미지 중
        온라인에 무료 또는 광고와 함께 공개되어 있는 내용물을 의미합니다.
      </Text>
    </View>
    <View style={styles.textBox}>
      <Text style={styles.titleText}>
        제3조(약관의 게시와 개정)
      </Text>
      <Text style={styles.bodyText}>
        3.1 회사는 약관 및 개인정보 처리방침을 회원이 쉽게 확인할 수 있도록 서비스의 초기화면 등에 게시합니다.
        {"\n"}
        {"\n"}
        3.2 회사는 필요에 따라 약관의 규제에 관한 법률, 정보통신망 이용 촉진 및 정보 보호 등에 관한 법률 등
        관련 법령을 위반하지 않는 범위 내에서 본 약관을 개정할 수 있습니다.
        {"\n"}
        {"\n"}
        3.3 회사가 약관을 개정하는 경우 적용일자 및 개정사항을 명시하여 적용일자 7일 전부터 서비스를 통해
        공지합니다. 다만, 그 변경 내용이 회원에게 불리한 것일 경우, 그 적용일자 30일 이전부터 동일한 내용을
        서비스를 통해 공지할 뿐만 아니라, 해당 내용을 회원의 전자우편 또는 SMS를 통헤 개별적으로 통지합니다.
      </Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eeeeee'
  },
  textBox: {
    marginBottom: 10,
    padding: 5
  },
  titleText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5
  },
  bodyText: {
    fontSize: 12,
    color: "#555555",
    lineHeight: 18
  }
});

export default TermsOfUse;
