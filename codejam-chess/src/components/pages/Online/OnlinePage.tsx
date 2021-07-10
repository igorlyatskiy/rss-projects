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

interface OnlinePageProps {}

let wsConnection: WebSocket;

export default class OnlinePage extends React.Component<OnlinePageProps, OnlinePageState> {
  public request = null;
  constructor(props: OnlinePageProps) {
    super(props);
    this.state = {
      data: null,
    };
  }

  joinGame = (roomId: number, playersNumber: number) => {
    const REACT_APP_WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || "";
    wsConnection = new WebSocket(REACT_APP_WEBSOCKET_URL);
    wsConnection.onopen = () => {
      const action = {
        event: "join-room",
        payload: {
          roomId,
          playersNumber,
        },
      };
      wsConnection.send(JSON.stringify(action));
      console.log("%c Connected.", "color: #00FF00");
    };

    wsConnection.onmessage = (event) => {
      const message = event;
      console.log(JSON.parse(message.data));
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
    const port = process.env.REACT_APP_SERVER_PORT;
    const getGameRoomsUrl = `http://127.0.0.1:${port}/rooms`;
    return axios({
      method: "get",
      url: getGameRoomsUrl,
      mode: "cors",
    });
  };

  componentDidMount = () => {
    this.request = this.getRooms()
      .then((responce: AxiosResponse) => {
        this.request = null;
        const roomsData: RoomsData = responce.data;
        this.setState({ data: roomsData.rooms });
      })
      .catch(() => {
        throw new Error("while getting the axiosResponce at the online page");
      });
  };

  render() {
    const { data } = this.state;
    const cleanData = data?.filter((e) => e.isGameActive === true && e.playersNumber !== 2);
    return (
      <section className='online-page'>
        {cleanData === null || cleanData === undefined ? (
          <div className='error'>Wait, while server is loading the info</div>
        ) : (
          <>
            <div className='cards'>
              {cleanData.map((e) => (
                <div className='game-card'>
                  <img src={boardImage} alt='Chess board' className='game-card__image' />
                  <p className='game-card__name'>{e.name}</p>
                  <button
                    type='button'
                    className='game-card__button'
                    onClick={() => this.joinGame(e.id, e.playersNumber)}
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
            <section className='interaction-menu'>
              <button type='button' className='interaction-menu__random-game'>
                Random game
              </button>
              <button type='button' className='interaction-menu__create-game'>
                Create game
              </button>
            </section>
          </>
        )}
      </section>
    );
  }
}
