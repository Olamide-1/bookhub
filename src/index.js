import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import FetchProvider from './Context/FetchContext';
import BookProvider from './Context/BookContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { clientID } from './Routes/urls';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={clientID}>
    <BookProvider>
      <FetchProvider>
        <App />
      </FetchProvider>
    </BookProvider>
  </GoogleOAuthProvider>
);