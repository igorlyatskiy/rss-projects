import React from "react";
import { PlayerData } from "../../../Constants";
import "./PlayerView.sass";
import winnerIcon from "../../../../img/winner_icon.png";
import activePlayerIcon from "../../../../img/active_player_icon.png";

interface PlayerViewProps {
  player: PlayerData;
  history: string[];
  winnerId: number;
  activePlayerId: number;
}

export default class PlayerView extends React.PureComponent<PlayerViewProps> {
  render() {
    const { player, history, winnerId, activePlayerId } = this.props;

    return (
      <div
        className={`player-view player-view_${player.id} ${
          winnerId === player.id ? "player-view_winner" : ""
        }`}
      >
        <img
          src={winnerIcon}
          alt='WinnerLogo'
          className='player-view__winner-icon'
        />
        <div className='player-view__image'>
          {String(player.name).split("")[0].toUpperCase()}
          {activePlayerId === player.id && (
            <div className='player-view__active-icon'>
              <img src={activePlayerIcon} alt='Active player' />
            </div>
          )}
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
