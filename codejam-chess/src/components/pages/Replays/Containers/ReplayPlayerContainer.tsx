import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import NewChess from "../../../../chess.js/chess";
import {
  changePlayers,
  changeReplayWinner,
  cleanSlowFigureMove,
  increaseTime,
  setWinner,
  slowFigureMove,
  startReplay,
} from "../../../../store/mainPage/actions";
import ReplayPlayer from "../ReplayPlayerPage/ReplayPlayer";

interface ReplayPlayerContainerProps extends RouteComponentProps {
  speed: number;
  gamePage: string;
  changePlayersFunc: (data: unknown) => void;
  slowFigureMoveFunc: (data: unknown) => void;
  cleanSlowFigureMoveFunc: () => void;
  startReplayFunc: () => void;
  increaseTimeFunc: () => void;
  changeReplayWinnerFunc: (id: number) => void;
  setWinnerFunc: (id: number) => void;
  winnerId: number;
  time: number;
  chess: NewChess;
}

class ReplayPlayerContainer extends React.PureComponent<ReplayPlayerContainerProps> {
  render() {
    const { location } = this.props;
    const id = new URLSearchParams(location.search).get("id") as string;
    const {
      speed,
      gamePage,
      changePlayersFunc,
      slowFigureMoveFunc,
      cleanSlowFigureMoveFunc,
      changeReplayWinnerFunc,
      startReplayFunc,
      increaseTimeFunc,
      setWinnerFunc,
      winnerId,
      time,
      chess,
    } = this.props;
    return (
      <ReplayPlayer
        id={id}
        speed={speed}
        changePlayers={changePlayersFunc}
        slowFigureMove={slowFigureMoveFunc}
        cleanSlowFigureMove={cleanSlowFigureMoveFunc}
        startReplay={startReplayFunc}
        changeReplayWinner={changeReplayWinnerFunc}
        gamePage={gamePage}
        increaseTime={increaseTimeFunc}
        winnerId={winnerId}
        setWinner={setWinnerFunc}
        time={time}
        chess={chess}
      />
    );
  }
}

const pushStateToProps = (state: any) => {
  const { mainPageReducer } = state;
  return {
    speed: mainPageReducer.replay.speed,
    gamePage: mainPageReducer.gamePage,
    winnerId: mainPageReducer.game.winnerId,
    time: mainPageReducer.game.time,
    chess: mainPageReducer.game.chess,
  };
};

const mapDispatchToProps = {
  changePlayersFunc: changePlayers,
  slowFigureMoveFunc: slowFigureMove,
  cleanSlowFigureMoveFunc: cleanSlowFigureMove,
  startReplayFunc: startReplay,
  changeReplayWinnerFunc: changeReplayWinner,
  increaseTimeFunc: increaseTime,
  setWinnerFunc: setWinner,
};

export default connect(pushStateToProps, mapDispatchToProps)(ReplayPlayerContainer);
