import React from "react";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // Redirect,
  // useLocation,
} from "react-router-dom";
import "./Header.sass";
import axios from "axios";
import logo from "../../img/svg/logo.svg";
import Constants from "../Constants";

interface HeaderProps {
  time: number;
  selectedPlayerId: number;
  isGamePageActive: boolean;
  breakGame: () => void;
  setWinner: (id: number) => void;
  activePlayerId: number;
  isGameProcessActive: boolean;
  roomId: string;
  setStore: (store: unknown, roomId: string | number) => void;
  gameType: string;
  wsConnection: WebSocket;
}

class Header extends React.PureComponent<HeaderProps> {
  clickToMain = () => {
    const { breakGame, isGameProcessActive, gameType } = this.props;
    breakGame();
    if (isGameProcessActive && gameType === Constants.PVP_ONLINE_NAME) {
      this.admitLoss();
    }
    // else if (isGameProcessActive && gameType !== Constants.PVP_ONLINE_NAME) {
    //   const url = `${process.env.REACT_APP_FULL_SERVER_URL}/game/break?id=${roomId}`;
    //   axios.post(url);
    // }
    // else {
    //   const url = `${process.env.REACT_APP_FULL_SERVER_URL}/game/clean?id=${roomId}`;
    //   axios.post(url);
    // }
  };

  breakGameFunc = async () => {
    const { breakGame, roomId } = this.props;
    const url = `${process.env.REACT_APP_FULL_SERVER_URL}/game/break?id=${roomId}`;
    const breakGameResponce = await axios.post(url);
    if (breakGameResponce.status === 200) {
      breakGame();
    }
  };

  admitLoss = async () => {
    const { gameType, wsConnection, roomId, activePlayerId, setWinner, selectedPlayerId } = this.props;
    let winnerId = activePlayerId === 1 ? 2 : 1;
    if (gameType === Constants.AI_NAME) {
      winnerId = selectedPlayerId === 1 ? 2 : 1;
    }

    if (gameType === Constants.PVP_ONLINE_NAME) {
      const finishGame = {
        event: "finish-game",
        payload: {
          winnerId: selectedPlayerId === 1 ? 2 : 1,
          draw: false,
          roomId,
        },
      };
      wsConnection.send(JSON.stringify(finishGame));
    } else {
      const setWinnerUrl = `${process.env.REACT_APP_FULL_SERVER_URL}/room/winner?id=${roomId}&winnerId=${winnerId}`;
      const setWinnerResponce = await axios.post(setWinnerUrl);
      if (setWinnerResponce.status === 200) {
        setWinner(winnerId);
      }
    }
  };

  render() {
    const { time, isGamePageActive, isGameProcessActive } = this.props;
    const minutes = Math.floor(time / 60) >= 10 ? Math.floor(time / 60) : `0${Math.floor(time / 60)}`;
    const seconds = time % 60 >= 10 ? time % 60 : `0${time % 60}`;
    const isGameWinned = isGamePageActive && !isGameProcessActive;
    const isReplaysPage = window.location.href.includes("replays");
    return (
      <header className='header'>
        <Link to='/' onClick={() => this.clickToMain()}>
          <img src={logo} alt='Logo' className='header__logo' />
        </Link>
        <div className={isGameWinned ? "header__container header__container_align-center" : "header__container"}>
          {isGamePageActive && (
            <div className='header__round-time'>
              Round Time: <br />
              {minutes}:{seconds}
            </div>
          )}

          {isGameProcessActive && (
            <button type='button' className='header__admit-loss' onClick={this.admitLoss}>
              ADMIT LOSS
            </button>
          )}

          {isGameWinned ||
            (isReplaysPage && (
              <Link to='/' onClick={this.breakGameFunc}>
                <button type='button' className='header__lobby-btn'>
                  TO LOBBY
                </button>
              </Link>
            ))}

          {isGameWinned && (
            <button type='button' className='header__replay-btn'>
              REPLAY
            </button>
          )}
        </div>
      </header>
    );
  }
}

export default Header;
