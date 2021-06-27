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
import logo from "../../img/svg/logo.svg";

interface HeaderProps {
  time: number;
  isGamePageActive: boolean;
  breakGame: () => void;
  setWinner: (id: number) => void;
  activePlayerId: number;
  isGameProcessActive: boolean;
}

class Header extends React.PureComponent<HeaderProps> {
  breakGameFunc = () => {
    const { breakGame } = this.props;
    breakGame();
  };

  admitLoss = () => {
    const FIRST_PLAYER_ID = 1;
    const SECOND_PLAYER_ID = 2;
    const { setWinner, activePlayerId } = this.props;
    const winnerId =
      activePlayerId === FIRST_PLAYER_ID ? SECOND_PLAYER_ID : FIRST_PLAYER_ID;
    setWinner(winnerId);
  };

  render() {
    const { time, isGamePageActive, breakGame, isGameProcessActive } =
      this.props;
    const minutes =
      Math.floor(time / 60) >= 10
        ? Math.floor(time / 60)
        : `0${Math.floor(time / 60)}`;
    const seconds = time % 60 >= 10 ? time % 60 : `0${time % 60}`;
    const isGameWinned = isGamePageActive && !isGameProcessActive;
    return (
      <header className='header'>
        <Link to='/' onClick={breakGame}>
          <img src={logo} alt='Logo' className='header__logo' />
        </Link>
        <div
          className={
            isGameWinned
              ? "header__container header__container_align-center"
              : "header__container"
          }
        >
          {isGamePageActive && (
            <div className='header__round-time'>
              Round Time: <br />
              {minutes}:{seconds}
            </div>
          )}

          {isGameProcessActive && (
            <button
              type='button'
              className='header__admit-loss'
              onClick={this.admitLoss}
            >
              ADMIT LOSS
            </button>
          )}

          {isGameWinned && (
            <button type='button' className='header__lobby-btn'>
              TO LOBBY
            </button>
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
