import { Link } from "react-router-dom";
import { AxiosResponse } from "axios";
import React from "react";
import Constants, { GameRoom, HistoryAction, PreMove } from "../../Constants";
import "./OnlinePage.sass";
import boardImage from "../../../img/chessboard.jpg";
import NewChess from "../../../chess.js/chess";

require("dotenv").config();
const axios = require("axios");

interface RoomsData {
  rooms: GameRoom[];
}

interface OnlinePageState {
  data: GameRoom[] | null;
}

interface OnlinePageProps {
  onlineName: string;
  onlineImage: string;
  setStore: (data: unknown, id: string | number) => void;
  startGame: (type: string, id: string) => void;
  increaseTime: () => void;
  setSelectedPlayer: (id: number) => void;
  setWsConnection: (wsConnection: any) => void;
  isGameProcessActive: boolean;
  slowFigureMove: (data: unknown) => void;
  cleanSlowFigureMove: () => void;
  cleanField: () => void;
  chess: NewChess;
  premove: PreMove;
}

const port = process.env.REACT_APP_SERVER_PORT;

export default class OnlinePage extends React.Component<OnlinePageProps, OnlinePageState> {
  public request = null;
  public selectedPlayerExists = false;
  constructor(props: OnlinePageProps) {
    super(props);
    this.state = {
      data: null,
    };
  }

  createRoom = () => {
    const url = `${process.env.REACT_APP_FULL_SERVER_URL}/room?type=${Constants.PVP_ONLINE_NAME}`;
    axios({
      method: "put",
      url,
      mode: "cors",
      body: {},
    }).then(() => this.getNewRoomsData());
  };

  joinGame = (roomId: string) => {
    const { onlineName, onlineImage, startGame, setWsConnection, cleanField } = this.props;
    const REACT_APP_WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || "";
    const wsConnection = new WebSocket(REACT_APP_WEBSOCKET_URL);

    setWsConnection(wsConnection);
    wsConnection.onopen = () => {
      const action = {
        event: "join-room",
        payload: {
          roomId,
          name: onlineName,
          image: onlineImage,
        },
      };
      wsConnection.send(JSON.stringify(action));
      cleanField();
      console.log("%c Connected.", "color: #00FF00");
    };

    wsConnection.onmessage = async (event) => {
      const { setStore, setSelectedPlayer, increaseTime, chess } = this.props;
      const { slowFigureMove } = this.props;
      const message = JSON.parse(event.data);
      const { selectedPlayerId } = message;
      if (message.id === roomId) {
        switch (message.event) {
          case "set-selected-player":
            if (!this.selectedPlayerExists) {
              setSelectedPlayer(selectedPlayerId);
              this.selectedPlayerExists = true;
            }
            break;
          case "timer":
            increaseTime();
            break;
          case "give-headstart": {
            chess.chess.remove(message.square);
            break;
          }
          case "start-game":
            {
              const url = `http://127.0.0.1:${port}/rooms?id=${roomId}`;
              const responce = await axios({
                method: "get",
                url,
                mode: "cors",
              });
              setStore(responce.data, roomId);
              startGame(Constants.PVP_ONLINE_NAME, roomId);
            }
            break;
          case "move-figure": {
            const url = `http://127.0.0.1:${port}/rooms?id=${roomId}`;
            const roomInfo = await axios({
              method: "get",
              url,
              mode: "cors",
            });
            const { history } = roomInfo.data.game;
            const historyArray = Object.values(history);
            const lastMove = historyArray[historyArray.length - 1] as HistoryAction;
            setTimeout(() => {
              slowFigureMove(lastMove.move);
            }, Constants.FIGURE_WAITING_TIME);
            break;
          }

          case "finish-game": {
            const baseURL = process.env.REACT_APP_FULL_SERVER_URL;
            const getRoomUrl = `${baseURL}/rooms?id=${roomId}`;
            const roomInfo = await axios.get(getRoomUrl);
            setStore(roomInfo.data, roomId);
            wsConnection.close();
            break;
          }

          default:
            throw new Error("at the online page");
        }
      }
    };
  };

