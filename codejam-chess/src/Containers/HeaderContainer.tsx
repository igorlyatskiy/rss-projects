import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header/Header";
import { breakGame, setWinner } from "../store/mainPage/actions";

export interface MainContainerProps {
  time: number;
  gameStatus: boolean;
  breakGameFunc: () => void;
  setWinnerFunc: (id: number) => void;
  activePlayerId: number;
  isGameProcessActive: boolean;
}

class HeaderContainer extends React.PureComponent<MainContainerProps> {
  render() {
    const {
      time,
      gameStatus,
      breakGameFunc,
      setWinnerFunc,
      activePlayerId,
      isGameProcessActive,
    } = this.props;
    return (
      <Header
        time={time}
        isGamePageActive={gameStatus}
        breakGame={breakGameFunc}
        setWinner={setWinnerFunc}
        activePlayerId={activePlayerId}
        isGameProcessActive={isGameProcessActive}
      />
    );
  }
}

const pushStateToProps = (state: any) => ({
  time: state.mainPageReducer.game.time,
  gameStatus: state.mainPageReducer.game.isGamePageActive,
  activePlayerId: state.mainPageReducer.activePlayerId,
  isGameProcessActive: state.mainPageReducer.game.isGameProcessActive,
});

const mapDispatchToProps = {
  breakGameFunc: breakGame,
  setWinnerFunc: setWinner,
};

export default connect(pushStateToProps, mapDispatchToProps)(HeaderContainer);
