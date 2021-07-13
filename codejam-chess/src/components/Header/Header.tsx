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

interface HeaderProps {
  time: number;
  isGamePageActive: boolean;
  breakGame: () => void;
  setWinner: (id: number) => void;
  activePlayerId: number;
  isGameProcessActive: boolean;
  roomId: string;
  setStore: (store: unknown, roomId: string | number) => void;
}

class Header extends React.PureComponent<HeaderProps> {
  breakGameFunc = async () => {
    const { breakGame, roomId } = this.props;
    const url = `${process.env.REACT_APP_FULL_SERVER_URL}/game/break?id=${roomId}`;
    const breakGameResponce = await axios.post(url);
    console.log("break");
    if (breakGameResponce.status === 200) {
      breakGame();
    }
  };

  admitLoss = async () => {
    const { roomId, activePlayerId, setWinner } = this.props;
    const winnerId = activePlayerId === 1 ? 2 : 1;
    const setWinnerUrl = `${process.env.REACT_APP_FULL_SERVER_URL}/room/winner?id=${roomId}&winnerId=${winnerId}`;
    const setWinnerResponce = await axios.post(setWinnerUrl);
    if (setWinnerResponce.status === 200) {
      setWinner(winnerId);
    }
  };

  render() {
    const { time, isGamePageActive, breakGame, isGameProcessActive } = this.props;
    const minutes = Math.floor(time / 60) >= 10 ? Math.floor(time / 60) : `0${Math.floor(time / 60)}`;
    const seconds = time % 60 >= 10 ? time % 60 : `0${time % 60}`;
    const isGameWinned = isGamePageActive && !isGameProcessActive;
    return (
      <header className='header'>
        <Link to='/' onClick={breakGame}>
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

          {isGameWinned && (
            <Link to='/' onClick={this.breakGameFunc}>
              <button type='button' className='header__lobby-btn'>
                TO LOBBY
              </button>
            </Link>
          )}

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
