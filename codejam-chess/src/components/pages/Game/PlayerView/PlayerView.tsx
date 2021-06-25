import React from "react";
import { PlayerData } from "../../../Constants";
import "./PlayerView.sass";

interface PlayerViewProps {
  player: PlayerData;
  history: string[];
}

export default class PlayerView extends React.PureComponent<PlayerViewProps> {
  render() {
    const { player, history } = this.props;
    return (
      <div className={`player-view player-view_${player.id}`}>
        <div className='player-view__image'>
          {String(player.name).split("")[0].toUpperCase()}
        </div>
        <div className='player-view__name'>{player.name}</div>
        <div className='player-view__history'>
          <div className='player-view__moves'>{history.map((e) => e)}</div>
          <div className='player-view__time'>{history.map((e) => e)}</div>
        </div>
      </div>
    );
  }
}
