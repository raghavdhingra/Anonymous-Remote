import { addUserEvent } from "./appwrite";
import {
  BUTTON_KEY,
  MOUSE_EVENT,
  BASE_PUBLISH_EVENT,
  PUBLISH_EVENT,
} from "./constant";

let isUpKey_down = false;
let isDownKey_down = false;
let isLeftKey_down = false;
let isRightKey_down = false;

const keyDownEventFunction = (e, MqttClient) => {
  if (e.key === "ArrowUp") {
    if (!isUpKey_down) {
      isUpKey_down = true;
      triggerCar(MqttClient, BUTTON_KEY.up, MOUSE_EVENT.down);
      addUserEvent("Up Arrow Press");
    }
  } else if (e.key === "ArrowLeft") {
    if (!isLeftKey_down) {
      isLeftKey_down = true;
      triggerCar(MqttClient, BUTTON_KEY.left, MOUSE_EVENT.down);
      addUserEvent("Left Arrow Press");
    }
  } else if (e.key === "ArrowRight") {
    if (!isRightKey_down) {
      isRightKey_down = true;
      triggerCar(MqttClient, BUTTON_KEY.right, MOUSE_EVENT.down);
      addUserEvent("Right Arrow Press");
    }
  } else if (e.key === "ArrowDown") {
    if (!isDownKey_down) {
      isDownKey_down = true;
      triggerCar(MqttClient, BUTTON_KEY.down, MOUSE_EVENT.down);
      addUserEvent("Down Arrow Press");
    }
  }
};

const keyUpEventFunction = (e, MqttClient) => {
  if (e.key === "ArrowUp") {
    isUpKey_down = false;
    triggerCar(MqttClient, BUTTON_KEY.up, MOUSE_EVENT.up);
    addUserEvent("Up Arrow Released");
  } else if (e.key === "ArrowLeft") {
    isLeftKey_down = false;
    triggerCar(MqttClient, BUTTON_KEY.left, MOUSE_EVENT.up);
    addUserEvent("Left Arrow Released");
  } else if (e.key === "ArrowRight") {
    isRightKey_down = false;
    triggerCar(MqttClient, BUTTON_KEY.right, MOUSE_EVENT.up);
    addUserEvent("Right Arrow Released");
  } else if (e.key === "ArrowDown") {
    isDownKey_down = false;
    triggerCar(MqttClient, BUTTON_KEY.down, MOUSE_EVENT.up);
    addUserEvent("Down Arrow Released");
  }
};

export const removeKeyboardListener = (setWarningMsg) => {
  setWarningMsg(
    "Keyboard is disengaged. You can not use the keyboard as a controller."
  );
  document.onkeydown = null;
  document.onkeyup = null;
};

export const addKeyboardListener = (MqttClient, setInfoMsg) => {
  setInfoMsg(
    "Keyboard is engaged. Now, you can control the car with the arrow keys."
  );
  document.onkeydown = (e) => keyDownEventFunction(e, MqttClient);
  document.onkeyup = (e) => keyUpEventFunction(e, MqttClient);
};

export const triggerCar = (MqttClient, buttonKey, mouseEvent) => {
  if (buttonKey === BUTTON_KEY.up) {
    if (mouseEvent === MOUSE_EVENT.up) {
      MqttClient.publish(`${BASE_PUBLISH_EVENT}${PUBLISH_EVENT.up}`, "0");
      addUserEvent("Up Arrow Released");
    } else if (mouseEvent === MOUSE_EVENT.down) {
      MqttClient.publish(`${BASE_PUBLISH_EVENT}${PUBLISH_EVENT.up}`, "1");
      addUserEvent("Up Arrow Press");
    }
  } else if (buttonKey === BUTTON_KEY.left) {
    if (mouseEvent === MOUSE_EVENT.up) {
      MqttClient.publish(`${BASE_PUBLISH_EVENT}${PUBLISH_EVENT.left}`, "0");
      addUserEvent("Left Arrow Released");
    } else if (mouseEvent === MOUSE_EVENT.down) {
      MqttClient.publish(`${BASE_PUBLISH_EVENT}${PUBLISH_EVENT.left}`, "1");
      addUserEvent("Left Arrow Press");
    }
  } else if (buttonKey === BUTTON_KEY.right) {
    if (mouseEvent === MOUSE_EVENT.up) {
      MqttClient.publish(`${BASE_PUBLISH_EVENT}${PUBLISH_EVENT.right}`, "0");
      addUserEvent("Right Arrow Released");
    } else if (mouseEvent === MOUSE_EVENT.down) {
      MqttClient.publish(`${BASE_PUBLISH_EVENT}${PUBLISH_EVENT.right}`, "1");
      addUserEvent("Right Arrow Press");
    }
  } else if (buttonKey === BUTTON_KEY.down) {
    if (mouseEvent === MOUSE_EVENT.up) {
      MqttClient.publish(`${BASE_PUBLISH_EVENT}${PUBLISH_EVENT.down}`, "0");
      addUserEvent("Down Arrow Released");
    } else if (mouseEvent === MOUSE_EVENT.down) {
      MqttClient.publish(`${BASE_PUBLISH_EVENT}${PUBLISH_EVENT.down}`, "1");
      addUserEvent("Down Arrow Press");
    }
  }
};
