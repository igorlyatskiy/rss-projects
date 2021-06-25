import React from "react";
import PlayerViewContainer from "../../../Containers/PlayerViewContainer";
import "./GamePage.sass";

export default class Game extends React.PureComponent {
  render() {
    return (
      <section className='game-page'>
        <PlayerViewContainer propsId={1} />
        {/* <GameFieldContainer/> */}
        <PlayerViewContainer propsId={2} />
      </section>
    );
  }
}
