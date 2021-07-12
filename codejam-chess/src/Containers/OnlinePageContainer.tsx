import React from "react";
import { connect } from "react-redux";
import OnlinePage from "../components/pages/Online/OnlinePage";
import {
  increaseTime,
  setSelectedPlayer,
  setStore,
  setWebsocketConnection,
  startGame,
} from "../store/mainPage/actions";

export interface OnlinePageContainerProps {
  name: string;
  setStoreFunc: (data: unknown, id: string | number) => void;
  startGameFunc: (type: string, id: string) => void;
  increaseTimeFunc: () => void;
  setSelectedPlayerFunc: (id: number) => void;
  setWebsocketConnectionFunc: (ws: WebSocket) => void;
  isGameProcessActive: boolean;
}

class OnlinePageContainer extends React.PureComponent<OnlinePageContainerProps> {
  render() {
    const {
      name,
      isGameProcessActive,
      setStoreFunc,
      startGameFunc,
      setSelectedPlayerFunc,
      setWebsocketConnectionFunc,
      increaseTimeFunc,
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
      />
    );
  }
}

const pushStateToProps = (state: any) => ({
  name: state.mainPageReducer.players.find((e: any) => e.id === 1).name,
  isGameProcessActive: state.mainPageReducer.game.isGameProcessActive,
});

const mapDispatchToProps = {
  setStoreFunc: setStore,
  startGameFunc: startGame,
  setSelectedPlayerFunc: setSelectedPlayer,
  setWebsocketConnectionFunc: setWebsocketConnection,
  increaseTimeFunc: increaseTime,
};

export default connect(pushStateToProps, mapDispatchToProps)(OnlinePageContainer);
