import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Card from "../../common/card/card";
import {
  credentialAtom,
  errorAlert,
  infoAlert,
  loadingState,
  successAlert,
  loginState,
  warningAlert,
} from "../../state/state";
import Dashboard from "../../common/dashboard/dashboard";
import Header from "../../common/header/header";
import PointStatus from "../../common/pointStatus/pointStatus";
import RoundButton from "../../common/button/roundButton";
import Button from "../../common/button/button";
import {
  BASE_BROKER_URL,
  PORT_NUMBER,
  PROTOCOL_TYPE,
  BUTTON_KEY,
  MOUSE_EVENT,
} from "../../utility/constant";
import {
  addKeyboardListener,
  removeKeyboardListener,
  triggerCar,
} from "../../utility/function";
import { Navigate } from "react-router-dom";

let MqttClient = null;

const Remote = () => {
  const isLoggedIn = useRecoilValue(loginState);
  const credentials = useRecoilValue(credentialAtom);

  if (!isLoggedIn) {
    // return <Navigate to="/auth" />;
  }

  const [isConnected, setIsConnected] = useState(false);
  const [isKeyboardListener, setIsKeyboardListener] = useState(false);

  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const setErrorMsg = useSetRecoilState(errorAlert);
  const setSuccessMsg = useSetRecoilState(successAlert);
  const setWarningMsg = useSetRecoilState(warningAlert);
  const setInfoMsg = useSetRecoilState(infoAlert);

  const connectToMQTT = () => {
    setWarningMsg("Connecting to Car...");
    if (credentials.email && credentials.password && isLoggedIn) {
      setIsLoading(true);
      MqttClient = mqtt.connect(`${PROTOCOL_TYPE}://${BASE_BROKER_URL}`, {
        username: "raghavdhingra",
        password: "qwerty1234",
        protocol: PROTOCOL_TYPE,
        port: PORT_NUMBER,
      });

      MqttClient.on("connect", () => {
        setIsConnected(true);
        setIsLoading(false);
        setSuccessMsg("Connected to the Car");
      });

      MqttClient.on("error", () => {
        setIsConnected(false);
        setIsLoading(false);
        setErrorMsg("Disconnected from the Car");
      });
    } else {
      setIsConnected(false);
      setIsLoading(false);
      setSuccessMsg("Authentication Failed");
    }
  };

  const disconnectMQTT = () => {
    setIsConnected(false);
    MqttClient = null;
    setInfoMsg("Disconnected from the car");
  };

  useEffect(() => {
    if (isKeyboardListener) {
      addKeyboardListener(MqttClient, setInfoMsg);
    } else {
      removeKeyboardListener(setWarningMsg);
    }
    // eslint-disable-next-line
  }, [isKeyboardListener]);

  useEffect(() => {
    connectToMQTT();
    // eslint-disable-next-line
  }, []);

  return (
    <Dashboard>
      <Card isShadow variant="default">
        <Header>
          <PointStatus isConnected={isConnected} />{" "}
          {isConnected ? "Active" : "Inactive"}
        </Header>
      </Card>
      <Card isShadow variant="default">
        <Card variant="dark">
          <div className="dashboard__center-align">
            <RoundButton
              variant="danger"
              margin="auto"
              className="dashboard__btn-up"
              onMouseDown={() =>
                triggerCar(MqttClient, BUTTON_KEY.up, MOUSE_EVENT.down)
              }
              onMouseUp={() =>
                triggerCar(MqttClient, BUTTON_KEY.up, MOUSE_EVENT.up)
              }
            />
          </div>
          <div className="dashboard__card-grid-2 dashboard__center-align">
            <RoundButton
              variant="danger"
              className="dashboard__btn-left"
              onMouseDown={() =>
                triggerCar(MqttClient, BUTTON_KEY.left, MOUSE_EVENT.down)
              }
              onMouseUp={() =>
                triggerCar(MqttClient, BUTTON_KEY.left, MOUSE_EVENT.up)
              }
            />
            <RoundButton
              variant="danger"
              className="dashboard__btn-right"
              onMouseDown={() =>
                triggerCar(MqttClient, BUTTON_KEY.right, MOUSE_EVENT.down)
              }
              onMouseUp={() =>
                triggerCar(MqttClient, BUTTON_KEY.right, MOUSE_EVENT.up)
              }
            />
          </div>
          <div className="dashboard__center-align">
            <RoundButton
              variant="danger"
              margin="auto"
              className="dashboard__btn-down"
              onMouseDown={() =>
                triggerCar(MqttClient, BUTTON_KEY.down, MOUSE_EVENT.down)
              }
              onMouseUp={() =>
                triggerCar(MqttClient, BUTTON_KEY.down, MOUSE_EVENT.up)
              }
            />
          </div>
        </Card>
      </Card>
      <Card isShadow className="dashboard__flex">
        <Button
          variant="success"
          className="dashboard__mobile_disable"
          title={isKeyboardListener ? "Disengage Keyboard" : "Engage Keyboard"}
          onClick={() => setIsKeyboardListener(!isKeyboardListener)}
        />
        <Button
          variant="info"
          isDisabled={isLoading}
          isLoading={isLoading}
          title={isConnected ? "Disconnect" : "Connect"}
          onClick={isConnected ? disconnectMQTT : connectToMQTT}
        />
      </Card>
    </Dashboard>
  );
};

export default Remote;
