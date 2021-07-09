import { fireBaseConfig } from './Constants';
import express from "express";
import WebSocket from "ws";
import http from 'http'
import firebase from "firebase/app";
import "firebase/database";
require('dotenv').config()
const cors = require('cors')


firebase.initializeApp(fireBaseConfig);
const db = firebase.database();

const socketApp = express();
const WEBSOCKET_PORT = process.env.REACT_APP_WEBSOCKET_PORT || 5001;
socketApp.set('port', WEBSOCKET_PORT);
const server = http.createServer(socketApp);
const webSocketServer = new WebSocket.Server({ server, port: +WEBSOCKET_PORT }, () => console.log(`Websocket server started on port ${WEBSOCKET_PORT}`));

webSocketServer.on('connection', (ws: WebSocket) => {
  ws.on('message', (data: string) => {
    const message = JSON.parse(data);
    switch (message.event) {
      case "join-room":
        webSocketServer.clients.forEach(client => client.send(message))
        break;
      default: ws.send((new Error("Wrong query")).message);
    }
  });

  ws.on("error", e => ws.send(e));
  ws.on('close', () => console.log('User has broken the network'));
});

// server part

const app = express();
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 5000;
app.set('port', SERVER_PORT);
app.use(cors());

app.get('/', (req, res) => {
  res.send(`<h1>Hello</h1>`);
});

app.get('/rooms', (req, res) => {
  const id = req.query.id;
  db.ref(`rooms/`).on('value', (item) => {
    res.send(JSON.stringify({
      rooms: item.val(),
    }))
  })
});

app.get('/chess', (req, res) => {
  const id = req.query.id;
  db.ref(`rooms/${id}`).on('value', (item) => {
    res.send(JSON.stringify({
      userId: 2,
      userName: 'alex',
      roomId: 4382,
      query: req.query,
      value: item.val()
    }))
  });
}
)

app.put('/chess', (req, res) => {
  firebase.database().ref('rooms/').set({
    0: {

    },
    1: {

    }
  });
})

app.get('/socket', (req, res) => {
  res.send(JSON.stringify({
    userId: 2,
    userName: 'alex',
    roomId: 4382,
    query: req.query,
  }))
})

app.listen(SERVER_PORT, () => {
  console.log(`Main server is running on port ${SERVER_PORT}`)
});