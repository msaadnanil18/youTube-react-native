import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Input, Layout, Text, Spinner} from '@ui-kitten/components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAvatar from '../settings/authentication/UserAvatar';
import VideoUploadPlay from './VideoUploadPlay';
import {instance} from '../../hook/setDefaultUrl';

interface VideoFormValues {
  videoFile: any;
  thumbnail: any;
  title: string;
  description: string;
}

const initialValues = {
  videoFile: null,
  thumbnail: null,
  title: '',
  description: '',
};

const validationSchema = Yup.object().shape({
  videoFile: Yup.mixed().required('Video file is required'),
  thumbnail: Yup.mixed().required('Thumbnail is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
});

const VideosUpload: React.FC = () => {
  const [isUploadig, setIsUploadig] = React.useState<boolean>(false);
  const {api} = instance();
  const handleVideoPick = (setFieldValue: any) => {
    launchImageLibrary(
      {
        mediaType: 'video',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled video picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const selectedVideo = response.assets ? response.assets[0] : null;
          setFieldValue('videoFile', selectedVideo);
          if (selectedVideo) {
            setFieldValue('videoFile', {
              uri: selectedVideo.uri,
              type: selectedVideo.type,
              name: selectedVideo.fileName,
            });
          }
        }
      },
    );
  };

  const handleThumbnailPick = (setFieldValue: any) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const selectedImage = response.assets ? response.assets[0] : null;
          setFieldValue('thumbnail', selectedImage);
        }
      },
    );
  };

  const handleUpload = async (values: VideoFormValues, {resetForm}: any) => {
    setIsUploadig(true);
    const formData = new FormData();

    formData.append('videoFile', {
      uri: values.videoFile.uri,
      name: 'video.mp4',
      type: 'video/mp4',
    });
    formData.append('thumbnail', {
      uri: values.thumbnail.uri,
      type: values.thumbnail.type,
      name: values.thumbnail.fileName,
    });

    formData.append('title', values.title);
    formData.append('description', values.description);

    try {
      const accessToken: any = await AsyncStorage.getItem('accessToken');
      const token = JSON.parse(accessToken).accessToken;
      if (!token) {
        throw new Error('No access token found');
      }

      await axios.post('/videos/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setIsUploadig(false);

      resetForm();
    } catch (error) {
      console.log('Upload error:', error);
    }
  };

  return (
    <Layout style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUpload}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <>
            <Text category="h1" style={styles.title}>
              Upload Video
            </Text>
            <TouchableOpacity onPress={() => handleVideoPick(setFieldValue)}>
              <View style={styles.uploadContainer}>
                <VideoUploadPlay
                  source={values.videoFile}
                  style={styles.videosContainer}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleThumbnailPick(setFieldValue)}>
              <View style={styles.uploadContainer}>
                <UserAvatar source={values.thumbnail} />
              </View>
            </TouchableOpacity>
            <Input
              placeholder="Title"
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              style={styles.input}
              status={touched.title && errors.title ? 'danger' : 'basic'}
              caption={touched.title && errors.title ? errors.title : ''}
            />
            <Input
              placeholder="Description"
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              style={styles.input}
              status={
                touched.description && errors.description ? 'danger' : 'basic'
              }
              caption={
                touched.description && errors.description
                  ? errors.description
                  : ''
              }
            />
            <Button
              onPress={() => (isUploadig ? {} : handleSubmit())}
              style={styles.button}
              accessoryLeft={
                isUploadig ? (
                  <Spinner size="small" animating={true} />
                ) : undefined
              }
              appearance={isUploadig ? 'ghost' : 'filled'}>
              {isUploadig ? "Uploading" : 'Upload'}
            </Button>
          </>
        )}
      </Formik>
    </Layout>
  );
};

const styles = StyleSheet.create({
  videosContainer: {
    width: '100%',
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  uploadContainer: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e4e4e4',
    borderRadius: 4,
    alignItems: 'center',
  },
  uploadText: {
    color: '#a4a4a4',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default VideosUpload;
