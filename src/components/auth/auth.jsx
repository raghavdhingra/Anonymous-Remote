import React from "react";
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
import "./auth.scss";

const Login = () => {
  const [credentials, setCredentials] = useRecoilState(credentialAtom);

  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setErrorMsg = useSetRecoilState(errorAlert);
  const setSuccessMsg = useSetRecoilState(successAlert);
  const setWarningMsg = useSetRecoilState(warningAlert);

  const changeValue = (key, val) => {
    setCredentials({ ...credentials, [key]: val });
  };

  const establishConnection = () => {
    setIsLoading(true);
    setWarningMsg("Connection is Progress...");
  };

  return (
    <Dashboard>
      <Card variant="dark" isShadow>
        <Header>Login</Header>
        <div className="auth__horizontal-rule" />
        <div className="auth__body">
          <Input
            placeholder="Your Name"
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
