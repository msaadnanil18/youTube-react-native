import {StyleSheet, Text, StyleProp} from 'react-native';
import React from 'react';
import Video, {ResizeMode, VideoRef} from 'react-native-video';

const VideoUploadPlay = ({
  source,
  style,
}: {
  source: any;
  style: StyleProp<any>;
}) => {
  const videoRef = React.useRef<VideoRef>(null);

  
  return (
    <Video
      ref={videoRef}
      style={style}
      resizeMode={ResizeMode.CONTAIN}
      source={{uri: source?.uri ? source.uri : null}}
      controls={true}
      pictureInPicture={true}
      repeat={true}
    />
  );
};

export default VideoUploadPlay;

const styles = StyleSheet.create({
  
});
