import React from "react";
import Player from "./Player/Player";
import "./MainPage.sass";
import Nav from "./Nav/Nav";
import PopapContainer from "../../../Containers/PopapContainer";

interface MainPageProps {
  setActivePlayer: (id: number) => {};
}

export default class MainPage extends React.PureComponent<MainPageProps> {
  onNameClick = (number: number) => {
    const { setActivePlayer } = this.props;
    setActivePlayer(number);
    // TODO add popap visibility here
  };

  render() {
    return (
      <section className='main-page'>
        <Player number={1} onNameClick={this.onNameClick} />
        <Nav />
        <Player number={2} onNameClick={this.onNameClick} />
        <PopapContainer />
      </section>
    );
  }
}
