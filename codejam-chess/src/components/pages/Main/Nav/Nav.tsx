import React from "react";
import "./Nav.sass";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // Redirect,
  // useLocation,
} from "react-router-dom";
import Constants, { PlayerData } from "../../../Constants";

const axios = require("axios").default;
require("dotenv").config();

interface NavProps {
  startGame: (type: string, id: string) => void;
  increaseTime: () => void;
  checkAndRandomizeColors: () => void;
  isGameActive: boolean;
  areRandomSidesEnabled: boolean;
  setTimerFunc: (number: number) => void;
  players: PlayerData[];
  gameType: string;
  setStore: (store: unknown, roomId: string | number) => void;
}

export default class Nav extends React.PureComponent<NavProps> {
  startGameFunc = () => {
    const { setTimerFunc, increaseTime } = this.props;
    this.createGameRoom();
    const interval = window.setInterval(() => {
      increaseTime();
    }, 1000);
    setTimerFunc(interval);
  };

  createGameRoom = async () => {
    const { players, gameType, setStore, startGame } = this.props;
    const baseURL = process.env.REACT_APP_FULL_SERVER_URL;
    const url = `${baseURL}/room?type=${gameType}`;
    const responce = await axios({
      method: "put",
      url,
      data: {
        players: this.randomizeColors(players),
      },
    });
    if (responce.status === 200 && responce.data.status === true) {
      const id = responce.data.roomId;
      const roomUrl = `${baseURL}/rooms?id=${id}`;
      const roomInfo = await axios.get(roomUrl);
      if (roomInfo.status === 200) {
        setStore(roomInfo.data, id);
        if (gameType !== Constants.PVP_ONLINE_NAME) {
          startGame(gameType, id);
        }
      }
    }
  };

  randomizeColors = (players: PlayerData[]) => {
    const { areRandomSidesEnabled, gameType } = this.props;
    let newPlayers = [...players];
    if (areRandomSidesEnabled) {
      let firstPlayerColor: "w" | "b" = Math.random() - 0.5 > 0 ? "w" : "b";
      if (gameType === Constants.AI_NAME) {
        firstPlayerColor = "w";
      }
      const secondPlayerColor = firstPlayerColor === "w" ? "b" : "w";
      newPlayers = [
        {
          ...(players.find((e) => e.id === 1) as PlayerData),
          color: firstPlayerColor,
        },
        {
          ...(players.find((e) => e.id === 2) as PlayerData),
          color: secondPlayerColor,
          name: gameType === Constants.AI_NAME ? "AI bot" : (players.find((e) => e.id === 2)?.name as string),
        },
      ];
    }
    return newPlayers;
  };

  render() {
    return (
      <nav className='main-page__nav'>
        <Link to='/online'>
          <div className='main-page__nav__element main-page__online main-page__nav__element_active'>Online</div>
        </Link>
        <Link to='/game' onClick={this.startGameFunc}>
          <div className='main-page__nav__element main-page__start'>Start</div>
        </Link>
        <Link to='/settings'>
          <div className='main-page__settings'>Settings</div>
        </Link>
        <Link to='/replays'>
          <div className='main-page__nav__element main-page__nav__element_active main-page__replays'>View replays</div>
        </Link>
      </nav>
    );
  }
}
