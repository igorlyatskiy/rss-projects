import React from "react";
import { connect } from "react-redux";
import NewChess from "../chess.js/chess";
import { FigureData, PlayerData } from "../components/Constants";
import GameField from "../components/pages/Game/Field/GameField";
import {
  checkValidMoves,
  cleanValidMoves,
  drawField,
  makeFieldMarkersVisible,
  setWinner,
  turnAiMove,
  turnMove,
} from "../store/mainPage/actions";

interface GameFieldContainerProps {
  data: FigureData[][];
  getValidMovesFunc: (square: string) => void;
  validMoves: string[];
  activePlayerId: number;
  isGameProcessActive: boolean;
  chess: NewChess;
  cleanValidMovesFunc: () => void;
  drawFieldFunc: () => void;
  turnMoveFunc: () => void;
  areFieldMarkersVisible: boolean;
  makeFieldMarkersVisibleFunc: () => void;
  squaresThatMadeCheck: string[];
  squaresThatMadeCheckMate: string[];
  setWinnerFunc: (id: number) => void;
  players: PlayerData[];
  gameType: string;
  turnAiMoveFunc: () => void;
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
      squaresThatMadeCheck,
      squaresThatMadeCheckMate,
      setWinnerFunc,
      players,
      gameType,
      turnAiMoveFunc
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
        squaresThatMadeCheck={squaresThatMadeCheck}
        squaresThatMadeCheckMate={squaresThatMadeCheckMate}
        setWinner={setWinnerFunc}
        players={players}
        gameType={gameType}
        turnAiMove={turnAiMoveFunc}
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
    squaresThatMadeCheck: mainPageReducer.game.checkSquares,
    squaresThatMadeCheckMate: mainPageReducer.game.checkmateSquares,
    players: mainPageReducer.players,
    gameType: mainPageReducer.game.gameType,
  };
};

const mapDispatchToProps = {
  getValidMovesFunc: checkValidMoves,
  cleanValidMovesFunc: cleanValidMoves,
  drawFieldFunc: drawField,
  turnMoveFunc: turnMove,
  turnAiMoveFunc: turnAiMove,
  makeFieldMarkersVisibleFunc: makeFieldMarkersVisible,
  setWinnerFunc: setWinner,
};

export default connect(pushStateToProps, mapDispatchToProps)(GameFieldContainer);
