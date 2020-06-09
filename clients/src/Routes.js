import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./containers/Main"
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Team from "./containers/Team";
import Dex from "./containers/Dex";
import Inventory from "./containers/Inventory";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route path="/pokedex">
        <Dex />
      </Route>
      <Route path="/team">
        <Team />
      </Route>
      <Route path="/inventory">
        <Inventory />
      </Route>
      <Route>
        <NotFound />
    </Route>
    </Switch>
  );
}

