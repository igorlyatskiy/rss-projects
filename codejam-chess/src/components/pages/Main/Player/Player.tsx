import React from "react";
import { PlayerData } from "../../../Constants";
import "./Player.sass";

interface PlayerProps {
  number: number;
  onNameClick: (number: number) => void;
  data: PlayerData;
}

export default class Player extends React.PureComponent<PlayerProps> {
  render() {
    const { number, onNameClick, data } = this.props;
    return (
      <div className={`player player_${number}`}>
        <div className='player__image-container'>
          <img src={data.image} alt='User' className='player__image' />
        </div>
        <button
          type='button'
          className='player__name'
          onClick={() => {
            onNameClick(number);
          }}
          onKeyUp={() => {}}
        >
          {data.name}
        </button>
      </div>
    );
  }
}
