import React from "react";

import { connect } from "react-redux";
import { PlayerData } from "../components/Constants";
import PlayerView from "../components/pages/Game/PlayerView/PlayerView";

interface PlayerViewContainerProps {
  propsId: number;
  players: PlayerData[];
  propsHistory: string[];
}

class PlayerViewContainer extends React.PureComponent<PlayerViewContainerProps> {
  render() {
    const { players, propsHistory, propsId } = this.props;
    const player = players.find((e: PlayerData) => e.id === propsId);
    if (player === undefined) {
      throw new Error("At the player view container");
    }
    return <PlayerView player={player} history={propsHistory} />;
  }
}

const pushStateToProps = (state: any) => {
  const { mainPageReducer } = state;
  return {
    players: mainPageReducer.players,
    propsHistory: mainPageReducer.game.history,
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
