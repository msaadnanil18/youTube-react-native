import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Button, Modal, Card} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackPramsList } from '../../types';

const TopBar = () => {
 
  const [isModalvisible, setIsModalvisible] = React.useState<boolean>(false);
  return (
    <View style={styles.buttonContainer} >
      <ModalSimpleUsageShowcase
        isModalvisible={isModalvisible}
        setIsModalvisible={setIsModalvisible}
      />
      <Button
        appearance="ghost"
        accessoryLeft={() => <FeatherIcon name="cast" size={20} />}
      />

      <Button
        appearance="ghost"
        accessoryLeft={() => <AntDesign name="bells" size={20} />}
      />
      <Button
        appearance="ghost"
        accessoryLeft={() => <AntDesign name="search1" size={20} />}
      />
      <Button
        appearance="ghost"
        accessoryLeft={() => <AntDesign name="setting" size={20} />}
        onBlur={() => setIsModalvisible(false)}
        onPress={() => setIsModalvisible(true)}
      />
    </View>
  );
};

export default TopBar;

export const ModalSimpleUsageShowcase = ({
  isModalvisible,
  setIsModalvisible,
}: {
  isModalvisible: boolean;
  setIsModalvisible: (r: boolean) => void;
}): React.ReactElement => {
  const navigate = useNavigation<NavigationProp<StackPramsList>>()
  const logOut = async () => {
    try {
     await AsyncStorage.clear();
     navigate.navigate('videos');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal visible={isModalvisible} backdropStyle={styles.backdrop}>
      <Card disabled={true}>
        <Button size='small' onPress={async() =>{
          await logOut()
           setIsModalvisible(false)
           }}>Logout</Button>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  container: {
    minHeight: 200,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
