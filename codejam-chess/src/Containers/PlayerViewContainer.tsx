import React from "react";

import { connect } from "react-redux";
import { PlayerData } from "../components/Constants";
import PlayerView from "../components/pages/Game/PlayerView/PlayerView";

interface PlayerViewContainerProps {
  propsId: number;
  players: PlayerData[];
  propsHistory: string[];
  winnerId: number;
  activePlayerId: number;
}

class PlayerViewContainer extends React.PureComponent<PlayerViewContainerProps> {
  render() {
    const { players, propsHistory, propsId, winnerId, activePlayerId } =
      this.props;
    const player = players.find((e: PlayerData) => e.id === propsId);
    if (player === undefined) {
      throw new Error("At the player view container");
    }
    return (
      <PlayerView player={player} history={propsHistory} winnerId={winnerId} activePlayerId={activePlayerId} />
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
  };
};

const mapDispatchToProps = {
  // setNameFunc: setPlayerName,
  // hidePopapFunc: hidePopap,
};

export default connect(
  pushStateToProps,
  mapDispatchToProps
)(PlayerViewContainer);
