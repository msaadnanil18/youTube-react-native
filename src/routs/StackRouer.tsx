import React from 'react';
import {Button} from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VideoList from '../componets/videos/VideoList';
import {StackPramsList, ButtomTabsParsms} from '../types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VideoPlay from '../componets/videos/VideoPlay';
import Search from '../componets/search/Search';
import {useNavigation,NavigationProp} from '@react-navigation/native';


const Stack = createNativeStackNavigator<StackPramsList>();

const StackRouer = () => {
    const navigation = useNavigation<NavigationProp<StackPramsList>>()
  return (
    <Stack.Navigator initialRouteName="videos">
      <Stack.Screen
        name="videos"
        component={VideoList}
        options={{
          title: '',

          headerLeft: () => (
            <Button
              appearance="ghost"
              status="danger"
              accessoryLeft={props => (
                <AntDesign name="youtube" color="red" size={20} />
              )}
            />
          ),
          headerRight: () => (
            <Button
              appearance="ghost"
              onPress={() => navigation.navigate('Search')}
              accessoryLeft={
                <AntDesign name="search1" size={20} color="white" />
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name="videoPlay"
        component={VideoPlay}
        options={{title: ''}}
      />
      <Stack.Screen name="Search" component={Search} options={{title: '',  headerShown: false,}} />
    </Stack.Navigator>
  );
};

export default StackRouer;
