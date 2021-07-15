import React from "react";
import { connect } from "react-redux";
import NewChess from "../../../../chess.js/chess";
import {
  checkValidMoves,
  cleanValidMoves,
  drawField,
  turnMove,
  turnAiMove,
  makeFieldMarkersVisible,
  setWinner,
} from "../../../../store/mainPage/actions";
import { FigureData, PlayerData } from "../../../Constants";
import GameField from "../../Game/Field/GameField";

interface ReplayFieldContainerProps {
  data: FigureData[][];
  getValidMovesFunc: (square: string) => void;
  validMoves: string[];
  activePlayerId: number;
  isGameProcessActive: boolean;
  chess: NewChess;
  cleanValidMovesFunc: () => void;
  drawFieldFunc: () => void;
  turnMoveFunc: (data: unknown) => void;
  areFieldMarkersVisible: boolean;
  makeFieldMarkersVisibleFunc: () => void;
  squaresThatMadeCheck: string[];
  squaresThatMadeCheckMate: string[];
  setWinnerFunc: (id: number) => void;
  players: PlayerData[];
  gameType: string;
  turnAiMoveFunc: () => void;
  selectedPlayerId: number;
  wsConnection: WebSocket;
  speed: number;
}

class ReplayFieldContainer extends React.PureComponent<ReplayFieldContainerProps> {
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
      turnAiMoveFunc,
      selectedPlayerId,
      wsConnection,
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
        selectedPlayerId={selectedPlayerId}
        wsConnection={wsConnection}
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
    selectedPlayerId: mainPageReducer.game.selectedPlayerId,
    wsConnection: mainPageReducer.game.wsConnection,
    speed: mainPageReducer.replay.speed,
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

export default connect(pushStateToProps, mapDispatchToProps)(ReplayFieldContainer);
