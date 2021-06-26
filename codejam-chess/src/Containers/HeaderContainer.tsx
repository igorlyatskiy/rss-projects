import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header/Header";
import { breakGame } from "../store/mainPage/actions";

export interface MainContainerProps {
  time: number;
  gameStatus: boolean;
  breakGameFunc: () => void;
}

class HeaderContainer extends React.PureComponent<MainContainerProps> {
  render() {
    const { time, gameStatus,breakGameFunc } = this.props;
    return <Header time={time} isGameActive={gameStatus} breakGame={breakGameFunc} />;
  }
}

const pushStateToProps = (state: any) => ({
  time: state.mainPageReducer.game.time,
  gameStatus: state.mainPageReducer.game.isGameActive,
});

const mapDispatchToProps = {
  breakGameFunc: breakGame
};

export default connect(pushStateToProps, mapDispatchToProps)(HeaderContainer);
