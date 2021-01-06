import React from "react";
import { Switch, Route } from "react-router-dom";
import UserPage from "../pages/UserPage";
import Home from "../pages/HomePage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import PublicLayout from "../components/PublicLayout";

const Router = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/user/:userID" component={UserPage} />
      <Route path="/login" render={() => <PublicLayout component={Login} />} />
      <Route
        path="/register"
        render={() => <PublicLayout component={Register} />}
      />
    </Switch>
  );
};

export default Router;
