import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { userRegister } from "../../state/user/operations";

const Register = ({ userRegister }) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleRegisterData = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    userRegister(registerData);
  };
  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        required={true}
        name="name"
        value={registerData.name}
        onChange={handleRegisterData}
      />
      <input
        type="email"
        required={true}
        name="email"
        value={registerData.email}
        onChange={handleRegisterData}
      />
      <input
        type="password"
        required={true}
        name="password"
        value={registerData.password}
        onChange={handleRegisterData}
      />
      <button type="submit">Zarejestruj</button>
    </form>
  );
};

const mapDispatchToProps = (dsipatch) => ({
  userRegister: (data) => dsipatch(userRegister(data)),
});

export default connect(null, mapDispatchToProps)(Register);
