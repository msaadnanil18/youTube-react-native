import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar} from '@ui-kitten/components';
const UserAvatar = ({source}: any) => {
  return (
    <Avatar
      style={styles.avatar}
      shape="round"
      size="giant"
      source={{
        uri: source?.uri
          ? source?.uri
          : 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200',
      }}
    />
  );
};

export default UserAvatar;

const styles = StyleSheet.create({
  avatar: {
    marginTop: 20,
    marginLeft: 20,
    width: 70,
    height: 70,
  },
});
