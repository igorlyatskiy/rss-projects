import React from "react";
import { connect } from "react-redux";
import NewChess from "../chess.js/chess";
import { PlayerData, PreMove } from "../components/Constants";
import OnlinePage from "../components/pages/Online/OnlinePage";
import {
  cleanField,
  cleanSlowFigureMove,
  increaseTime,
  setSelectedPlayer,
  setStore,
  setWebsocketConnection,
  slowFigureMove,
  startGame,
} from "../store/mainPage/actions";

export interface OnlinePageContainerProps {
  name: string;
  image: string;
  setStoreFunc: (data: unknown, id: string | number) => void;
  startGameFunc: (type: string, id: string) => void;
  increaseTimeFunc: () => void;
  setSelectedPlayerFunc: (id: number) => void;
  setWebsocketConnectionFunc: (ws: WebSocket) => void;
  isGameProcessActive: boolean;
  slowFigureMoveFunc: (data: unknown) => void;
  cleanSlowFigureMoveFunc: () => void;
  cleanFieldFunc: () => void;
  chess: NewChess;
  premove: PreMove;
}

class OnlinePageContainer extends React.PureComponent<OnlinePageContainerProps> {
  render() {
    const {
      name,
      image,
      isGameProcessActive,
      setStoreFunc,
      startGameFunc,
      setSelectedPlayerFunc,
      setWebsocketConnectionFunc,
      increaseTimeFunc,
      slowFigureMoveFunc,
      cleanSlowFigureMoveFunc,
      cleanFieldFunc,
      chess,
      premove,
    } = this.props;
    return (
      <OnlinePage
        onlineName={name}
        setStore={setStoreFunc}
        startGame={startGameFunc}
        setSelectedPlayer={setSelectedPlayerFunc}
        setWsConnection={setWebsocketConnectionFunc}
        increaseTime={increaseTimeFunc}
        isGameProcessActive={isGameProcessActive}
        slowFigureMove={slowFigureMoveFunc}
        cleanSlowFigureMove={cleanSlowFigureMoveFunc}
        onlineImage={image}
        cleanField={cleanFieldFunc}
        chess={chess}
        premove={premove}
      />
    );
  }
}

const pushStateToProps = (state: any) => {
  const { mainPageReducer } = state;
  return {
    name: mainPageReducer.players.find((e: PlayerData) => e.id === 1).name,
    image: mainPageReducer.players.find((e: PlayerData) => e.id === 1).image,
    isGameProcessActive: mainPageReducer.game.isGameProcessActive,
    chess: mainPageReducer.game.chess,
    premove: mainPageReducer.game.preMove.move,
  };
};

const mapDispatchToProps = {
  setStoreFunc: setStore,
  startGameFunc: startGame,
  setSelectedPlayerFunc: setSelectedPlayer,
  setWebsocketConnectionFunc: setWebsocketConnection,
  increaseTimeFunc: increaseTime,
  slowFigureMoveFunc: slowFigureMove,
  cleanSlowFigureMoveFunc: cleanSlowFigureMove,
  cleanFieldFunc: cleanField,
};

export default connect(pushStateToProps, mapDispatchToProps)(OnlinePageContainer);
