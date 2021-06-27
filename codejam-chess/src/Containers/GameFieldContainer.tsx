import React from "react";

import { connect } from "react-redux";
import { FigureData } from "../components/Constants";
import GameField from "../components/pages/Game/Field/GameField";
import { getValidMoves } from "../store/mainPage/actions";

interface GameFieldContainerProps {
  data: FigureData[][];
  getValidMovesFunc: (square: string) => void;
  validMoves: string[];
}

class GameFieldContainer extends React.PureComponent<GameFieldContainerProps> {
  render() {
    const { data, getValidMovesFunc, validMoves } = this.props;
    return (
      <GameField
        data={data}
        getValidMoves={getValidMovesFunc}
        validMoves={validMoves}
      />
    );
  }
}

const pushStateToProps = (state: any) => {
  const { mainPageReducer } = state;
  return {
    data: mainPageReducer.game.data,
    validMoves: mainPageReducer.game.validMoves,
  };
};

const mapDispatchToProps = {
  getValidMovesFunc: getValidMoves,
  // setNameFunc: setPlayerName,
  // hidePopapFunc: hidePopap,
};

export default connect(
  pushStateToProps,
  mapDispatchToProps
)(GameFieldContainer);
