import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Input, Layout, Text, Icon} from '@ui-kitten/components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {StackPramsList} from '../../../types';
import {UserAuthDetail} from '../../../hook/UserAuthDetail';
import {instance} from '../../../hook/setDefaultUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = () => {
  const {api} = instance();
  const {response, setResponse} = UserAuthDetail();
  const navigation = useNavigation<NavigationProp<StackPramsList>>();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Please enter your username'),
    password: Yup.string().required('Please enter your password'),
  });

  const loginForm = async (values: any, {resetForm}: any) => {
    const payload = {...values};

    try {
      const response = await api.post('/users/login', payload);
      const {accessToken} = response.data.data;
      await AsyncStorage.setItem(
        'accessToken',
        JSON.stringify(response.data.data),
        () => {
          AsyncStorage.mergeItem(
            'accessToken',
            JSON.stringify(response.data.data),
          );
        },
      );

      setResponse(response.data.data);
      resetForm();
      navigation.navigate('videos');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={loginForm}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <Text category="h1" style={styles.title}>
              Login
            </Text>
            <Input
              placeholder="Username"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              style={styles.input}
              status={touched.username && errors.username ? 'danger' : 'basic'}
              caption={
                touched.username && errors.username ? errors.username : ''
              }
              accessoryRight={props => (
                <Icon {...props} name="person-outline" />
              )}
            />
            <Input
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              style={styles.input}
              status={touched.password && errors.password ? 'danger' : 'basic'}
              caption={
                touched.password && errors.password ? errors.password : ''
              }
              accessoryRight={props => <Icon {...props} name="lock-outline" />}
            />
            <Button
              onPress={() => handleSubmit()}
              accessoryLeft={props => (
                <Icon {...props} name="log-in-outline" />
              )}>
              Login
            </Button>
            <Button
              appearance="ghost"
              status="basic"
              onPress={() => navigation.navigate('videos')}
              style={styles.registerButton}>
              Create your account
            </Button>
          </>
        )}
      </Formik>
    </Layout>
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
  registerButton: {
    marginTop: 16,
  },
});

export default LoginForm;
