import React from "react";
import { connect } from "react-redux";
import NewChess from "../chess.js/chess";
import { FigureData, PlayerData, RequestMove } from "../components/Constants";
import Figure from "../components/pages/Game/Field/Figure/Figure";
import {
  checkValidMoves,
  cleanSlowFigureMove,
  cleanValidMoves,
  drawField,
  getHighlightedSquares,
  makeFieldMarkersVisible,
  setPage,
  setWinner,
  slowFigureMove,
  turnAiMove,
  turnMove,
  turnReplayMove,
} from "../store/mainPage/actions";

interface FigureContainerProps {
  element: FigureData;
  elementNumber: number;
  rowNumber: number;
  position: string;
  activePlayerId?: number;
  isGameProcessActive?: boolean;
  chess?: NewChess;
  checkValidMovesFunc: (square: string) => void;
  cleanValidMovesFunc: () => void;
  drawFieldFunc: () => void;
  turnAiMoveFunc: () => void;
  turnMoveFunc: (data: unknown) => void;
  slowFigureMoveFunc: (data: unknown) => void;
  cleanSlowFigureMoveFunc: () => void;
  makeFieldMarkersVisibleFunc: () => void;
  setWinnerFunc: (id: number) => void;
  players?: PlayerData[];
  gameType?: string;
  wsConnection?: WebSocket;
  roomId: number | string;
  time: number;
  checkSquares: string[];
  checkmateSquares: string[];
  getHighlightedSquaresFunc: () => void;
  winnerId: number;
  selectedPlayerId: number;
  requestMove: RequestMove;
  AILevel: number;
  gamePage: string;
  turnReplayMoveFunc: () => void;
  setPageFunc: (page: string) => void;
  speed: number;
  boardRotationEnabled: boolean;
}

class FigureContainer extends React.PureComponent<FigureContainerProps> {
  render() {
    const {
      checkValidMovesFunc,
      drawFieldFunc,
      turnAiMoveFunc,
      turnMoveFunc,
      makeFieldMarkersVisibleFunc,
      setWinnerFunc,
      requestMove,
      element,
      rowNumber,
      elementNumber,
      position,
      isGameProcessActive,
      chess,
      activePlayerId,
      players,
      gameType,
      wsConnection,
      roomId,
      time,
      checkmateSquares,
      checkSquares,
      getHighlightedSquaresFunc,
      cleanValidMovesFunc,
      AILevel,
      winnerId,
      selectedPlayerId,
      slowFigureMoveFunc,
      cleanSlowFigureMoveFunc,
      gamePage,
      turnReplayMoveFunc,
      setPageFunc,
      speed,
      boardRotationEnabled,
    } = this.props;
    if (
      isGameProcessActive === undefined ||
      chess === undefined ||
      activePlayerId === undefined ||
      players === undefined ||
      gameType === undefined ||
      wsConnection === undefined
    ) {
      throw new Error("at the figure container");
    }
    return (
      <Figure
        activePlayerId={activePlayerId}
        position={position}
        rowNumber={rowNumber}
        element={element}
        elementNumber={elementNumber}
        isGameProcessActive={isGameProcessActive}
        chess={chess}
        checkValidMoves={checkValidMovesFunc}
        cleanValidMoves={cleanValidMovesFunc}
        drawField={drawFieldFunc}
        turnAiMove={turnAiMoveFunc}
        turnMove={turnMoveFunc}
        makeFieldMarkersVisible={makeFieldMarkersVisibleFunc}
        setWinner={setWinnerFunc}
        players={players}
        gameType={gameType}
        wsConnection={wsConnection}
        roomId={roomId}
        time={time}
        checkmateSquares={checkmateSquares}
        checkSquares={checkSquares}
        getHighlightedSquares={getHighlightedSquaresFunc}
        winnerId={winnerId}
        selectedPlayerId={selectedPlayerId}
        requestMove={requestMove}
        AILevel={AILevel}
        slowFigureMove={slowFigureMoveFunc}
        cleanSlowFigureMove={cleanSlowFigureMoveFunc}
        gamePage={gamePage}
        turnReplayMove={turnReplayMoveFunc}
        setPage={setPageFunc}
        speed={speed}
        boardRotationEnabled={boardRotationEnabled}
      />
    );
  }
}

const pushStateToProps = (state: any) => {
  const { mainPageReducer } = state;
  return {
    isGameProcessActive: mainPageReducer.game.isGameProcessActive,
    activePlayerId: mainPageReducer.activePlayerId,
    players: mainPageReducer.players,
    gameType: mainPageReducer.game.gameType,
    wsConnection: mainPageReducer.game.wsConnection,
    chess: mainPageReducer.game.chess,
    roomId: mainPageReducer.game.roomId,
    time: mainPageReducer.game.time,
    checkSquares: mainPageReducer.game.checkSquares,
    checkmateSquares: mainPageReducer.game.checkmateSquares,
    winnerId: mainPageReducer.game.winnerId,
    selectedPlayerId: mainPageReducer.game.selectedPlayerId,
    requestMove: mainPageReducer.game.requestMove,
    AILevel: mainPageReducer.game.AILevel,
    gamePage: mainPageReducer.gamePage,
    speed: mainPageReducer.replay.speed,
    boardRotationEnabled: mainPageReducer.game.boardRotationEnabled,
  };
};

const mapDispatchToProps = {
  checkValidMovesFunc: checkValidMoves,
  drawFieldFunc: drawField,
  turnAiMoveFunc: turnAiMove,
  turnMoveFunc: turnMove,
  makeFieldMarkersVisibleFunc: makeFieldMarkersVisible,
  setWinnerFunc: setWinner,
  cleanValidMovesFunc: cleanValidMoves,
  getHighlightedSquaresFunc: getHighlightedSquares,
  slowFigureMoveFunc: slowFigureMove,
  cleanSlowFigureMoveFunc: cleanSlowFigureMove,
  turnReplayMoveFunc: turnReplayMove,
  setPageFunc: setPage,
};

export default connect(pushStateToProps, mapDispatchToProps)(FigureContainer);
