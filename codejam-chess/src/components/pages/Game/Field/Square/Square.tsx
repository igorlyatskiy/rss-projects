import React from "react";

interface SquareProps {
  rowNumber: number;
  elementNumber: number;
  position: string;
  validMoves: string[];
  squaresThatMadeCheck: string[];
  squaresThatMadeCheckMate: string[];
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

  render() {
    const { validMoves, position, squaresThatMadeCheck, squaresThatMadeCheckMate } = this.props;
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
          `}
      >
        <div className={validMoves.includes(`${position}x`) ? "field__dot field__dot_damaged" : "field__dot"} />
      </div>
    );
  }
}
