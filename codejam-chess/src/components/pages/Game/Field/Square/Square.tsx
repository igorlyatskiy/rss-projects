import React from "react";

interface SquareProps {
  rowNumber: number;
  elementNumber: number;
  position: string;
  validMoves: string[];
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
    const { validMoves, position } = this.props;
    return (
      <div
        className={`${this.checkClassName()}
          ${
            validMoves.includes(position) || validMoves.map((el) => el.substr(0, 2)).includes(position)
              ? " field__element_valid"
              : ""
          }`}
      >
        <div className={validMoves.includes(`${position}x`) ? "field__dot field__dot_damaged" : "field__dot"} />
      </div>
    );
  }
}
