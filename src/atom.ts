// atoms.js
import { atom } from 'recoil';
import { UserDetails } from './types';

export const $_responseState = atom<UserDetails | null>({
  key: 'responseState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
