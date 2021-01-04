import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { userLogin } from "../../state/user/operations";

const Login = ({ userLogin }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleLoginData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    userLogin(loginData);
  };
  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        required={true}
        name="email"
        value={loginData.email}
        onChange={handleLoginData}
      />
      <input
        type="password"
        required={true}
        name="password"
        value={loginData.password}
        onChange={handleLoginData}
      />
      <button type="submit">Login</button>
    </form>
  );
};

const mapDispatchToProps = (dsipatch) => ({
  userLogin: (data) => dsipatch(userLogin(data)),
});

export default connect(null, mapDispatchToProps)(Login);
