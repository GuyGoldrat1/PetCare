// src/index.js or src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App.js';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your custom theme

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
