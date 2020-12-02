import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ToastProvider } from './common/toast/context/ToastState';
import { AuthContextProvider } from './auth/context/AuthContext';
import config from 'react-global-configuration';

config.set({
  agUrl:'ir93n960fi.execute-api.us-east-2.amazonaws.com',
});

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
