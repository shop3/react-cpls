import React, { useCallback, useEffect, useState } from 'react';
import context from './context';

const StorageProvider: React.FC = ({ children }) => {
  const [storage, setStorage] = useState<{ [k: string]: any }>(() => {
    const items: { [k: string]: any } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === null) continue;
      const item = localStorage.getItem(key);
      items[key] = toObject(item);
    }
    return items;
  });

  const onStorageUpdate = async (event: StorageEvent) => {
    const { key, newValue, storageArea } = event;
    if (storageArea === null || storageArea !== localStorage) return;
    if (storageArea.length === 0) return setStorage({});
    if (key !== null) setStorage((values) => ({ ...values, [key]: toObject(newValue) }));
  };

  const setItem = useCallback(
    (key: string, value: any) => {
      localStorage.setItem(key, toString(value));
      setStorage((values) => ({ ...values, [key]: value }));
    },
    [setStorage]
  );

  const getItem = useCallback(
    (key: string) => {
      return storage[key];
    },
    [storage]
  );

  const removeItem = useCallback(
    (key: string) => {
      localStorage.removeItem(key);
      setStorage((values) => {
        delete values[key];
        return values;
      });
    },
    [setStorage]
  );

  const entries = useCallback(() => {
    return Object.entries(storage);
  }, [storage]);

  const clear = useCallback(() => {
    localStorage.clear();
    setStorage({});
  }, [setStorage]);

  useEffect(() => {
    window.addEventListener('storage', onStorageUpdate, false);
    return () => {
      window.removeEventListener('storage', onStorageUpdate, false);
    };
  }, [setStorage]);

  return <context.Provider value={{ setItem, getItem, removeItem, entries, clear }}>{children}</context.Provider>;
};

export default StorageProvider;

function toString(value: any): string {
  return typeof value === 'string' ? value : JSON.stringify(value);
}

function toObject(value: any) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
