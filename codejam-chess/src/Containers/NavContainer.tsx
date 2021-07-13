import React from "react";
import { connect } from "react-redux";
import { PlayerData } from "../components/Constants";
import Nav from "../components/pages/Main/Nav/Nav";
import {
  setActivePlayer,
  showPopap,
  hidePopap,
  startGame,
  increaseTime,
  setTimerFunc,
  checkAndRandomizeColors,
  setStore,
} from "../store/mainPage/actions";

export interface NavContainerProps {
  setActivePlayerFunc: (id: number) => void;
  showPopapFunc: () => void;
  startGameFunc: (type: string, id: string) => void;
  users: PlayerData[];
  increaseTimeFunc: () => void;
  checkAndRandomizeColorsFunc: () => void;
  setTimerFunction: (number: number) => void;
  gameStatus: boolean;
  areRandomSidesEnabled: boolean;
  gameType: string;
  setStoreFunc: (store: unknown, roomId: string | number) => void;
}

class NavContainer extends React.PureComponent<NavContainerProps> {
  render() {
    const {
      startGameFunc,
      increaseTimeFunc,
      gameStatus,
      setTimerFunction,
      checkAndRandomizeColorsFunc,
      users,
      gameType,
      setStoreFunc,
      areRandomSidesEnabled,
    } = this.props;
    return (
      <Nav
        startGame={startGameFunc}
        increaseTime={increaseTimeFunc}
        isGameActive={gameStatus}
        setTimerFunc={setTimerFunction}
        checkAndRandomizeColors={checkAndRandomizeColorsFunc}
        players={users}
        gameType={gameType}
        setStore={setStoreFunc}
        areRandomSidesEnabled={areRandomSidesEnabled}
      />
    );
  }
}

const pushStateToProps = (state: any) => ({
  users: state.mainPageReducer.players,
  gameStatus: state.mainPageReducer.game.isGamePageActive,
  gameType: state.mainPageReducer.game.gameType,
  areRandomSidesEnabled: state.mainPageReducer.game.areRandomSidesEnabled,
});

const mapDispatchToProps = {
  setActivePlayerFunc: setActivePlayer,
  showPopapFunc: showPopap,
  hidePopapFunc: hidePopap,
  startGameFunc: startGame,
  increaseTimeFunc: increaseTime,
  setTimerFunction: setTimerFunc,
  checkAndRandomizeColorsFunc: checkAndRandomizeColors,
  setStoreFunc: setStore,
};

export default connect(pushStateToProps, mapDispatchToProps)(NavContainer);
