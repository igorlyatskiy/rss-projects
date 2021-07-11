import { fireBaseConfig, TimerInfo } from './Constants';
import express from "express";
import WebSocket from "ws";
import http from 'http'
import firebase from "firebase/app";
import "firebase/database";
import { GameRoom } from '../codejam-chess/src/components/Constants';
const { v4: uuidv4 } = require('uuid');

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
  const timers: TimerInfo[] = [];
  ws.on('message', (data: string) => {
    const message = JSON.parse(data);
    switch (message.event) {
      case "join-room":
        const { roomId, name } = message.payload;
        const url = `rooms/`;
        db.ref(url).once('value', (item) => {
          const rooms = item.val();
          const activeRoom = Object.values(rooms).find((e: any) => e.id === roomId) as GameRoom;
          if (activeRoom !== undefined) {
            const players = activeRoom.players ? Object.values(activeRoom.players) : [];
            const MAX_PLAYERS_AT_ONE_ROOM = 2;
            let color = Math.random() - 0.5 > 0 ? 'w' : 'b';
            if (players.length + 1 === MAX_PLAYERS_AT_ONE_ROOM) {
              color = Object.values(activeRoom.players)[0].color === 'w' ? 'b' : 'w';
            }
            const playerId = players.length + 1
            db.ref(`${url}${roomId}/players`).push({
              id: playerId,
              name,
              color,
            });
            const selectPlayerMessage = {
              selectedPlayerId: playerId,
              event: 'set-selected-player',
              id: roomId
            }
            webSocketServer.clients.forEach((client) => {
              client.send(JSON.stringify(selectPlayerMessage));
            })
            if (players.length + 1 === MAX_PLAYERS_AT_ONE_ROOM) {
              const startGameMessage = {
                event: 'start-game',
                id: roomId,
              }
              webSocketServer.clients.forEach((client) => {
                client.send(JSON.stringify(startGameMessage))
              })
              const timerInterval = setInterval(() => {
                webSocketServer.clients.forEach((client) => client.send(JSON.stringify(timerMessage)))
              }, 1000)
              const activeTimeoutRoom = timers.find((e) => e.roomId === roomId);
              if (activeTimeoutRoom !== undefined) {
                clearInterval(activeTimeoutRoom.timerInterval)
              }
              timers.push({ roomId, timerInterval });
              const timerMessage = {
                event: 'timer',
                id: roomId,
              }
            }

          }
        })

        break;

      case 'move':
        const { to, from, time } = message.payload;
        const activeRoomId = message.payload.roomId;
        const moveAction = {
          event: 'move-figure',
          id: activeRoomId,
        }
        const ref = db.ref(`rooms/${activeRoomId}/game/history/${time}`);
        console.log(message.payload);
        ref.set({
          time,
          move: {
            from, to
          }
        }).then(() => {
          webSocketServer.clients.forEach((client) => {
            client.send(JSON.stringify(moveAction));
          })
        });
        break;

      case 'stop-timer':
        const selectedTimer = timers.find((e) => e.roomId === message.payload);
        if (selectedTimer) {
          clearInterval(selectedTimer?.timerInterval);
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
      const room = Object.values(item.val()).find((e: any) => e.id === id) || {};
      res.send(JSON.stringify(
        room,
      ))
    }
    if (JSON.stringify(req.query) === JSON.stringify({})) {
      res.send(JSON.stringify({
        rooms: item.val(),
      }))
    }
  })
});

app.put('/room', (req, res) => {
  const id = uuidv4()
  const ref = db.ref(`rooms/${id}`);
  const defaultState = {
    id,
    name: 'Game',
    players:
      [
      ],
    activePlayerId: 2,
    game: {
      history: [null],
      data: [[]],
      time: 0,
      isGameProcessActive: true,
      validMoves: [],
      areMarkersVisible: true,
      historyTime: [],
      areFieldMarkersVisible: true,
      kingPosition: '',
      checkSquares: [''],
      checkmateSquares: [''],
      areRandomSidesEnabled: true,
      AILevel: 1,
      gameType: 'Constants.AI_NAME',
      draw: false,
      winnerId: 0,
    },
  }
  ref.set({
    ...defaultState
  }).then(() => {
    res.send(JSON.stringify({ status: true }))
  })
})

app.post('/move', (req, res) => {
  const { from, to, id, time } = req.query;
  db.ref(`rooms/`).once('value', (item) => {
    if (from !== undefined && id !== undefined && to !== undefined && time !== undefined) {
      const ref = db.ref(`rooms/${id}/history/${time}`);
      ref.set({
        time,
        move: {
          from, to
        }
      }).then(() => res.send({ status: true }));
    }
  })
})


app.listen(SERVER_PORT, () => {
  console.log(`Main server is running on port ${SERVER_PORT}`)
});