import React from "react";
import { useRecoilState } from "recoil";
import {
  credentialAtom,
  loadingState,
  loginState,
  successAlert,
} from "../../state/state";
import Button from "../button/button";
import "./navbar.scss";

const Navbar = ({ className }) => {
  const [credentials, setCredentials] = useRecoilState(credentialAtom);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [successMsg, setSuccessMsg] = useRecoilState(successAlert);

  const logoutSession = () => {
    if (isLoggedIn) {
      setCredentials({ email: "", name: "", password: "" });
      setIsLoading(false);
      setIsLoggedIn(false);
      if (successMsg === "Successfully Logged out") {
        setSuccessMsg("Successfully Logged out");
      }
    }
  };

  return (
    <div className={`navbar ${className || ""}`}>
      {isLoggedIn ? (
        <>
          <Button title="Home" className="not-center" variant="warning" />
          <div className="navbar__leftFlex">
            <span className="navbar__username">🏠 {credentials.name}</span>
            <Button
              title="Logout"
              onClick={logoutSession}
              isDisabled={isLoading}
              isLoading={isLoading}
              variant="danger"
            />
          </div>
        </>
      ) : (
        <h2 className="navbar__header">Anonymous Controller</h2>
      )}
    </div>
  );
};

export default Navbar;
