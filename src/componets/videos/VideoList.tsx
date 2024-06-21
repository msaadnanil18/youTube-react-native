
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { instance } from '../../hook/setDefaultUrl';
import {StackPramsList, Videos} from '../../types';
import Video, {ResizeMode, VideoRef} from 'react-native-video';
import { Divider, Spinner } from '@ui-kitten/components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type homeProps = NativeStackScreenProps<StackPramsList, 'videos'>;

const VideoList = ({navigation, type}: homeProps  & {type?:string} | any) => {
  const {api} = instance()
  const [videosList, setVideosList] = React.useState<Videos[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
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
      const response = await api.get(
        '/videos/list-videos',
      );
      setVideosList(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await api.get('/videos/list-videos');
      setVideosList(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  React.useEffect(() => {
    fetchVideosList();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
                      resizeMode={ResizeMode.CONTAIN}
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
    padding: 0,
  },
  textContainer: {
    padding: 16,
  },
  divider: {
    marginVertical: 4,
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
    padding: 0,
  },
});

export default VideoList;
