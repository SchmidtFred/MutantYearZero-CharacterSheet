import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

export default function ApplicationViews({ isLoggedIn }) {
    return (
      <main>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Login /> : <Redirect to="/login" />}
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </main>
    );
  }