import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header/Header";
import { breakGame, setStore, setWinner } from "../store/mainPage/actions";

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
      activePlayerId,
      isGameProcessActive,
      gameType,
      wsConnection,
      selectedPlayerId
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
});

const mapDispatchToProps = {
  breakGameFunc: breakGame,
  setWinnerFunc: setWinner,
  setStoreFunc: setStore,
};

export default connect(pushStateToProps, mapDispatchToProps)(HeaderContainer);
