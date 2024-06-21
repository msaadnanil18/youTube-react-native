import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Input, Layout, Text, Icon} from '@ui-kitten/components';
import {launchImageLibrary} from 'react-native-image-picker';
import UserAvatar from './UserAvatar';
import * as Yup from 'yup';
import {Formik} from 'formik';
import axios from 'axios';

const RegistrationForm = () => {
  const initialValues = {
    username: '',
    email: '',
    fullName: '',
    password: '',
    avatar: null,
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Full Name is required')
      .min(2, 'Full Name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required !'),
    avatar: Yup.mixed().required('Avatar is required'),
  });

  const handlePickAvatar = async (setFieldValue: any) => {
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
          setFieldValue('avatar', selectedImage);
        }
      },
    );
  };

  const handleRegister = async (values: any, {resetForm}:any) => {
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('fullName', values.fullName);
    formData.append('password', values.password);
    formData.append('avatar', {
      uri: values.avatar.uri,
      type: values.avatar.type,
      name: values.avatar.fileName,
    });

    try {
      const response = await axios.post('/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data, '______________________%__________________');
      resetForm()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleRegister}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <Layout style={styles.container}>
          <Text category="h1" style={styles.title}>
            Register
          </Text>
          <Input
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            style={styles.input}
            accessoryRight={props => <Icon {...props} name="person-outline" />}
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}
          <Input
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            style={styles.input}
            accessoryRight={props => <Icon {...props} name="email-outline" />}
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <Input
            placeholder="Full Name"
            value={values.fullName}
            onChangeText={handleChange('fullName')}
            onBlur={handleBlur('fullName')}
            style={styles.input}
            accessoryRight={props => (
              <Icon {...props} name="person-done-outline" />
            )}
          />
          {touched.fullName && errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          )}
          <Input
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            secureTextEntry
            style={styles.input}
            accessoryRight={props => <Icon {...props} name="lock-outline" />}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <TouchableOpacity onPress={() => handlePickAvatar(setFieldValue)}>
            <UserAvatar source={values.avatar} />
            <Text style={styles.text} category="label">
              Upload Avatar
            </Text>
          </TouchableOpacity>
          {touched.avatar && errors.avatar && (
            <Text style={styles.errorText}>{errors.avatar}</Text>
          )}
          <Button onPress={() => handleSubmit()} style={styles.button}>
            Register
          </Button>
        </Layout>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
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
  text: {
    marginLeft: 15,
    marginVertical: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    marginLeft: 8,
  },
});

export default RegistrationForm;
