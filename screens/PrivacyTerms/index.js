import React from 'react';
import {View, ScrollView,Text, StyleSheet} from 'react-native';

const PrivacyTerms = (props) => (
  <ScrollView style={styles.container}>
    <View style={styles.textBox}>
      <Text style={styles.titleText}>
        수집하는 개인정보의 항목
      </Text>
      <Text style={styles.bodyText}>
        노마드영화앱은  서비스 제공에 관한 계약 이행, 이용자 식별, 서비스 개선, 신규 서비스 개발,
        회원가입, 상담을 위하여 필요 최소한의 개인정보를 수집합니다.
        {"\n"}
        {"\n"}
        노마드영화앱은 이용자의 사전 동의를 받고, 서비스의 본질직 기능을 수행하기 위하여 반드시
        필요한 필수항목과 보다 특화된 서비스를 제공하기 위한 선택항목을 수집합니다.
        {"\n"}
        {"\n"}
        이용자는 선택항목 수집에 동의하지 않아도 서비스 이용에 제한을 받지 않으며, 특화된 서비스를
        이용하지 못할 뿐입니다.
      </Text>
    </View>
    <View style={styles.textBox}>
      <Text style={styles.titleText}>
        개인정보의 수집 및 이용목적
      </Text>
      <Text style={styles.bodyText}>
        회사는 수집한 정보를 다음과 같은 목적으로 이용합니다.
        {"\n"}
        {"\n"}
        - 이용자가 서비스를 원활히 이용할 수 있도록 돕기 위해
        {"\n"}
        {"\n"}
        - 서비스 이용에 따른 이용자 식별 및 부정 이용 방지를 위해
        {"\n"}
        {"\n"}
        - 서비스 이용에 관한 통계 데이터를 작성하기 위해
        {"\n"}
        {"\n"}
        - 서비스 개선에 필요한 설문조사 및 분석을 위해
        {"\n"}
        {"\n"}
        - 컨텐츠 이용 시 연령확인을 위해
      </Text>
    </View>
    <View style={styles.textBox}>
      <Text style={styles.titleText}>
        개인정보 수집방법
      </Text>
      <Text style={styles.bodyText}>
        회사는 서비스 제공을 위해 다음과 같은 방법으로 개인 정보를 수집합니다.
        {"\n"}
        {"\n"}
        - 노마드영하앱의 회원가입 및 이용 과정에서 이용자로부터 직접 수집
        {"\n"}
        {"\n"}
        - 셍성 정보 수집 툴을 통한 수집
        {"\n"}
        {"\n"}
        - 서면 양식, 팩스, 전화, 상담 게시판, 이메일을 통한 수집
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

export default PrivacyTerms;
