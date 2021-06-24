import React from "react";
import Constants from "../../../Constants";
import "./Player.sass";

interface PlayerProps {
  number: number;
  onNameClick: (number: number) => void;
}

export default class Player extends React.PureComponent<PlayerProps> {
  render() {
    const { number, onNameClick } = this.props;
    const { image, name } = Constants.defaultPlayers[number - 1];
    return (
      <div className={`player player_${number}`}>
        <div className='player__image-container'>
          <img src={image} alt='User' className='player__image' />
        </div>
        <button
          type='button'
          className='player__name'
          onClick={() => onNameClick(number)}
          onKeyUp={() => {}}
        >
          {name}
        </button>
      </div>
    );
  }
}
