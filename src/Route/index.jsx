import React from "react";
import Desktop from "../pages/Desktop";
import Login from "../pages/Login";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
const Router = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Desktop} />
      <Route path="/login" component={Login} />
    </Switch>
  );
};

export default Router;
