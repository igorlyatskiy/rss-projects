import React from "react";
import { connect } from "react-redux";
import { PopapContainerProps } from "../components/Constants";
import Popap from "../components/pages/Main/Popap/Popap";
import { setPlayerName } from "../store/mainPage/actions";

class PopapContainer extends React.PureComponent<PopapContainerProps> {
  render() {
    const { setNameFunc, id, name } = this.props;
    return <Popap setPlayerName={setNameFunc} id={id} playerName={name} />;
  }
}

const pushStateToProps = (state: any) => {
  const { mainPageReducer } = state;
  const { activePlayerId } = mainPageReducer;
  return {
    name: mainPageReducer.players[activePlayerId - 1].name,
    id: mainPageReducer.players[activePlayerId - 1].id,
  };
};

const mapDispatchToProps = {
  setNameFunc: setPlayerName,
};

export default connect(pushStateToProps, mapDispatchToProps)(PopapContainer);