  getRooms = () => {
    const getGameRoomsUrl = `http://127.0.0.1:${port}/rooms`;
    return axios({
      method: "get",
      url: getGameRoomsUrl,
      mode: "cors",
    });
  };

  getNewRoomsData = () => {
    this.request = this.getRooms()
      .then((responce: AxiosResponse) => {
        this.request = null;
        const roomsData: RoomsData = responce.data;
        this.setState({ data: Object.values(roomsData.rooms) });
      })
      .catch(() => {
        alert("Somebody has broken the database! 😠\nGo to the main page and start any offline game!");
      });
  };

  findRandomGame = async () => {
    const responce = await this.getRooms();
    console.log(responce);
    if (responce.status === 200) {
      const roomsData: RoomsData = responce.data;
      const cleanData = Object.values(roomsData.rooms).filter((e) => {
        if (e.players !== undefined) {
          return (
            Object.values(e.players).length !== 2 &&
            e.game.isGameProcessActive === true &&
            e.game.gameType === Constants.PVP_ONLINE_NAME
          );
        }
        return e.game.isGameProcessActive === true && e.game.gameType === Constants.PVP_ONLINE_NAME;
      });
      let room: null | GameRoom = null;
      cleanData.forEach((e: GameRoom) => {
        if (e.players !== undefined && Object.values(e.players).length === 1) {
          room = e;
        }
      });
      if (room !== null) {
        const selectedRoom = room as GameRoom;
        this.joinGame(selectedRoom.id as string);
      } else {
        this.createRoom();
        const newResponce = await this.getRooms();
        if (newResponce.status === 200) {
          const newRoomsData: RoomsData = newResponce.data;
          const newCleanData = Object.values(newRoomsData.rooms).filter((e) => {
            if (e.players !== undefined) {
              return (
                Object.values(e.players).length !== 2 &&
                e.game.isGameProcessActive === true &&
                e.game.gameType === Constants.PVP_ONLINE_NAME
              );
            }
            return e.game.isGameProcessActive === true && e.game.gameType === Constants.PVP_ONLINE_NAME;
          });
          const newRoom = newCleanData[0];
          if (newRoom !== null) {
            this.joinGame(newRoom.id);
          }
        }
      }
    }
  };

  componentDidMount = () => {
    this.getNewRoomsData();
  };

  render() {
    const { data } = this.state;
    const cleanData = data?.filter((e) => {
      if (e.players !== undefined) {
        return (
          Object.values(e.players).length !== 2 &&
          e.game.isGameProcessActive === true &&
          e.game.gameType === Constants.PVP_ONLINE_NAME
        );
      }
      return e.game.isGameProcessActive === true && e.game.gameType === Constants.PVP_ONLINE_NAME;
    });
    return (
      <section className='online-page'>
        {cleanData === null || cleanData === undefined ? (
          <div className='error'>Wait, while server is loading the info</div>
        ) : (
          <>
            {cleanData.length !== 0 ? (
              <div className='cards'>
                {cleanData.map((e) => (
                  <div
                    className={`game-card ${e.players === undefined ? " game-card_empty" : ""} ${
                      e.players !== undefined && Object.values(e.players).length === 1 ? " game-card_waiting" : ""
                    }`}
                  >
                    <img src={boardImage} alt='Chess board' className='game-card__image' />
                    <p className='game-card__name'>{e.name}</p>
                    <Link to='/game' className='game-card__button' onClick={() => this.joinGame(e.id)}>
                      Join
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className='online-page__empty-message'>It&apos;s a little bit empty here... ☹</p>
            )}
          </>
        )}
        <section className='interaction-menu'>
          <button type='button' className='interaction-menu__random-game' onClick={() => this.findRandomGame()}>
            <Link to='/game' className='random-link' />
            Random game
          </button>
          <button type='button' className='interaction-menu__create-game' onClick={() => this.createRoom()}>
            Create game
          </button>
          <button type='button' className='interaction-menu__reload' onClick={() => this.getNewRoomsData()}>
            Refresh
          </button>
        </section>
      </section>
    );
  }
}
