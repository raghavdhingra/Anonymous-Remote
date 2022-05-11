import React from "react";
import { useRecoilState } from "recoil";

import {
  errorAlert,
  successAlert,
  warningAlert,
  infoAlert,
} from "../../state/state";
import Alert from "../../common/alert/alert";

const Alerts = () => {
  const [errorMsg, setErrorMsg] = useRecoilState(errorAlert);
  const [successMsg, setSuccessMsg] = useRecoilState(successAlert);
  const [infoMsg, setInfoMsg] = useRecoilState(infoAlert);
  const [warningMsg, setWarningMsg] = useRecoilState(warningAlert);

  const errorList = [
    { type: "error", title: errorMsg, handleDismiss: () => setErrorMsg("") },
    { type: "info", title: infoMsg, handleDismiss: () => setInfoMsg("") },
    {
      type: "warning",
      title: warningMsg,
      handleDismiss: () => setWarningMsg(""),
    },
    {
      type: "success",
      title: successMsg,
      handleDismiss: () => setSuccessMsg(""),
    },
  ];

  return (
    <div className="alert__container">
      {errorList.map((err) => (
        <Alert key={err.type} {...err} />
      ))}
    </div>
  );
};

export default Alerts;
