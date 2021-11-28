import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Authentication from './components/Authentication';
import { Container } from '@mui/material';

export default function App() {
  const [darkMode, setDarkMode] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(!false);


  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },

        components: {
          MuiInputBase: {
            styleOverrides: {
              input: {
                '&:-webkit-autofill': {
                  WebkitTextFillColor: '#000',
                  WebkitBoxShadow: '0 0 0px 1000px rgba(236, 236, 236, 1) inset !important',
                  transition: 'background-color 5000s ease-in-out 0s !important'
                },
              },
            },
          }

        },
      }),
    [darkMode],
  );


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar toggleTheme={setDarkMode} themeMode={darkMode} />
      <Container sx={{ mt: '10%' }}>
        {loggedIn ? <Home /> : <Authentication setLoggedIn={setLoggedIn} />}
      </Container>
    </ThemeProvider>
  );
}