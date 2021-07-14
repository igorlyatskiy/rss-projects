import React from "react";
import { HistoryAction, PlayerData } from "../../../Constants";
import "./ReplayCard.sass";
import winnerIcon from "../../../../img/winner_icon.png";

interface ReplayCardData {
  history: HistoryAction[];
  winnerId: number;
  players: PlayerData[];
}

export default class ReplayCard extends React.PureComponent<ReplayCardData> {
  render() {
    const { players, history, winnerId } = this.props;
    return (
      <div className='replay-card'>
        <div
          className={`replay-card__avatar replay-card__avatar_1 ${winnerId === 1 ? "replay-card__avatar_winner" : ""}`}
        >
          {String(players.find((e) => e.id === 1)?.name[0]).toUpperCase()}
          <div className='replay-card__winner-icon'>
            <img src={winnerIcon} alt='Winner' className='replay-card__winner-icon-image' />
          </div>
        </div>
        <p className='replay-card__info'>Moves: {history.length}</p>
        <p className='replay-card__info'>Common time: {history[history.length - 1].time}</p>
        <div
          className={`replay-card__avatar replay-card__avatar_2 ${winnerId === 2 ? "replay-card__avatar_winner" : ""}`}
        >
          {String(players.find((e) => e.id === 2)?.name[0]).toUpperCase()}
          <div className='replay-card__winner-icon'>
            <img src={winnerIcon} alt='Winner' className='replay-card__winner-icon-image' />
          </div>
        </div>
      </div>
    );
  }
}
