import React from "react";
import { connect } from "react-redux";
import ReplaysPage from "../components/pages/Replays/Replays";
import { setPage, slowFigureMove } from "../store/mainPage/actions";

interface ReplaysContainerProps {
  changeActivePageFunc: (page: string) => void;
  page: string;
  slowFigureMoveFunc: (data: unknown) => void;
}

class ReplaysContainer extends React.PureComponent<ReplaysContainerProps> {
  render() {
    const { changeActivePageFunc, page, slowFigureMoveFunc } = this.props;
    return <ReplaysPage page={page} changeActivePage={changeActivePageFunc} slowFigureMove={slowFigureMoveFunc} />;
  }
}

const pushStateToProps = (state: any) => {
  const { mainPageReducer } = state;
  return {
    page: mainPageReducer.gamePage,
  };
};

const mapDispatchToProps = {
  changeActivePageFunc: setPage,
  slowFigureMoveFunc: slowFigureMove,
};

export default connect(pushStateToProps, mapDispatchToProps)(ReplaysContainer);
