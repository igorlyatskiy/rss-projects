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
  setTimerFunc: (number: number) => void;
  players: PlayerData[];
  gameType: string;
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
    const { startGame, players, checkAndRandomizeColors, gameType } = this.props;
    const baseURL = process.env.REACT_APP_FULL_SERVER_URL;
    const url = `${baseURL}/room?type=${gameType}`;
    checkAndRandomizeColors();
    const responce = await axios({
      method: "put",
      url,
      data: {
        players,
      },
    });
    if (responce.status === 200 && responce.data.status === true) {
      const id = responce.data.roomId;
      startGame(Constants.PVP_OFFLINE_NAME, id);
    }
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
          <div className='main-page__nav__element main-page__replays'>View replays</div>
        </Link>
      </nav>
    );
  }
}
