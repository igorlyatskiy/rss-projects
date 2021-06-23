import React from "react";
import Constants from "../../../Constants";
import "./Player.sass";

export default class Player extends React.Component {
  public readonly number: number;

  constructor(number: number) {
    super({});
    this.number = number;
  }

  render() {
    return (
      <div className='player'>
        <div className='player__image-container'>
          <img
            src={Constants.defaultPlayers[this.number - 1].image}
            alt='User'
            className='player__image'
          />
        </div>
        <div className='player__name'>
          {Constants.defaultPlayers[this.number - 1].name}
        </div>
      </div>
    );
  }
}
