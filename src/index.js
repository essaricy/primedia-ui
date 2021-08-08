import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import AppContainer from './app/components/App';
import theme from './app/config/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppContainer />
  </ThemeProvider>,
  document.querySelector('#root'),
);
