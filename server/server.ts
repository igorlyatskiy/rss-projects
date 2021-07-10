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

// websocket part
const socketApp = express();
const WEBSOCKET_PORT = process.env.REACT_APP_WEBSOCKET_PORT || 5001;
socketApp.set('port', WEBSOCKET_PORT);
const server = http.createServer(socketApp);
const webSocketServer = new WebSocket.Server({ server, port: +WEBSOCKET_PORT }, () => console.log(`Websocket server started on port ${WEBSOCKET_PORT}`));

webSocketServer.on('connection', (ws: WebSocket) => {
  ws.on('message', (data: string) => {
    const message = JSON.parse(data);
    console.log(message);
    switch (message.event) {
      case "join-room":
        const { roomId, playersNumber } = message.payload;
        const url = `rooms/`;
        db.ref(url).once('value', (item) => {
          const rooms = item.val();
          const activeRoom = rooms.find((e: any) => e.id === roomId);
          if (activeRoom !== undefined) {
            const unicRoomId = rooms.indexOf(activeRoom);
            db.ref(`${url}${unicRoomId}`).update({
              playersNumber: playersNumber + 1
            });
          }
        })
        const MAX_PLAYERS_AT_ONE_ROOM = 2;
        if (playersNumber + 1 === MAX_PLAYERS_AT_ONE_ROOM) {
          const startGameMessage = {
            event: 'start-game',
            roomId
          }
          webSocketServer.clients.forEach((client) => {
            client.send(JSON.stringify(startGameMessage))
          })
        }
        break;

      default: ws.send((new Error("Wrong query")).message);
    }
  });

  ws.once("error", e => ws.send(e));
  ws.once('close', () => console.log('User has broken the network'));
});

// server part

const app = express();
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 5000;
app.set('port', SERVER_PORT);
app.use(cors());

app.get('/rooms', (req, res) => {
  const id = req.query.id;
  db.ref(`rooms/`).once('value', (item) => {
    if (id !== undefined) {
      const room = item.val().find((e: any) => e.id === id) || {};
      res.send(JSON.stringify({
        room,
      }))
    }
    if (JSON.stringify(req.query) === JSON.stringify({})) {
      res.send(JSON.stringify({
        rooms: item.val(),
      }))
    }
  })
});


app.put('/chess', (req, res) => {
  firebase.database().ref('rooms/').set({
    0: {

    },
    1: {

    }
  });
})


app.listen(SERVER_PORT, () => {
  console.log(`Main server is running on port ${SERVER_PORT}`)
});