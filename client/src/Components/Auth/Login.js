import React, { useState } from "react";
import { Grid, TextField, Button } from '@mui/material';
import { useHistory, Link } from "react-router-dom";
import { login } from "../../Modules/authManager";

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <form onSubmit={loginSubmit}>
      <fieldset>
        <Grid container alignItems="center" justify="center" direction="column" spacing={2}>
            <Grid item>
                <TextField id="email" name="email" label="Email" type="text" onChange={e => setEmail(e.target.value)}/>
            </Grid>
            <Grid item>
                <TextField id="password" name="password" label="Password" type="password" onChange={e => setPassword(e.target.value)} />
            </Grid>
            <Button variant="text" color="primary" type="submit">
                Login
            </Button>
        </Grid>
        <em>
          Not registered? <Link to="register">Register</Link>
        </em>
      </fieldset>
    </form>
  );
}