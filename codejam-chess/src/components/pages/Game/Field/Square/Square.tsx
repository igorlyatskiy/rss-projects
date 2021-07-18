import React from "react";
import { PreMove } from "../../../../Constants";

interface SquareProps {
  rowNumber: number;
  elementNumber: number;
  position: string;
  validMoves: string[];
  squaresThatMadeCheck: string[];
  squaresThatMadeCheckMate: string[];
  premove: PreMove;
  setPreMove?: (data: unknown) => void;
}

export default class Square extends React.PureComponent<SquareProps> {
  checkClassName = () => {
    const { rowNumber, elementNumber } = this.props;

    let className = "field__element";
    if ((rowNumber + elementNumber) % 2 !== 0) {
      className += ` field__element_dark`;
    }
    return className;
  };

  makePreMove = () => {
    const { position, premove, setPreMove } = this.props;
    if (premove.isPreMoveSelecting && setPreMove) {
      setPreMove(position);
    }
  };

  render() {
    const { validMoves, position, squaresThatMadeCheck, squaresThatMadeCheckMate, premove } = this.props;
    return (
      <div
        className={`${this.checkClassName()}
          ${validMoves.includes(position) || validMoves.includes(`${position}x`) ? " field__element_valid" : ""}
          ${
            validMoves.includes(`${position}-O`) || validMoves.includes(`${position}-O-O`)
              ? "  field__element_active-castling"
              : " "
          }
          ${squaresThatMadeCheck.includes(position) ? " field__element_attacked" : ""}
          ${squaresThatMadeCheck.includes(`${position}x`) ? " field__element_king-attacked" : ""}
          ${squaresThatMadeCheckMate.includes(position) ? " field__element_checkmated" : ""}
          ${squaresThatMadeCheckMate.includes(`${position}x`) ? " field__element_checkmated" : ""}
          ${squaresThatMadeCheckMate.includes(`${position}!`) ? " field__element_king-checkmated" : ""}
          ${validMoves.includes(`${position}x=`) ? " field__element_promotion" : ""}
          ${premove.from === position ? " field__element_premove-from" : ""}
          ${premove.to === position ? " field__element_premove-to" : ""}
          `}
        style={{ cursor: premove.isPreMoveSelecting === true ? "pointer" : "auto" }}
        onClick={this.makePreMove}
        role='presentation'
      >
        <div className={validMoves.includes(`${position}x`) ? "field__dot field__dot_damaged" : "field__dot"} />
      </div>
    );
  }
}
