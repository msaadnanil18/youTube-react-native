import {ScrollView, StyleSheet, View, RefreshControl} from 'react-native';
import React from 'react';
import UserAvatar from './UserAvatar';
import {Button, Layout, Text} from '@ui-kitten/components';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {StackPramsList} from '../../../types';
import {UserAuthDetail} from '../../../hook/UserAuthDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserAuthentication = () => {
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [response, setResponse] = React.useState<any>(null);
  const checkToken = async () => {
    const response: any = await AsyncStorage.getItem('accessToken');
    const responseData = JSON.parse(response);
    setResponse(responseData);
  };

  React.useEffect(() => {
    checkToken();
  }, []);

  const navigation = useNavigation<NavigationProp<StackPramsList>>();

  const avatarSource = {uri: response?.user.avatar};

  return (
    <ScrollView 
    
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={checkToken} />
    }
    
    >
    <View style={styles.constainer}>
      <UserAvatar source={avatarSource} />
      {response ? (
        <View style={styles.responseContainer}>
          <Text>{response?.user?.fullName}</Text>
          <Text>{response?.user?.email}</Text>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate('RegistrationForm')}
            style={styles.button}
            appearance="ghost"
            status="info">
            Sing up
          </Button>
          <Button
            onPress={() => navigation.navigate('LoginForm')}
            style={styles.button}
            appearance="ghost"
            status="info">
            Sing in
          </Button>
        </View>
      )}
    </View>
    </ScrollView>
  );
};

export default UserAuthentication;

const styles = StyleSheet.create({
  constainer: {
    flexDirection: 'row',
  },
  responseContainer: {
    marginTop: 30,
    marginLeft: 15,
  },
  buttonContainer: {
    flexDirection: 'row-reverse',
  },
  button: {
    marginTop: 'auto',
  },
});
