import React, { ButtonHTMLAttributes, InputHTMLAttributes, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { StorageProvider, useStorage } from '../src';

const Example = () => {
  const storage = useStorage();
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const handleSaveValue = useCallback(() => {
    if (key !== '' && value !== '') {
      storage.setItem(key, value);
    }
  }, [key, value, storage]);

  const handleClearStorage = useCallback(() => {
    storage.clear();
  }, [storage]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex' }}>
        <Input id="key" label="Key" value={key} onChange={(e) => setKey(e.target.value)} />
        <Input id="value" label="Value" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div style={{ display: 'flex' }}>
        <Button onClick={handleSaveValue}>Save Value</Button>
        <Button onClick={handleClearStorage}>Clear Storage</Button>
      </div>
      <div>
        {storage.entries().map(([k, v], i) => {
          return (
            <p key={i}>
              &quot;{k}&quot;: {JSON.stringify(v)}
            </p>
          );
        })}
      </div>
    </div>
  );
};

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return (
    <button {...props} style={{ width: '8rem', height: '3rem', margin: '1rem' }}>
      {children}
    </button>
  );
};

const Input: React.FC<InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }> = ({
  id,
  label,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '0.5rem' }}>
      <label htmlFor={id} style={{ margin: '0.2rem 0' }}>
        {label}
      </label>
      <input id={id} {...props} style={{ width: '12rem', height: '2rem', padding: '0 0.5rem' }} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <main>
      <StorageProvider>
        <Example />
      </StorageProvider>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
