import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { LinearProgress } from '@mui/material';
import ApplicationViews from './Components/ApplicationViews';
import { onLoginStatusChange } from "./Modules/authManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  if (isLoggedIn === null) {
    return <LinearProgress />;
  }

  return (
    <Router>
      <ApplicationViews isLoggedIn={isLoggedIn}/>
    </Router>
  );
}

export default App;