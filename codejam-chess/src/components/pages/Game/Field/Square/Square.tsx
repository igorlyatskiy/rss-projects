import React from "react";
import Constants, { FigureData } from "../../../../Constants";
import Bishop from "../../../../Figures/Bishop/Bishop";
import King from "../../../../Figures/King/King";
import Knight from "../../../../Figures/Knight/Knight";
import Pawn from "../../../../Figures/Pawn/Pawn";
import Queen from "../../../../Figures/Queen/Queen";
import Rook from "../../../../Figures/Rook/Rook";

interface SquareProps {
  element: FigureData;
  rowNumber: number;
  elementNumber: number;
}

export default class Square extends React.PureComponent<SquareProps> {
  getFigure = () => {
    const { elementNumber, rowNumber,element } = this.props;
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
    return <div className={this.checkClassName()}>{this.getFigure()}</div>;
  }
}
