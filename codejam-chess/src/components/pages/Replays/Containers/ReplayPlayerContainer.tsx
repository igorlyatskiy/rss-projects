import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { changePlayers, cleanSlowFigureMove, slowFigureMove, startReplay } from "../../../../store/mainPage/actions";
import ReplayPlayer from "../ReplayPlayerPage/ReplayPlayer";

interface ReplayPlayerContainerProps extends RouteComponentProps {
  speed: number;
  changePlayersFunc: (data: unknown) => void;
  slowFigureMoveFunc: (data: unknown) => void;
  cleanSlowFigureMoveFunc: () => void;
  startReplayFunc: () => void;
}

class ReplayPlayerContainer extends React.PureComponent<ReplayPlayerContainerProps> {
  render() {
    const { location } = this.props;
    const id = new URLSearchParams(location.search).get("id") as string;
    const { speed, changePlayersFunc, slowFigureMoveFunc, cleanSlowFigureMoveFunc,startReplayFunc } = this.props;
    return (
      <ReplayPlayer
        id={id}
        speed={speed}
        changePlayers={changePlayersFunc}
        slowFigureMove={slowFigureMoveFunc}
        cleanSlowFigureMove={cleanSlowFigureMoveFunc}
        startReplay={startReplayFunc}
      />
    );
  }
}

const pushStateToProps = (state: any) => {
  const { mainPageReducer } = state;
  return {
    speed: mainPageReducer.replay.speed,
  };
};

const mapDispatchToProps = {
  changePlayersFunc: changePlayers,
  slowFigureMoveFunc: slowFigureMove,
  cleanSlowFigureMoveFunc: cleanSlowFigureMove,
  startReplayFunc:startReplay
};

export default connect(pushStateToProps, mapDispatchToProps)(ReplayPlayerContainer);
