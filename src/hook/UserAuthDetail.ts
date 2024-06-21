import React from 'react';
import {useRecoilState} from 'recoil';
import {$_responseState} from '../atom';

export const UserAuthDetail = () => {
  const [response, setResponse] = useRecoilState($_responseState);
  return {response, setResponse};
};
