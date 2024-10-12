import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProviderWithNavigate } from './context/AuthContext';
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.tsx";


const initializeGoogleAPI = () => {
  try {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', // Replace with your actual client ID
      }).then(() => {
        console.log('Google API initialized');
      }).catch((error) => {
        console.error('Error initializing Google API:', error);
      });
    });
  } catch (error) {
    console.error('Error loading Google API:', error);
  }
};

const Root = () => {
  useEffect(() => {
    initializeGoogleAPI();
  }, []);

  return (
    <ThemeProvider theme={theme}>
            <CssBaseline />
      <Router>
        <AuthProviderWithNavigate>
          <App />
        </AuthProviderWithNavigate>
      </Router>
    </ThemeProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

window.onload = () => {
  //localStorage.clear();
  sessionStorage.clear();
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
};
