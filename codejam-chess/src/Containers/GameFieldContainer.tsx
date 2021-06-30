import React from "react";
import { connect } from "react-redux";
import { FigureData } from "../components/Constants";
import GameField from "../components/pages/Game/Field/GameField";
import {
  checkValidMoves,
  cleanValidMoves,
  drawField,
  makeFieldMarkersVisible,
  turnMove,
} from "../store/mainPage/actions";

const Chess = require("chess.js");

interface GameFieldContainerProps {
  data: FigureData[][];
  getValidMovesFunc: (square: string) => void;
  validMoves: string[];
  activePlayerId: number;
  isGameProcessActive: boolean;
  chess: typeof Chess;
  cleanValidMovesFunc: () => void;
  drawFieldFunc: () => void;
  turnMoveFunc: () => void;
  areFieldMarkersVisible: boolean;
  makeFieldMarkersVisibleFunc: () => void;
}

class GameFieldContainer extends React.PureComponent<GameFieldContainerProps> {
  render() {
    const {
      data,
      turnMoveFunc,
      getValidMovesFunc,
      validMoves,
      activePlayerId,
      isGameProcessActive,
      chess,
      cleanValidMovesFunc,
      drawFieldFunc,
      areFieldMarkersVisible,
      makeFieldMarkersVisibleFunc,
    } = this.props;
    return (
      <GameField
        data={data}
        checkValidMoves={getValidMovesFunc}
        activePlayerId={activePlayerId}
        isGameProcessActive={isGameProcessActive}
        chess={chess}
        validMoves={validMoves}
        cleanValidMoves={cleanValidMovesFunc}
        drawField={drawFieldFunc}
        turnMove={turnMoveFunc}
        areFieldMarkersVisible={areFieldMarkersVisible}
        makeFieldMarkersVisible={makeFieldMarkersVisibleFunc}
      />
    );
  }
}

const pushStateToProps = (state: any) => {
  const { mainPageReducer } = state;
  return {
    data: mainPageReducer.game.data,
    validMoves: mainPageReducer.game.validMoves,
    activePlayerId: mainPageReducer.activePlayerId,
    isGameProcessActive: mainPageReducer.game.isGameProcessActive,
    chess: mainPageReducer.game.chess,
    areFieldMarkersVisible: mainPageReducer.game.areFieldMarkersVisible,
  };
};

const mapDispatchToProps = {
  getValidMovesFunc: checkValidMoves,
  cleanValidMovesFunc: cleanValidMoves,
  drawFieldFunc: drawField,
  turnMoveFunc: turnMove,
  makeFieldMarkersVisibleFunc: makeFieldMarkersVisible,
};

export default connect(pushStateToProps, mapDispatchToProps)(GameFieldContainer);
