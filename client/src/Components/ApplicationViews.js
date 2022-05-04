import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import CharacterList from "./Character/CharacterList";
import CharacterSheet from "./Character/CharacterSheet/CharacterSheet";
import CreateCharacter from "./Create/CreateCharacter";

export default function ApplicationViews({ isLoggedIn }) {
    return (
      <main>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <CharacterList /> : <Redirect to="/login" />}
          </Route>

          <Route path="/character/:id(\d)">
            {isLoggedIn ? <CharacterSheet /> : <Redirect to="/login" />}
          </Route>
          
          <Route path="/create/character">
            {isLoggedIn ? <CreateCharacter /> : <Redirect to="/login" />}
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