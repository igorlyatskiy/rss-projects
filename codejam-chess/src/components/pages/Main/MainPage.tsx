import React from "react";
import Player from "./Player/Player";
import "./MainPage.sass";
import Nav from "./Nav/Nav";

export default class MainPage extends React.PureComponent {
  render() {
    return (
      <section className='main-page'>
        <Player number={1} />
        <Nav />
        <Player number={2} />
      </section>
    );
  }
}
