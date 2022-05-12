import React from "react";
import { Route, Switch } from "react-router-dom";

import Auth from "./auth/auth";
import Alerts from "./alerts/alerts";
import Remote from "./remote/remote";

const Base = () => {
  return (
    <>
      <Alerts />
      <Switch>
        <Route path="/" exact component={Remote} />
        <Route path="/auth" exact component={Auth} />
        <Route path="">
          <h1>Page not Found</h1>
        </Route>
      </Switch>
    </>
  );
};

export default Base;
