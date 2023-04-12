import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FetchProvider from './Context/FetchContext';
import BookProvider from './Context/BookContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { clientID } from './Routes/urls';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientID}>
      <BookProvider>
        <FetchProvider>
          <App />
        </FetchProvider>
      </BookProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
