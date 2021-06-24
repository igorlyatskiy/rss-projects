import React from "react";
import { connect } from "react-redux";
import MainPage from "../components/pages/Main/MainPage";
import { setActivePlayer } from "../store/mainPage/actions";

class MainContainer extends React.PureComponent {
  render() {
    // const { setPlayerName } = this.props;
    return <MainPage setActivePlayer={setActivePlayer} />;
  }
}

const pushStateToProps = () => ({
  // name: state.players[0].name,
});

// TODO understand, what should they do
const mapDispatchToProps = () => ({
  setActivePlayer,
});

export default connect(pushStateToProps, mapDispatchToProps)(MainContainer);
