import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { LinearProgress, ThemeProvider } from '@mui/material';
import ApplicationViews from './Components/ApplicationViews';
import NavBar from './Components/NavBar';
import { onLoginStatusChange } from "./Modules/authManager";
import { theme } from './Components/Theme';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  if (isLoggedIn === null) {
    return <LinearProgress />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar isLoggedIn={isLoggedIn}/>
        <ApplicationViews isLoggedIn={isLoggedIn}/>
      </Router>
    </ThemeProvider>
  );
}

export default App;