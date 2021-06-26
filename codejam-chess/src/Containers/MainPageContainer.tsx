import React from "react";
import { connect } from "react-redux";
import { PlayerData } from "../components/Constants";
import MainPage from "../components/pages/Main/MainPage";
import {
  setActivePlayer,
  showPopap,
  hidePopap,
  startGame,
  increaseTime,
  setTimerFunc,
} from "../store/mainPage/actions";

export interface MainContainerProps {
  setActivePlayerFunc: (id: number) => void;
  showPopapFunc: () => void;
  startGameFunc: () => void;
  users: PlayerData[];
  increaseTimeFunc: () => void;
  setTimerFunction: (number: number) => void;
  gameStatus: boolean;
}

class MainContainer extends React.PureComponent<MainContainerProps> {
  render() {
    const {
      setActivePlayerFunc,
      showPopapFunc,
      startGameFunc,
      increaseTimeFunc,
      setTimerFunction,
      users,
      gameStatus,
    } = this.props;
    return (
      <MainPage
        setActivePlayer={setActivePlayerFunc}
        showPopap={showPopapFunc}
        usersData={users}
        startGame={startGameFunc}
        increaseTime={increaseTimeFunc}
        isGameActive={gameStatus}
        setTimerFunc={setTimerFunction}
      />
    );
  }
}

const pushStateToProps = (state: any) => ({
  users: state.mainPageReducer.players,
  gameStatus: state.mainPageReducer.game.isGameActive,
});

const mapDispatchToProps = {
  setActivePlayerFunc: setActivePlayer,
  showPopapFunc: showPopap,
  hidePopapFunc: hidePopap,
  startGameFunc: startGame,
  increaseTimeFunc: increaseTime,
  setTimerFunction: setTimerFunc
};

export default connect(pushStateToProps, mapDispatchToProps)(MainContainer);
