import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PrivateLayout from "../components/PrivateLayout";
const PrivateRoute = ({ component: Component, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <PrivateLayout {...props}>
            <Component />
          </PrivateLayout>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(PrivateRoute);
