import React from "react";
import { connect } from "react-redux";
import Settings from "../components/pages/Settings/Settings";
import { changeAiLevel, changeAutoPromotion, changeGameMode, changeRandomPlayerSides } from "../store/mainPage/actions";

interface SettingsContainerContainerProps {
  changeRandomPlayerSidesFunc: (status: boolean) => void;
  areRandomSidesEnabled: boolean;
  autopromotionEnabled: boolean;
  changeAiLevelFunc: (number: number) => void;
  changeGameModeFunc: (type: string) => void;
  AILevel: number;
  gameType: string;
  changeAutoPromotionFunc: (value: boolean) => void;
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
      autopromotionEnabled,
      changeAutoPromotionFunc,
    } = this.props;
    return (
      <Settings
        changeAiLevel={changeAiLevelFunc}
        areRandomSidesEnabled={areRandomSidesEnabled}
        changeRandomPlayerSides={changeRandomPlayerSidesFunc}
        changeGameMode={changeGameModeFunc}
        AILevel={AILevel}
        gameType={gameType}
        autopromotionEnabled={autopromotionEnabled}
        changeAutoPromotion={changeAutoPromotionFunc}
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
    autopromotionEnabled: mainPageReducer.game.autopromotionEnabled,
  };
};

const mapDispatchToProps = {
  changeRandomPlayerSidesFunc: changeRandomPlayerSides,
  changeAiLevelFunc: changeAiLevel,
  changeGameModeFunc: changeGameMode,
  changeAutoPromotionFunc: changeAutoPromotion,
};

export default connect(pushStateToProps, mapDispatchToProps)(SettingsContainer);
