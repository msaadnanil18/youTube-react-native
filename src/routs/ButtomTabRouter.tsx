import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import VideosUpload from '../componets/videos/VideosUpload';
import {ButtomTabsParsms} from '../types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StackRouer from './StackRouer';
import Index from '../componets/settings/Index';

const Tab = createMaterialBottomTabNavigator<ButtomTabsParsms>();

const ButtomTabRouter = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={StackRouer}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <AntDesign size={20} name="home" />,
        }}
      />
      <Tab.Screen
        name="Upload"
        component={VideosUpload}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <AntDesign name="plussquareo" size={30} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Index}
        options={{
          tabBarLabel: 'You',
          tabBarIcon: () => (
            <AntDesign name="user" size={20} color="white" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ButtomTabRouter;

const styles = StyleSheet.create({});
