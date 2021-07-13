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
});

const mapDispatchToProps = {
  breakGameFunc: breakGame,
  setWinnerFunc: setWinner,
  setStoreFunc: setStore,
};

export default connect(pushStateToProps, mapDispatchToProps)(HeaderContainer);
