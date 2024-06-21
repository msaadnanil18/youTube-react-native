import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopBar from './TopBar';

import UserAuthentication from './authentication/UserAuthentication';

const Index = () => {
  return (
    <View>
      <TopBar />
      <UserAuthentication />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
