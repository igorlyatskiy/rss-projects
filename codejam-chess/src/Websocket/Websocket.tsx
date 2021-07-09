require("dotenv").config();

const REACT_APP_WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || "";
export const wsConnection = new WebSocket(REACT_APP_WEBSOCKET_URL);

wsConnection.onopen = () => {
  console.log("%c Connected.", "color: #00FF00");
};

wsConnection.onclose = (event) => {
  if (event.wasClean) {
    console.log("Connection was closed sucsessfully");
  } else {
    console.log("Connection error", event);
  }
};

wsConnection.onerror = (e: any) => {
  console.log(e);
};

export const wsSend = (data: any) => {
  // readyState - true, если есть подключение
  if (!wsConnection.readyState) {
    setTimeout(() => {
      wsSend(data);
    }, 100);
  } else {
    wsConnection.send(data);
  }
};
