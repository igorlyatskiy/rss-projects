import React from "react";
import { connect } from "react-redux";
import { PlayerData } from "../components/Constants";
import MainPage from "../components/pages/Main/MainPage";
import {
  setActivePlayer,
  showPopap,
  hidePopap,
} from "../store/mainPage/actions";

export interface MainContainerProps {
  setActivePlayerFunc: (id: number) => void;
  showPopapFunc: () => void;
  users: PlayerData[];
}

class MainContainer extends React.PureComponent<MainContainerProps> {
  render() {
    const { setActivePlayerFunc, showPopapFunc, users } = this.props;
    return (
      <MainPage
        setActivePlayer={setActivePlayerFunc}
        showPopap={showPopapFunc}
        usersData={users}
      />
    );
  }
}

const pushStateToProps = (state: any) => ({
  users: state.mainPageReducer.players,
});

const mapDispatchToProps = {
  setActivePlayerFunc: setActivePlayer,
  showPopapFunc: showPopap,
  hidePopapFunc: hidePopap,
};

export default connect(pushStateToProps, mapDispatchToProps)(MainContainer);
