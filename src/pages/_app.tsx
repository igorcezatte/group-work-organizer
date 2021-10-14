import * as React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import {
  ThemeProvider,
  createTheme,
  ThemeOptions,
  CssBaseline,
} from '@mui/material';

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#a15bd0',
    },
    secondary: {
      main: '#5bc5d0',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fafafa',
    },
  },
};

const theme = createTheme(themeOptions);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
