import React from "react";
import NewChess from "../../../../../chess.js/chess";
import Constants, { FigureData, PlayerData } from "../../../../Constants";
import Bishop from "../../../../Figures/Bishop/Bishop";
import King from "../../../../Figures/King/King";
import Knight from "../../../../Figures/Knight/Knight";
import Pawn from "../../../../Figures/Pawn/Pawn";
import Queen from "../../../../Figures/Queen/Queen";
import Rook from "../../../../Figures/Rook/Rook";
import "./Figure.sass";

interface FigureProps {
  element: FigureData;
  elementNumber: number;
  rowNumber: number;
  position: string;
  activePlayerId: number;
  isGameProcessActive: boolean;
  chess: NewChess;
  checkValidMoves: (square: string) => void;
  cleanValidMoves: () => void;
  drawField: () => void;
  turnMove: () => void;
  makeFieldMarkersVisible: () => void;
  setWinner: (id: number) => void;
  players: PlayerData[];
}

export default class Figure extends React.PureComponent<FigureProps> {
  getFigure = () => {
    const { elementNumber, rowNumber, element } = this.props;
    const unicId = `${elementNumber}, ${rowNumber}`;

    if (element !== null) {
      switch (element.type) {
        case Constants.FIGURES_NAMES.BISHOP:
          return <Bishop key={unicId} color={element.color} />;
        case Constants.FIGURES_NAMES.KING:
          return <King key={unicId} color={element.color} />;
        case Constants.FIGURES_NAMES.KNIGHT:
          return <Knight key={unicId} color={element.color} />;
        case Constants.FIGURES_NAMES.PAWN:
          return <Pawn key={unicId} color={element.color} />;
        case Constants.FIGURES_NAMES.QUEEN:
          return <Queen key={unicId} color={element.color} />;
        case Constants.FIGURES_NAMES.ROOK:
          return <Rook key={unicId} color={element.color} />;

        default:
          return <div>Unexpected error</div>;
      }
    }
    return null;
  };

  mouseDown = (e: any) => {
    const { currentTarget } = e;
    const { checkValidMoves, position, activePlayerId,players } = this.props;
    checkValidMoves(position);

    const coords = {
      top: currentTarget.getBoundingClientRect().top,
      left: currentTarget.getBoundingClientRect().left,
    };

    const startLeft = parseFloat(currentTarget.style.left);
    const startTop = parseFloat(currentTarget.style.top);

    const shiftX = e.pageX - coords.left;
    const shiftY = e.pageY - coords.top;

    const startX = e.pageX - startLeft - shiftX;
    const startY = e.pageY - startTop - shiftY;

    const startPageX = e.pageX;
    const startPageY = e.pageY;

    const reverseCoef = players[activePlayerId-1].color === 'w' ? 1 : -1;

    const moveAt = (event: MouseEvent) => {
      currentTarget.style.left = `${startPageX - reverseCoef * (startPageX - event.pageX) - shiftX - startX}px`;
      currentTarget.style.top = `${startPageY - reverseCoef * (startPageY - event.pageY) - shiftY - startY}px`;
    };
    moveAt(e);

    document.onmousemove = (action: MouseEvent) => {
      moveAt(action);
    };

    document.onmouseup = () => {
      const { cleanValidMoves, makeFieldMarkersVisible } = this.props;
      this.checkFigurePosition(currentTarget, startLeft, startTop);
      this.checkMove(currentTarget, startTop, startLeft);
      cleanValidMoves();
      setTimeout(() => makeFieldMarkersVisible(), Constants.BOARD_ROTATION_TIME);
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  checkMove = (paramTarget: HTMLElement, startTop: number, startLeft: number) => {
    const currentTarget = paramTarget;
    const { position, chess, drawField, turnMove } = this.props;
    const moveToBottom = (startTop - parseFloat(currentTarget.style.top)) / Constants.squareSize;
    const moveToRight = (startLeft - parseFloat(currentTarget.style.left)) / Constants.squareSize;
    const newPosition = `${Constants.letters[Constants.letters.indexOf(position[0]) - moveToRight]}${
      +position[1] + moveToBottom
    }`;

    const moveStatus = chess.move({ from: position, to: newPosition, promotion: "q" });
    console.log(moveStatus);
    if (moveStatus) {
      drawField();
      turnMove();
    } else {
      currentTarget.style.left = `${startLeft}px`;
      currentTarget.style.top = `${startTop}px`;
    }
  };

  checkFigurePosition = (target: HTMLElement, startLeftParam: number, startTopParam: number) => {
    const currentTarget = target;
    const startLeft = startLeftParam;
    const startTop = startTopParam;

    const left = parseFloat(currentTarget.style.left);
    const top = parseFloat(currentTarget.style.top);
    const leftFloat = left % Constants.squareSize;
    const topFloat = top % Constants.squareSize;

    currentTarget.style.left =
      leftFloat > Constants.squareSize / 2 ? `${left - leftFloat + Constants.squareSize}px` : `${left - leftFloat}px`;

    currentTarget.style.top =
      topFloat > Constants.squareSize / 2 ? `${top - topFloat + Constants.squareSize}px` : `${top - topFloat}px`;

    if (
      left < -Constants.squareSize / 2 ||
      left > (Constants.rowNumbers - 0.5) * Constants.squareSize ||
      top < -Constants.squareSize / 2 ||
      top > (Constants.rowNumbers - 0.5) * Constants.squareSize
    ) {
      currentTarget.style.left = `${startLeft}px`;
      currentTarget.style.top = `${startTop}px`;
    }
  };

  startDrag = (e: any) => {
    e.preventDefault();
    return false;
  };

  getReversedClassName = () => {
    const { element } = this.props;
    return element.color === Constants.FIGURES_COLORS_NAMES.black ? " figure-container_reversed" : "";
  };

  render() {
    const { rowNumber, elementNumber, isGameProcessActive, element, activePlayerId, players } = this.props;
    const playerId = players.find((e) => e.color === element.color)?.id;
    return (
      <div
        role='presentation'
        className={`figure-container
          ${playerId === activePlayerId ? " figure-container_active" : " figure-container_blocked"}
          ${isGameProcessActive ? "" : " figure-container_blocked"}
          ${this.getReversedClassName()}`}
        onMouseDown={this.mouseDown}
        onDragStart={this.startDrag}
        style={{
          top: `${Constants.squareSize * rowNumber}px`,
          left: `${Constants.squareSize * elementNumber}px`,
        }}
        draggable
      >
        {this.getFigure()}
      </div>
    );
  }
}
