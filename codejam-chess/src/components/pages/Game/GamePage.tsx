import React from "react";
import GameFieldContainer from "../../../Containers/GameFieldContainer";
import PlayerViewContainer from "../../../Containers/PlayerViewContainer";
import Constants from "../../Constants";
import "./GamePage.sass";

export default class Game extends React.PureComponent {
  render() {
    return (
      <section className='game-page'>
        <PlayerViewContainer propsColor={Constants.FIGURES_COLORS_NAMES.white} />
        <GameFieldContainer />
        <PlayerViewContainer propsColor={Constants.FIGURES_COLORS_NAMES.black} />
      </section>
    );
  }
}
