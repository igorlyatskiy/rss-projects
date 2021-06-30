import React from "react";

import { connect } from "react-redux";
import { HistoryElement, PlayerData } from "../components/Constants";
import PlayerView from "../components/pages/Game/PlayerView/PlayerView";

interface PlayerViewContainerProps {
  propsId: number;
  players: PlayerData[];
  propsHistory: HistoryElement[];
  winnerId: number;
  historyTime: number[];
  activePlayerId: number;
}

class PlayerViewContainer extends React.PureComponent<PlayerViewContainerProps> {
  render() {
    const { players, propsHistory, propsId, winnerId, activePlayerId, historyTime } = this.props;
    const player = players.find((e: PlayerData) => e.id === propsId);
    if (player === undefined || historyTime === undefined) {
      throw new Error("At the player view container");
    }
    return (
      <PlayerView
        player={player}
        history={propsHistory}
        winnerId={winnerId}
        activePlayerId={activePlayerId}
        historyTime={historyTime}
      />
    );
  }
}

const pushStateToProps = (state: any) => {
  const { mainPageReducer } = state;
  return {
    players: mainPageReducer.players,
    propsHistory: mainPageReducer.game.history,
    winnerId: mainPageReducer.winnerId,
    activePlayerId: mainPageReducer.activePlayerId,
    historyTime: mainPageReducer.game.historyTime,
  };
};

const mapDispatchToProps = {
  // setNameFunc: setPlayerName,
  // hidePopapFunc: hidePopap,
};

export default connect(pushStateToProps, mapDispatchToProps)(PlayerViewContainer);
