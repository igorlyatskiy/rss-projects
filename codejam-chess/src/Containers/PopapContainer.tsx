import React from "react";
import { connect } from "react-redux";
import { PlayerData, PopapContainerProps } from "../components/Constants";
import Popap from "../components/pages/Main/Popap/Popap";
import { changePopapInputValue, hidePopap, setPlayerName } from "../store/mainPage/actions";

class PopapContainer extends React.PureComponent<PopapContainerProps> {
  render() {
    const { setNameFunc, id, name, status, hidePopapFunc, inputContext, isBtnBlocked, changePopapInputValueFunc } =
      this.props;
    return (
      <Popap
        inputContext={inputContext}
        isBtnBlocked={isBtnBlocked}
        setPlayerName={setNameFunc}
        id={id}
        playerName={name}
        status={status}
        hidePopap={hidePopapFunc}
        changePopapInputValue={changePopapInputValueFunc}
      />
    );
  }
}

const pushStateToProps = (state: any) => {
  const { mainPageReducer } = state;
  const { activePlayerId, popap } = mainPageReducer;
  const player = mainPageReducer.players.find((e: PlayerData) => e.id === activePlayerId);
  return {
    name: player.name,
    id: player.id,
    status: popap.status,
    inputContext: popap.inputContext,
    isBtnBlocked: popap.isBtnBlocked,
  };
};

const mapDispatchToProps = {
  setNameFunc: setPlayerName,
  hidePopapFunc: hidePopap,
  changePopapInputValueFunc: changePopapInputValue,
};

export default connect(pushStateToProps, mapDispatchToProps)(PopapContainer);
