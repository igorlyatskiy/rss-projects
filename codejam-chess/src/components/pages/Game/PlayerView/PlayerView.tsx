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
}

export default class PlayerView extends React.PureComponent<PlayerViewProps> {
  getFigure = (type: string) => {
    const { player } = this.props;
    const playerColor = player.id === 1 ? Constants.FIGURES_COLORS_NAMES.white : Constants.FIGURES_COLORS_NAMES.black;
    if (playerColor === "w" || playerColor === "b") {
      switch (type) {
        case Constants.FIGURES_NAMES.BISHOP:
          return <BishopSVG color={playerColor} />;
        case Constants.FIGURES_NAMES.KING:
          return <KingSVG color={playerColor} />;
        case Constants.FIGURES_NAMES.KNIGHT:
          return <KnightSVG color={playerColor} />;
        case Constants.FIGURES_NAMES.PAWN:
          return <PawnSVG color={playerColor} />;
        case Constants.FIGURES_NAMES.QUEEN:
          return <QueenSVG color={playerColor} />;
        case Constants.FIGURES_NAMES.ROOK:
          return <RookSVG color={playerColor} />;

        default:
          return <div>Unexpected error</div>;
      }
    }
    return null;
  };

  // TODO убрать баг у прокручивания, убрать баг у блока прокручивания, убрать баг с кручением доски

  render() {
    const { player, history, winnerId, activePlayerId, historyTime } = this.props;
    const playerColor = player.id === 1 ? Constants.FIGURES_COLORS_NAMES.white : Constants.FIGURES_COLORS_NAMES.black;
    const playerHistory = history.filter((e: HistoryElement) => e.color === playerColor);
    const playerHistoryTime = historyTime.filter((e, index) => index % 2 !== player.id % 2);
    console.log(playerHistory);
    return (
      <div className={`player-view player-view_${player.id} ${winnerId === player.id ? "player-view_winner" : ""}`}>
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
