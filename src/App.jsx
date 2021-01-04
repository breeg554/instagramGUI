import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Global } from "./common/GlobalStyles";
import { useLocation } from "react-router-dom";
import { userData } from "./state/user/operations";
import Route from "./Route";

const App = ({ userData, token }) => {
  let location = useLocation();

  useEffect(() => {
    if (location.pathname !== ("/login" || "/register")) userData();
  }, []);

  return (
    <>
      <Global />
      <Route />
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  userData: () => dispatch(userData()),
});
const mapStateToProps = (state) => ({
  token: state.user.token,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
