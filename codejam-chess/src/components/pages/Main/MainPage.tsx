import React from "react";
import Player from "./Player/Player";
import "./MainPage.sass";
import Nav from "./Nav/Nav";

export default class MainPage extends React.PureComponent {
  public readonly firstPlayer: Player = new Player(1);
  public readonly secondPlayer: Player = new Player(2);
  public readonly Nav: Nav = new Nav(1);

  render() {
    return (
      <section className='main-page'>
        {this.firstPlayer.render()}
        {this.Nav.render()}
        {this.secondPlayer.render()}
      </section>
    );
  }
}
