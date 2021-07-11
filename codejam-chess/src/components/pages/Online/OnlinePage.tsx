import { Link } from "react-router-dom";
import { AxiosResponse } from "axios";
import React from "react";
import { GameRoom } from "../../Constants";
import "./OnlinePage.sass";
import boardImage from "../../../img/chessboard.jpg";

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
  setStore: (data: unknown, id: string | number) => void;
  startGame: () => void;
  increaseTime: () => void;
  setSelectedPlayer: (id: number) => void;
  setWsConnection: (wsConnection: WebSocket) => void;
  isGameProcessActive: boolean;
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
    const url = `http://127.0.0.1:${port}/room`;
    axios({
      method: "put",
      url,
      mode: "cors",
    }).then(() => this.getNewRoomsData());
  };

  joinGame = (roomId: number | string) => {
    const { onlineName, startGame, setWsConnection } = this.props;
    const REACT_APP_WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || "";
    const wsConnection = new WebSocket(REACT_APP_WEBSOCKET_URL);
    setWsConnection(wsConnection);
    wsConnection.onopen = () => {
      const action = {
        event: "join-room",
        payload: {
          roomId,
          name: onlineName,
        },
      };
      wsConnection.send(JSON.stringify(action));
      console.log("%c Connected.", "color: #00FF00");
    };

    wsConnection.onmessage = (event) => {
      const { setStore, setSelectedPlayer, increaseTime } = this.props;
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
          case "start-game":
            {
              const url = `http://127.0.0.1:${port}/rooms?id=${roomId}`;
              axios({
                method: "get",
                url,
                mode: "cors",
              }).then((e: AxiosResponse) => {
                setStore(e.data, roomId);
                startGame();
              });
            }
            break;
          case "move-figure":
            {
              const url = `http://127.0.0.1:${port}/rooms?id=${roomId}`;
              axios({
                method: "get",
                url,
                mode: "cors",
              }).then((e: AxiosResponse) => {
                setStore(e.data, roomId);
              });
            }
            break;
          default:
            throw new Error("at the online page");
        }
      }
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
        throw new Error("while getting the axiosResponce at the online page");
      });
  };

  componentDidMount = () => {
    this.getNewRoomsData();
  };

  render() {
    const { data } = this.state;
    const cleanData = data?.filter((e) => {
      if (e.players !== undefined) {
        return Object.values(e.players).length !== 2 && e.game.isGameProcessActive === true;
      }
      return e.game.isGameProcessActive === true;
    });
    return (
      <section className='online-page'>
        {cleanData === null || cleanData === undefined ? (
          <div className='error'>Wait, while server is loading the info</div>
        ) : (
          <>
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
            <section className='interaction-menu'>
              <button type='button' className='interaction-menu__random-game'>
                Random game
              </button>
              <button type='button' className='interaction-menu__create-game' onClick={() => this.createRoom()}>
                Create game
              </button>
              <button type='button' className='interaction-menu__reload' onClick={() => this.getNewRoomsData()}>
                Refresh
              </button>
            </section>
          </>
        )}
      </section>
    );
  }
}
