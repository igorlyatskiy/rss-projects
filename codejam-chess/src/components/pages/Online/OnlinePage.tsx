import { Link } from "react-router-dom";
import { AxiosResponse } from "axios";
import React from "react";
import Constants, { GameRoom, HistoryAction } from "../../Constants";
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
  onlineImage: string;
  setStore: (data: unknown, id: string | number) => void;
  startGame: (type: string, id: string) => void;
  increaseTime: () => void;
  setSelectedPlayer: (id: number) => void;
  setWsConnection: (wsConnection: WebSocket) => void;
  isGameProcessActive: boolean;
  slowFigureMove: (data: unknown) => void;
  cleanSlowFigureMove: () => void;
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
    const { onlineName, onlineImage, startGame, setWsConnection } = this.props;
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
      console.log("%c Connected.", "color: #00FF00");
    };

    wsConnection.onmessage = async (event) => {
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
              const responce = await axios({
                method: "get",
                url,
                mode: "cors",
              });
              setStore(responce.data, roomId);
              startGame(Constants.PVP_ONLINE_NAME, roomId);
            }
            break;
          case "move-figure":
            {
              const { slowFigureMove } = this.props;
              const url = `http://127.0.0.1:${port}/rooms?id=${roomId}`;
              const roomInfo = await axios({
                method: "get",
                url,
                mode: "cors",
              });
              console.log(roomInfo.data);
              const { history } = roomInfo.data.game;
              const historyArray = Object.values(history);
              const lastMove = historyArray[historyArray.length - 1] as HistoryAction;
              setTimeout(() => {
                slowFigureMove(lastMove.move);
                // setStore(roomInfo.data, roomId);
              }, Constants.FIGURE_WAITING_TIME);
            }
            break;

          case "finish-game": {
            const baseURL = process.env.REACT_APP_FULL_SERVER_URL;
            const getRoomUrl = `${baseURL}/rooms?id=${roomId}`;
            const roomInfo = await axios.get(getRoomUrl);
            setStore(roomInfo.data, roomId);
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
          </>
        )}
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
      </section>
    );
  }
}
