import React from "react";
import Home from "../pages/HomePage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicLayout from "../common/PublicLayout";

const Router = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route path="/login" render={() => <PublicLayout component={Login} />} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};

export default Router;
