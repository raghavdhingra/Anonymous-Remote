import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Header from "../../common/header/header";
import Button from "../../common/button/button";
import Input from "../../common/input/input";
import Card from "../../common/card/card";
import Dashboard from "../../common/dashboard/dashboard";
import {
  credentialAtom,
  loginState,
  loadingState,
  errorAlert,
  successAlert,
  warningAlert,
} from "../../state/state";
import appwrite from "../../utility/appwrite";
import "./auth.scss";

const Login = () => {
  const history = useHistory();
  const [credentials, setCredentials] = useRecoilState(credentialAtom);

  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const setErrorMsg = useSetRecoilState(errorAlert);
  const setSuccessMsg = useSetRecoilState(successAlert);
  const setWarningMsg = useSetRecoilState(warningAlert);

  const changeValue = (key, val) => {
    setCredentials({ ...credentials, [key]: val });
  };

  const userLogin = (loginData) => {
    console.log(loginData);
    setIsLoggedIn(true);
    setSuccessMsg("Logging In...");
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn, history]);

  const establishConnection = () => {
    setIsLoading(true);
    setWarningMsg("Connection is Progress...");

    const { email, password, name } = credentials;
    localStorage.setItem("user", JSON.stringify({ email, name }));

    appwrite.account
      .create("unique()", email, password, name)
      .then((data) => userLogin(data))
      .catch((error) => {
        if (error.message === "Account already exists") {
          appwrite.account
            .createSession(email, password)
            .then((d) => userLogin(d))
            .catch(() => {
              setErrorMsg("Invalid Credentials.");
            });
        } else {
          setErrorMsg("Please wait for some time.");
        }
      });

    setIsLoading(false);
  };

  return (
    <Dashboard>
      <Card variant="dark" isShadow>
        <Header>Login/SignUp</Header>
        <div className="auth__horizontal-rule" />
        <div className="auth__body">
          <Input
            placeholder="Your Name (Optional)"
            type="text"
            isDisabled={isLoading}
            value={credentials.name}
            onChange={(e) => changeValue("name", e)}
          />
          <Input
            placeholder="Email ID"
            type="email"
            isDisabled={isLoading}
            margin="top"
            value={credentials.email}
            onChange={(e) => changeValue("email", e)}
          />
          <Input
            placeholder="Password"
            isDisabled={isLoading}
            type="password"
            value={credentials.password}
            margin="top"
            onChange={(e) => changeValue("password", e)}
          />
          <Button
            isDisabled={isLoading}
            isLoading={isLoading}
            title="Let's GO"
            margin="top"
            onClick={establishConnection}
          />
        </div>
      </Card>
    </Dashboard>
  );
};

export default Login;
