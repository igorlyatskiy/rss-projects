import React from "react";
import GameFieldContainer from "../../../Containers/GameFieldContainer";
import PlayerViewContainer from "../../../Containers/PlayerViewContainer";
import "./GamePage.sass";

export default class Game extends React.PureComponent {
  render() {
    return (
      <section className='game-page'>
        <PlayerViewContainer propsColor='w' />
        <GameFieldContainer />
        <PlayerViewContainer propsColor='b' />
      </section>
    );
  }
}
