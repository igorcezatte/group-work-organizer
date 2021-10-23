import * as React from 'react';
import { AppProps } from 'next/app';
import { Provider as NextAuthProvider } from 'next-auth/client';
import {
  ThemeProvider,
  createTheme,
  ThemeOptions,
  CssBaseline,
} from '@mui/material';

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#001B2E',
    },
    secondary: {
      main: '#294C60',
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
    <NextAuthProvider session={pageProps.session}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
