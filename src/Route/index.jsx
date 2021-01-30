import React from "react";
import { Switch, Route } from "react-router-dom";
import UserPage from "../pages/UserPage";
import Home from "../pages/HomePage";
import Chat from "../pages/ChatPage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import Error from "../pages/404";
import PrivateRoute from "./PrivateRoute";
import PublicLayout from "../components/PublicLayout";

const Router = () => {
  return (
    <Switch>
      <Route
        exact
        path="/login"
        render={() => <PublicLayout component={Login} />}
      />
      <Route
        exact
        path="/register"
        render={() => <PublicLayout component={Register} />}
      />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/direct/c/:chatID" component={Chat} />
      <PrivateRoute exact path="/:userID" component={UserPage} />
      <PrivateRoute component={Error} />
    </Switch>
  );
};

export default Router;
