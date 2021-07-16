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
import Constants, { PlayerData } from "../Constants";
import winnerIcon from "../../img/winner_icon.png";

interface HeaderProps {
  time: number;
  selectedPlayerId: number;
  isGamePageActive: boolean;
  breakGame: () => void;
  changeActivePage: (page: string) => void;
  setWinner: (id: number) => void;
  activePlayerId: number;
  isGameProcessActive: boolean;
  roomId: string;
  setStore: (store: unknown, roomId: string | number) => void;
  gameType: string;
  wsConnection: WebSocket;
  activePage: string;
  players: PlayerData[];
  speed: number;
  replayWinnerId: number;
  changeReplaySpeed: (speed: number) => void;
}

class Header extends React.PureComponent<HeaderProps> {
  clickToMain = () => {
    const { breakGame, isGameProcessActive, changeActivePage, gameType } = this.props;
    breakGame();
    changeActivePage(Constants.APP_PAGES.MAIN);
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
    const { breakGame, roomId, changeActivePage } = this.props;
    changeActivePage(Constants.APP_PAGES.MAIN);
    if (roomId !== undefined) {
      const url = `${process.env.REACT_APP_FULL_SERVER_URL}/game/break?id=${roomId}`;
      const breakGameResponce = await axios.post(url);
      if (breakGameResponce.status === 200) {
        breakGame();
      }
    } else {
      breakGame();
    }
  };

  admitLoss = async () => {
    const { changeActivePage, gameType, wsConnection, roomId, activePlayerId, setWinner, selectedPlayerId } =
      this.props;
    let winnerId = activePlayerId === 1 ? 2 : 1;
    if (gameType === Constants.AI_NAME) {
      winnerId = selectedPlayerId === 1 ? 2 : 1;
    }

    changeActivePage(Constants.APP_PAGES.MAIN);
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
      console.log(roomId);
      const setWinnerUrl = `${process.env.REACT_APP_FULL_SERVER_URL}/room/winner?id=${roomId}&winnerId=${winnerId}`;
      const setWinnerResponce = await axios.post(setWinnerUrl);
      if (setWinnerResponce.status === 200) {
        setWinner(winnerId);
      }
    }
  };

  render() {
    const {
      time,
      isGamePageActive,
      isGameProcessActive,
      activePage,
      changeActivePage,
      players,
      speed,
      replayWinnerId,
      changeReplaySpeed,
    } = this.props;
    const minutes = Math.floor(time / 60) >= 10 ? Math.floor(time / 60) : `0${Math.floor(time / 60)}`;
    const seconds = time % 60 >= 10 ? time % 60 : `0${time % 60}`;
    const isGameWinned = isGamePageActive && !isGameProcessActive;
    const isReplaysPage = activePage === Constants.APP_PAGES.ALL_REPLAYS;
    const isTimerVisible = (isGamePageActive && !isReplaysPage) || activePage === Constants.APP_PAGES.REPLAY;
    return (
      <header className='header'>
        <Link to='/' onClick={() => this.clickToMain()}>
          <img src={logo} alt='Logo' className='header__logo' />
        </Link>
        <div
          className={
            isGameWinned || activePage === Constants.APP_PAGES.REPLAY
              ? "header__container header__container_align-center"
              : "header__container"
          }
        >
          {isTimerVisible && (
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

          {(isGameWinned || activePage === Constants.APP_PAGES.REPLAY || isReplaysPage) && (
            <button type='button' className='header__lobby-btn'>
              <Link to='/' onClick={this.breakGameFunc} className='header__lobby-btn-link' />
              TO LOBBY
            </button>
          )}

          {isGameWinned && !isReplaysPage && activePage !== Constants.APP_PAGES.REPLAY && (
            <Link to='/replays' onClick={() => changeActivePage(Constants.APP_PAGES.ALL_REPLAYS)}>
              <button type='button' className='header__replay-btn'>
                REPLAY
              </button>
            </Link>
          )}
          {Constants.APP_PAGES.REPLAY === activePage && (
            <div className='header__back-to-replays-btn'>
              <Link
                to='/replays'
                onClick={() => changeActivePage(Constants.APP_PAGES.ALL_REPLAYS)}
                className='header__back-to-replays-btn__link'
              />
              <div
                className={`header__player-block header__player-block_1 ${
                  replayWinnerId === 1 ? " header__player-block_winner" : ""
                }`}
              >
                <p className='header__player-name'>{String(players.find((e) => e.id === 1)?.name)[0].toUpperCase()}</p>
                <img src={winnerIcon} alt='Winner' className='header__winner-image' />
              </div>
              <p className='header__back-to-replays-text'>Select replay</p>
              <div
                className={`header__player-block header__player-block_2  ${
                  replayWinnerId === 2 ? " header__player-block_winner" : ""
                }`}
              >
                <p className='header__player-name'>{String(players.find((e) => e.id === 2)?.name)[0].toUpperCase()}</p>
                <img src={winnerIcon} alt='Winner' className='header__winner-image' />
              </div>
              <div className='header__replay-speed'>
                {[1, 2, 3, 4].map((e) => (
                  <div
                    className={`header__replay-speed-item ${speed === e ? " header__replay-speed-item_active" : ""}`}
                    onClick={() => {
                      changeReplaySpeed(e);
                    }}
                    role='presentation'
                  >
                    x{e}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }
}

export default Header;
