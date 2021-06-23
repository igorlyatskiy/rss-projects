import React from "react";
import Player from "./Player/Player";
import "./MainPage.sass";
import Nav from "./Nav/Nav";

export default class MainPage extends React.PureComponent {
  onNameClick = (name: string, number: number) => {
    console.log(name, number);
    // TODO add popap visibility here
  };

  render() {
    return (
      <section className='main-page'>
        <Player number={1} onNameClick={this.onNameClick} />
        <Nav />
        <Player number={2} onNameClick={this.onNameClick} />
        {/* <Popap /> */}
      </section>
    );
  }
}
