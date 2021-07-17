import React from "react";
import { Link } from "react-router-dom";
import Constants, { HistoryAction, PlayerData } from "../../../Constants";
import "./ReplayCard.sass";
import winnerIcon from "../../../../img/winner_icon.png";

interface ReplayCardData {
  history: HistoryAction[];
  winnerId: number;
  players: PlayerData[];
  id: string;
  changeActivePage: (page: string) => void;
  winnerColor: string;
}

export default class ReplayCard extends React.PureComponent<ReplayCardData> {
  render() {
    const { players, history, id, winnerColor, changeActivePage } = this.props;
    const { time } = history[history.length - 1];
    const minutes = Math.floor(time / 60) >= 10 ? Math.floor(time / 60) : `0${Math.floor(time / 60)}`;
    const seconds = time % 60 >= 10 ? time % 60 : `0${time % 60}`;
    return (
      <div className='replay-card'>
        <Link
          className='replay-card__link'
          to={`/replay?id=${id}`}
          onClick={() => changeActivePage(Constants.APP_PAGES.REPLAY)}
        />
        <div
          className={`replay-card__avatar replay-card__avatar_1 ${
            winnerColor === Constants.FIGURES_COLORS_NAMES.black ? "replay-card__avatar_winner" : ""
          }`}
          title={String(players.find((e) => e.color === Constants.FIGURES_COLORS_NAMES.black)?.name)}
        >
          {String(players.find((e) => e.color === Constants.FIGURES_COLORS_NAMES.black)?.name[0]).toUpperCase()}
          <div className='replay-card__winner-icon'>
            <img src={winnerIcon} alt='Winner' className='replay-card__winner-icon-image' />
          </div>
        </div>
        <div className='replay-card__vs-icon'>vs</div>
        <p className='replay-card__info'>Moves: {history.length}</p>
        <p className='replay-card__info'>
          Common time: {minutes}:{seconds}
        </p>
        <div
          className={`replay-card__avatar replay-card__avatar_2 ${
            winnerColor === Constants.FIGURES_COLORS_NAMES.white ? "replay-card__avatar_winner" : ""
          }`}
          title={String(players.find((e) => e.color === Constants.FIGURES_COLORS_NAMES.white)?.name)}
        >
          {String(players.find((e) => e.color === Constants.FIGURES_COLORS_NAMES.white)?.name[0]).toUpperCase()}
          <div className='replay-card__winner-icon'>
            <img src={winnerIcon} alt='Winner' className='replay-card__winner-icon-image' />
          </div>
        </div>
      </div>
    );
  }
}
