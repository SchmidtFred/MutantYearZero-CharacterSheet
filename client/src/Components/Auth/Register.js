import React, { useState } from "react";
import { Grid, TextField, Button } from '@mui/material';
import { useHistory, Link } from "react-router-dom";
import { register } from "../../Modules/authManager";

export default function Register() {
  const history = useHistory();

  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match.");
    } else {
      const userProfile = { displayName, email };
      register(userProfile, password)
        .then(() => history.push("/"));
    }
 };

  return (
    <form onSubmit={registerClick}>
        <fieldset>
        <Grid container alignItems="center" justify="center" direction="column" spacing={2}>
            <Grid item>
                <TextField required={true} id="name" name="name" label="Display Name" type="text" onChange={e => setDisplayName(e.target.value)} />
            </Grid>
            <Grid item>
                <TextField required={true} id="email" name="email" label="Email" type="text" onChange={e => setEmail(e.target.value)} />
            </Grid>
            <Grid item>
                <TextField required={true} id="password" name="password" label="Password" type="password" onChange={e => setPassword(e.target.value)} />
            </Grid>
            <Grid item>
                <TextField required={true} id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password" onChange={e => setConfirmPassword(e.target.value)} />
            </Grid>
            <Button variant="text" color="primary" type="submit">
                Register
            </Button>
        </Grid>
        <em>
          Wrong Place? <Link to="login">Login</Link>
        </em>
      </fieldset>
    </form>
  );
}