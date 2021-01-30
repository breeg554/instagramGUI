import React, { useState, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { userRegister } from "../../state/user/operations";
import Input from "../../components/Input";
import Button from "../../components/LoginButton";
import {
  SubText,
  Logo,
  Wrapper,
  Form,
  SideWrapper,
  ErrorMessage,
  BottomWrapper,
} from "./style";

const displayError = (err, part) => {
  if (err && err.message === "This email is already used" && part === "EMAIL") {
    return <ErrorMessage>Ten email jest już używany!</ErrorMessage>;
  } else if (
    err &&
    err.message === "This name is already used" &&
    part === "NAME"
  ) {
    return <ErrorMessage>Ta nazwa użytkownika jest już używana!</ErrorMessage>;
  } else if (
    err &&
    err.message === "Password too short, minimum 5 characters!" &&
    part === "PASSWORD"
  ) {
    return <ErrorMessage>Zbyt krótkie hasło, minimum 5 znaków!</ErrorMessage>;
  }
};

const Register = ({ userRegister }) => {
  const formRef = useRef();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFormValidate, setIsFormValidate] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleRegisterData = (e) => {
    setIsFormValidate(formRef.current.checkValidity());
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    userRegister(registerData)
      .then((res) => {
        if (res.error) throw res;
        setLoading(false);
        history.push({ pathname: "/login", state: { successLogin: true } });
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        if (err.error && err.error.status === 422) {
          setError(err.error);
        }
      });
  };
  return (
    <Wrapper>
      <SideWrapper>
        <Logo>InstaApp</Logo>
        <SubText>Zarejestruj się, aby przeglądać zdjęcia znajomych.</SubText>
        <Form ref={formRef} onSubmit={handleRegister}>
          <Input
            maxlength={10}
            required={true}
            placeholder="Nazwa użytkownika"
            name="name"
            value={registerData.name}
            borderColor="#ccc"
            onChange={handleRegisterData}
          />
          {displayError(error, "NAME")}
          <Input
            type="email"
            required={true}
            placeholder="Email"
            name="email"
            borderColor="#ccc"
            value={registerData.email}
            onChange={handleRegisterData}
          />
          {displayError(error, "EMAIL")}
          <Input
            type="password"
            required={true}
            placeholder="Hasło"
            name="password"
            borderColor="#ccc"
            value={registerData.password}
            onChange={handleRegisterData}
          />
          {displayError(error, "PASSWORD")}
          <Button isLoading={loading} active={isFormValidate} type="submit">
            Zarejestruj
          </Button>
        </Form>
      </SideWrapper>
      <BottomWrapper>
        <p>Masz już konto?</p>
        <Link to="/login">Zaloguj się</Link>
      </BottomWrapper>
    </Wrapper>
  );
};

const mapDispatchToProps = (dsipatch) => ({
  userRegister: (data) => dsipatch(userRegister(data)),
});

export default connect(null, mapDispatchToProps)(Register);
