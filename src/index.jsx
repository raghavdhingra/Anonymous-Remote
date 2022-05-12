import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

import Routes from "./components/routes";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
