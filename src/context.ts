import React from 'react';

type StorageContext = {
  getItem: (key: string) => any;
  setItem: (key: string, value: any) => void;
  removeItem: (key: string) => void;
  entries: () => [string, any][];
  clear: () => void;
};

const context = React.createContext<StorageContext>({} as StorageContext);

export default context;
