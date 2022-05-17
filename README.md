# React Cross Page Local Storage

React provider to simplify localStorage usage, when the storage is updated the new value is reflected across the whole application and on other opened pages.

## Installation

```bash
npm install --save @shop3/react-cpls
```

## Usage

```js
import React, { useEffect } from 'react';
import { StorageProvider, useStorage } from '@shop3/react-cpls';

const App = () => {
  return (
    <StorageProvider>
      {/* app here */}
    </StorageProvider>
  )
}

const Example = () => {
  const storage = useStorage();

  useEffect(() => {
    storage.setItem('test', 'test value');
  }, [storage]);

  return (
    <p>{storage.getItem('test')}</p>
  )
}
```

# Development

## Installation

```bash
npm install

npm run husky:install
```

## Development

```bash
npm run develop
```
