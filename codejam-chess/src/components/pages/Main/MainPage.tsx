import React from "react";
import Player from "./Player/Player";
import "./MainPage.sass";
import PopapContainer from "../../../Containers/PopapContainer";
import { PlayerData } from "../../Constants";
import NavContainer from "../../../Containers/NavContainer";

interface MainPageProps {
  setActivePlayer: (id: number) => void;
  showPopap: () => void;
  usersData: PlayerData[];
  startGame: (type: string, id: string) => void;
  increaseTime: () => void;
  checkAndRandomizeColors: () => void;
  setTimerFunc: (number: number) => void;
  isGameActive: boolean;
  gameType: string;
  setStore: (store: unknown, roomId: string | number) => void;
}

export default class MainPage extends React.PureComponent<MainPageProps> {
  onNameClick = (number: number) => {
    const { setActivePlayer, showPopap } = this.props;
    setActivePlayer(number);
    showPopap();
  };

  render() {
    const { usersData } = this.props;
    const firstPlayer = usersData.find((e) => e.id === 1);
    const secondPlayer = usersData.find((e) => e.id === 2);
    if (!firstPlayer || !secondPlayer) {
      throw new Error("Something has gone wron at the MainPage.tsx");
    }
    return (
      <section className='main-page'>
        <Player number={1} onNameClick={this.onNameClick} data={firstPlayer} />
        <NavContainer />
        <Player number={2} onNameClick={this.onNameClick} data={secondPlayer} />
        <PopapContainer />
      </section>
    );
  }
}
