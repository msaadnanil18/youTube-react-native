import axios from 'axios';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {StackPramsList, Videos} from '../../types';
import Video, {ResizeMode, VideoRef} from 'react-native-video';
import {Card, Divider, Spinner, Button} from '@ui-kitten/components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type homeProps = NativeStackScreenProps<StackPramsList, 'videos'>;

const VideoList = ({navigation, type}: homeProps  & {type?:string} | any) => {
  const [videosList, setVideosList] = React.useState<Videos[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isPlayingIndex, setIsPlayingIndex] = React.useState<number | null>(
    null,
  );
  const videoRef = React.useRef<VideoRef>(null);

  const handleOnFocus = (index: number) => {
    setIsPlayingIndex(index);
  };

  const fetchVideosList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        '/videos/list-videos',
      );
      setVideosList(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchVideosList();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.spinner}>
            <Spinner status="info" />
          </View>
        ) : (
          <View>
            {videosList.map((item, index) => (
              <TouchableOpacity
               
                key={index}
                onPress={() =>
                  navigation.navigate('videoPlay', {videoId: item._id})
                }
                 onPressIn={() => handleOnFocus(index)}
                >
                <View style={styles.videoContainer}>
                  {isPlayingIndex === index && type !== 'videoPlay' ? (
                    <Video
                      ref={videoRef}
                      source={{uri: item?.videoFile}}
                      style={styles.video}
                      resizeMode={ResizeMode.COVER}
                      controls={false}
                      muted={true}
                      pictureInPicture={false}
                      repeat={true}
                    />
                  ) : (
                    <Image
                      style={styles.thumbnail}
                      source={{
                        uri: item.thumbnail,
                      }}
                    />
                  )}

                  <View style={styles.textContainer}>
                    <Text>{item?.title}</Text>
                    <Divider style={styles.divider} />
                    <Text>{item?.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  videoContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
  },
  video: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 16,
  },
  divider: {
    marginVertical: 8,
  },
  posterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  posterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 12,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default VideoList;
