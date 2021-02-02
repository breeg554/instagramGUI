import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { userLogin } from "../../state/user/operations";
import Input from "../../components/Input";
import Button from "../../components/LoginButton";
import { SuccessMessage } from "./style";
import {
  Logo,
  Wrapper,
  Form,
  SideWrapper,
  ErrorMessage,
  BottomWrapper,
} from "../RegisterPage/style";

const displayError = (err) => {
  if (err && err.status === 400) {
    return <ErrorMessage>Błędne hasło!</ErrorMessage>;
  } else if (err && err.status === 404) {
    return <ErrorMessage>Nie ma takiego użytkownika!</ErrorMessage>;
  }
};

const Login = ({ userLogin }) => {
  const history = useHistory();

  const formRef = useRef();

  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isFormValidate, setIsFormValidate] = useState(false);
  const handleLoginData = (e) => {
    setIsFormValidate(formRef.current.checkValidity());
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    userLogin(loginData).then((res) => {
      if (res && res.error) {
        setError(res.error);
      }
    });
  };
  const displayRegisterSuccess = () => {
    if (
      history.location.state &&
      history.location.state.successLogin &&
      history.action === "PUSH"
    ) {
      return (
        <SuccessMessage>
          Rejestracja pomyślna, możesz się zalogować!
        </SuccessMessage>
      );
    }

    return null;
  };
  return (
    <Wrapper>
      <SideWrapper>
        <Logo>InstaApp</Logo>
        <Form ref={formRef} onSubmit={handleLogin}>
          <Input
            type="email"
            required={true}
            placeholder="Email"
            name="email"
            borderColor="#ccc"
            value={loginData.email}
            onChange={handleLoginData}
          />

          <Input
            type="password"
            required={true}
            placeholder="Hasło"
            name="password"
            borderColor="#ccc"
            value={loginData.password}
            onChange={handleLoginData}
          />
          {displayError(error)}
          <Button isLoading={loading} active={isFormValidate} type="submit">
            Zaloguj się
          </Button>
        </Form>
      </SideWrapper>

      <BottomWrapper>
        <p>Nie masz konta?</p>
        <Link to="/register">Zarejestruj się</Link>
      </BottomWrapper>
      {displayRegisterSuccess()}
    </Wrapper>
  );
};

const mapDispatchToProps = (dsipatch) => ({
  userLogin: (data) => dsipatch(userLogin(data)),
});

export default connect(null, mapDispatchToProps)(Login);
