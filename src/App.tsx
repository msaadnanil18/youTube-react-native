import React from 'react';
import type {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Index from './Index';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
// import {eva} from './hook/eva';
import { RecoilRoot } from 'recoil';
import {instance} from './hook/setDefaultUrl';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {enableScreens} from 'react-native-screens';

enableScreens();

const App = () => {
  instance()
  return (
    <React.Fragment>
       <RecoilRoot>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Index />
        </NavigationContainer>
      </ApplicationProvider>
      </RecoilRoot>
    </React.Fragment>

  );
};

export default App;
