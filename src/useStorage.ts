import { useContext } from 'react';
import context from './context';

const useStorage = () => {
  return useContext(context);
};

export default useStorage;
