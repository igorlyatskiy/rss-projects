import React from "react";
import { connect } from "react-redux";
import Settings from "../components/pages/Settings/Settings";
import { changeAiLevel, changeGameMode, changeRandomPlayerSides } from "../store/mainPage/actions";

interface SettingsContainerContainerProps {
  changeRandomPlayerSidesFunc: (status: boolean) => void;
  areRandomSidesEnabled: boolean;
  changeAiLevelFunc: (number: number) => void;
  changeGameModeFunc: (type: string) => void;
}

class SettingsContainer extends React.PureComponent<SettingsContainerContainerProps> {
  render() {
    const { changeRandomPlayerSidesFunc, areRandomSidesEnabled, changeAiLevelFunc,changeGameModeFunc } = this.props;
    return (
      <Settings
        changeAiLevel={changeAiLevelFunc}
        areRandomSidesEnabled={areRandomSidesEnabled}
        changeRandomPlayerSides={changeRandomPlayerSidesFunc}
        changeGameMode={changeGameModeFunc}
      />
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
  changeGameModeFunc: changeGameMode,
};

export default connect(pushStateToProps, mapDispatchToProps)(SettingsContainer);
