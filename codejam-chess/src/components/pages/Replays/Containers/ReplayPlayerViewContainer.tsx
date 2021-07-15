import React from "react";

import { connect } from "react-redux";
import { PlayerData, HistoryElement } from "../../../Constants";
import PlayerView from "../../Game/PlayerView/PlayerView";

interface PlayerViewContainerProps {
  propsColor: string;
  players: PlayerData[];
  propsHistory: HistoryElement[];
  winnerId: number;
  historyTime: number[];
  activePlayerId: number;
  draw: boolean;
  arePlayersColorsReversed: boolean;
}

class PlayerViewContainer extends React.PureComponent<PlayerViewContainerProps> {
  render() {
    const { players, propsHistory, propsColor, winnerId, activePlayerId, historyTime, draw, arePlayersColorsReversed } =
      this.props;
    const player = players.find((e: PlayerData) => e.color === propsColor);
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
        draw={draw}
        arePlayersColorsReversed={arePlayersColorsReversed}
      />
    );
  }
}

const pushStateToProps = (state: any) => {
  const { mainPageReducer } = state;
  return {
    players: mainPageReducer.players,
    propsHistory: mainPageReducer.replay.history,
    winnerId: mainPageReducer.game.winnerId,
    activePlayerId: mainPageReducer.replay.activePlayerId,
    historyTime: mainPageReducer.replay.historyTime,
    draw: mainPageReducer.game.draw,
    arePlayersColorsReversed: mainPageReducer.game.arePlayersColorsReversed,
  };
};

const mapDispatchToProps = {
  // setNameFunc: setPlayerName,
  // hidePopapFunc: hidePopap,
};

export default connect(pushStateToProps, mapDispatchToProps)(PlayerViewContainer);
