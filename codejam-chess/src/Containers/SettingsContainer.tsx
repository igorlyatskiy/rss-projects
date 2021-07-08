import React from "react";
import { connect } from "react-redux";
import Settings from "../components/pages/Settings/Settings";
import { changeAiLevel, changeRandomPlayerSides } from "../store/mainPage/actions";

interface SettingsContainerContainerProps {
  changeRandomPlayerSidesFunc: (status: boolean) => void;
  areRandomSidesEnabled: boolean;
  changeAiLevelFunc: (number: number) => void;
}

class SettingsContainer extends React.PureComponent<SettingsContainerContainerProps> {
  render() {
    const { changeRandomPlayerSidesFunc, areRandomSidesEnabled, changeAiLevelFunc } = this.props;
    return (
      <Settings changeAiLevel={changeAiLevelFunc} areRandomSidesEnabled={areRandomSidesEnabled} changeRandomPlayerSides={changeRandomPlayerSidesFunc} />
    );
  }
}

const pushStateToProps = (state: any) => {
  const { mainPageReducer } = state;
  return {
    areRandomSidesEnabled: mainPageReducer.game.areRandomSidesEnabled,
  };
};

const mapDispatchToProps = {
  changeRandomPlayerSidesFunc: changeRandomPlayerSides,
  changeAiLevelFunc: changeAiLevel,
};

export default connect(pushStateToProps, mapDispatchToProps)(SettingsContainer);
