import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { SocketContextProvider } from './context/SocketContext';
import { SettingsContextProvider } from './context/SettingsContext';
import { KeysContextProvider } from './context/KeysContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <KeysContextProvider>
          <SocketContextProvider>
            <SettingsContextProvider>
              <App />
            </SettingsContextProvider>
          </SocketContextProvider>
        </KeysContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);