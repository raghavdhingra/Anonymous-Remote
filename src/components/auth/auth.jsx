import React from "react";
import appwrite from "../../utility/appwrite";

const Auth = () => {
  console.log(appwrite.account.createSession());

  return (
    <div>
      <h1>Auth</h1>
    </div>
  );
};

export default Auth;
