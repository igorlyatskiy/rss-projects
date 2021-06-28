import React from "react";

interface SquareProps {
  rowNumber: number;
  elementNumber: number;
  position: string;
  getValidMoves: (square: string) => void;
  validMoves: string[];
}

export default class Square extends React.PureComponent<SquareProps> {
  checkClassName = () => {
    const { rowNumber, elementNumber } = this.props;
    const maxWhiteRowNumber = 1;

    let className = "field__element";
    if ((rowNumber + elementNumber) % 2 !== 0) {
      className += ` field__element_dark`;
    }
    if (rowNumber <= maxWhiteRowNumber) {
      className += " field__element_reversed";
    }

    return className;
  };

  render() {
    const { validMoves, position } = this.props;
    return (
      <div
        role='presentation'
        className={`${this.checkClassName()}${
          validMoves.includes(position) ? " field__element_valid" : ""
        }`}
      />
    );
  }
}
