import React from "react";
import { connect } from "react-redux";
import Settings from "../components/pages/Settings/Settings";
import { changeAiLevel, changeGameMode, changeRandomPlayerSides } from "../store/mainPage/actions";

interface SettingsContainerContainerProps {
  changeRandomPlayerSidesFunc: (status: boolean) => void;
  areRandomSidesEnabled: boolean;
  changeAiLevelFunc: (number: number) => void;
  changeGameModeFunc: (type: string) => void;
  AILevel: number;
  gameType: string;
}

class SettingsContainer extends React.PureComponent<SettingsContainerContainerProps> {
  render() {
    const {
      changeRandomPlayerSidesFunc,
      areRandomSidesEnabled,
      AILevel,
      gameType,
      changeAiLevelFunc,
      changeGameModeFunc,
    } = this.props;
    return (
      <Settings
        changeAiLevel={changeAiLevelFunc}
        areRandomSidesEnabled={areRandomSidesEnabled}
        changeRandomPlayerSides={changeRandomPlayerSidesFunc}
        changeGameMode={changeGameModeFunc}
        AILevel={AILevel}
        gameType={gameType}
      />
    );
  }
}

const pushStateToProps = (state: any) => {
  const { mainPageReducer } = state;
  return {
    areRandomSidesEnabled: mainPageReducer.game.areRandomSidesEnabled,
    AILevel: mainPageReducer.game.AILevel,
    gameType: mainPageReducer.game.gameType,
  };
};

const mapDispatchToProps = {
  changeRandomPlayerSidesFunc: changeRandomPlayerSides,
  changeAiLevelFunc: changeAiLevel,
  changeGameModeFunc: changeGameMode,
};

export default connect(pushStateToProps, mapDispatchToProps)(SettingsContainer);
