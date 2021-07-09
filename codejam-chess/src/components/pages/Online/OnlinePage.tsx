import { AxiosResponse } from "axios";
import React from "react";
import { GameRoom } from "../../Constants";
import "./OnlinePage.sass";
import boardImage from "../../../img/chessboard.jpg";
import { wsConnection } from "../../../Websocket/Websocket";

require("dotenv").config();
const axios = require("axios");

interface RoomsData {
  rooms: GameRoom[];
}

interface OnlinePageState {
  data: GameRoom[] | null;
}

interface OnlinePageProps {}

export default class OnlinePage extends React.Component<OnlinePageProps, OnlinePageState> {
  public request = null;
  constructor(props: OnlinePageProps) {
    super(props);
    this.state = {
      data: null,
    };
  }

  joinGame = (roomId: number) => {
    console.log(roomId);
    wsConnection.send(JSON.stringify({ event: "join-room", payload: { id: roomId } }));
  };

  getRooms = () => {
    const port = process.env.REACT_APP_SERVER_PORT;
    const getGameRoomsUrl = `http://127.0.0.1:${port}/rooms`;
    console.log(getGameRoomsUrl);
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
        console.log(roomsData);
        this.setState({ data: roomsData.rooms });
      })
      .catch(() => {
        throw new Error("while getting the axiosResponce at the online page");
      });
  };

  render() {
    const { data } = this.state;
    const cleanData = data?.filter((e) => e.status !== "finished" && e.status !== "game");
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
                  <div className='game-card__status'>
                    {" "}
                    <b>Status:</b> {e.status}
                  </div>
                  <button type='button' className='game-card__button' onClick={() => this.joinGame(e.id)}>
                    Join
                  </button>
                </div>
              ))}
            </div>
            <div className='random-game'>
              <h3 className='random-game__heading'>Click, if you want to play a random game</h3>
            </div>
          </>
        )}
      </section>
    );
  }
}
