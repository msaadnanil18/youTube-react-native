import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import axios from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackPramsList, Videos} from '../../types';
import VideoList from './VideoList';
import {Card, Divider, Spinner, Button} from '@ui-kitten/components';
import Video, {ResizeMode, VideoRef} from 'react-native-video';

type homeProps = NativeStackScreenProps<StackPramsList, 'videoPlay' >;

const VideoPlay = ({navigation, route}: homeProps) => {
  const {videoId} = route.params;
  const videoRef = React.useRef<VideoRef>(null);
  const [data, setData] = React.useState<Videos | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchPayVideo = async () => {
    setLoading(true);
    const response = await axios.get(
      `/videos/play-videos/${videoId}`,
    );
    setData(response.data?.data);
    setLoading(false);
  };

  React.useEffect(() => {
    if (videoId) {
      fetchPayVideo().catch(console.log);
    }
  }, [videoId]);

  return (
    <View>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{uri: data?.videoFile}}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          controls={true}
          muted={false}
          pictureInPicture={true}
          repeat={true}
           testID="video-player"
        />
        <View style={styles.textContainer}>
          <Text style={{fontSize:20}} >{data?.title}</Text>
          <Divider style={styles.divider} />
          <Text>{data?.description}</Text>
        </View>
      </View>
      <VideoList navigation={navigation} type='videoPlay' />
    </View>
  );
};

export default VideoPlay;

const styles = StyleSheet.create({
  videoContainer: {
    marginBottom: 16,
  },
  video: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 16,
  },
  divider: {
    marginVertical: 3,
  },
});

