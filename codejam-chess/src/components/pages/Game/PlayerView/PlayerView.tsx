import React from "react";
import Constants, { HistoryElement, PlayerData } from "../../../Constants";
import "./PlayerView.sass";
import winnerIcon from "../../../../img/winner_icon.png";
import activePlayerIcon from "../../../../img/active_player_icon.png";
import BishopSVG from "../../../Figures/svg/BishopSVG";
import KingSVG from "../../../Figures/svg/KingSVG";
import KnightSVG from "../../../Figures/svg/KnightSVG";
import PawnSVG from "../../../Figures/svg/PawnSVG";
import QueenSVG from "../../../Figures/svg/QueenSVG";
import RookSVG from "../../../Figures/svg/RookSVG";

interface PlayerViewProps {
  player: PlayerData;
  history: HistoryElement[];
  winnerId: number;
  activePlayerId: number;
  historyTime: number[];
  draw: boolean;
  arePlayersColorsReversed: boolean;
}

export default class PlayerView extends React.PureComponent<PlayerViewProps> {
  getFigure = (type: string) => {
    const { player } = this.props;
    if (player.color === "w" || player.color === "b") {
      switch (type) {
        case Constants.FIGURES_NAMES.BISHOP:
          return <BishopSVG color={player.color} />;
        case Constants.FIGURES_NAMES.KING:
          return <KingSVG color={player.color} />;
        case Constants.FIGURES_NAMES.KNIGHT:
          return <KnightSVG color={player.color} />;
        case Constants.FIGURES_NAMES.PAWN:
          return <PawnSVG color={player.color} />;
        case Constants.FIGURES_NAMES.QUEEN:
          return <QueenSVG color={player.color} />;
        case Constants.FIGURES_NAMES.ROOK:
          return <RookSVG color={player.color} />;

        default:
          return <div>Unexpected error</div>;
      }
    }
    return null;
  };

  render() {
    const { player, history, winnerId, activePlayerId, historyTime, draw } = this.props;
    const playerColor = player.color;
    const playerHistory = history.filter((e: HistoryElement) => e.color === playerColor);
    const playerHistoryTimeNumber = player.color === "w" ? 0 : 1;
    const playerHistoryTime = historyTime.sort((a, b) => a - b).filter((e, i) => i % 2 === playerHistoryTimeNumber);
    console.log(playerHistoryTime, playerHistory);
    return (
      <div className={`player-view player-view_${playerColor} ${winnerId === player.id ? "player-view_winner" : ""}`}>
        {draw && <div className='player-view__draw'>No winner</div>}
        <img src={winnerIcon} alt='WinnerLogo' className='player-view__winner-icon' />
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
          <div className='player-view__moves'>
            {playerHistory.map((e) => (
              <div className='player-view__row'>
                <div className='player-view__figure-picture'>{this.getFigure(e.piece)}</div>
                <div className='player-view__move'>
                  {e.from.toUpperCase()}-{e.to.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
          <div className='player-view__time'>
            {playerHistoryTime.map((e) => (
              <div className='player-view__row'>
                <p className='player-view__time-data'>
                  {Math.floor(e / 60)}:{e % 60 >= 10 ? e % 60 : `0${e % 60}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
