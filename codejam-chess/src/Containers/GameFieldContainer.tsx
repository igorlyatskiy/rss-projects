import React from "react";

import { connect } from "react-redux";
import { FigureData } from "../components/Constants";
import GameField from "../components/pages/Game/Field/GameField";

interface GameFieldContainerProps {
  data: FigureData[][];
}

class GameFieldContainer extends React.PureComponent<GameFieldContainerProps> {
  render() {
    const { data } = this.props;
    return <GameField data={data} />;
  }
}

const pushStateToProps = (state: any) => {
  const { mainPageReducer } = state;
  return {
    data: mainPageReducer.game.data,
  };
};

const mapDispatchToProps = {
  // setNameFunc: setPlayerName,
  // hidePopapFunc: hidePopap,
};

export default connect(
  pushStateToProps,
  mapDispatchToProps
)(GameFieldContainer);
