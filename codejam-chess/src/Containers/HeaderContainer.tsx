import React from "react";
import { connect } from "react-redux";
import { PlayerData } from "../components/Constants";
import Header from "../components/Header/Header";
import { breakGame, changeReplaySpeed, setPage, setStore, setWinner } from "../store/mainPage/actions";

export interface MainContainerProps {
  time: number;
  gameStatus: boolean;
  breakGameFunc: () => void;
  setWinnerFunc: (id: number) => void;
  activePlayerId: number;
  isGameProcessActive: boolean;
  roomId: string;
  setStoreFunc: (store: unknown, roomId: string | number) => void;
  gameType: string;
  wsConnection: WebSocket;
  selectedPlayerId: number;
  activePage: string;
  changeActivePageFunc: (page: string) => void;
  players: PlayerData[];
  speed: number;
  changeReplaySpeedFunc: (speed: number) => void;
  replayWinnerId: number;
}

class HeaderContainer extends React.PureComponent<MainContainerProps> {
  render() {
    const {
      time,
      setStoreFunc,
      roomId,
      gameStatus,
      breakGameFunc,
      setWinnerFunc,
      changeActivePageFunc,
      activePlayerId,
      isGameProcessActive,
      gameType,
      wsConnection,
      activePage,
      selectedPlayerId,
      players,
      speed,
      changeReplaySpeedFunc,
      replayWinnerId,
    } = this.props;
    return (
      <Header
        time={time}
        isGamePageActive={gameStatus}
        breakGame={breakGameFunc}
        setWinner={setWinnerFunc}
        activePlayerId={activePlayerId}
        isGameProcessActive={isGameProcessActive}
        roomId={roomId}
        setStore={setStoreFunc}
        gameType={gameType}
        wsConnection={wsConnection}
        selectedPlayerId={selectedPlayerId}
        activePage={activePage}
        changeActivePage={changeActivePageFunc}
        players={players}
        speed={speed}
        changeReplaySpeed={changeReplaySpeedFunc}
        replayWinnerId={replayWinnerId}
      />
    );
  }
}

const pushStateToProps = (state: any) => ({
  time: state.mainPageReducer.game.time,
  gameStatus: state.mainPageReducer.game.isGamePageActive,
  activePlayerId: state.mainPageReducer.activePlayerId,
  isGameProcessActive: state.mainPageReducer.game.isGameProcessActive,
  roomId: state.mainPageReducer.game.roomId,
  gameType: state.mainPageReducer.game.gameType,
  wsConnection: state.mainPageReducer.game.wsConnection,
  selectedPlayerId: state.mainPageReducer.game.selectedPlayerId,
  activePage: state.mainPageReducer.gamePage,
  players: state.mainPageReducer.players,
  speed: state.mainPageReducer.replay.speed,
  replayWinnerId: state.mainPageReducer.replay.winnerId,
});

const mapDispatchToProps = {
  breakGameFunc: breakGame,
  setWinnerFunc: setWinner,
  setStoreFunc: setStore,
  changeActivePageFunc: setPage,
  changeReplaySpeedFunc: changeReplaySpeed,
};

export default connect(pushStateToProps, mapDispatchToProps)(HeaderContainer);
