import React from "react";
import Constants, { FigureData } from "../../../../Constants";
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
}

export default class Figure extends React.PureComponent<FigureProps> {
  public dragStartPosition: number | null = null;
  public dragEndPosition: number | null = null;
  public isDraggable: boolean | null = null;

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
    let startX = e.pageX - parseFloat(currentTarget.style.left);
    let startY = e.pageY - parseFloat(currentTarget.style.top);

    const getCoords = (elem: HTMLElement) => {
      const box = elem.getBoundingClientRect();
      return {
        top: box.top,
        left: box.left,
      };
    };

    const coords = getCoords(currentTarget);
    const shiftX = e.pageX - coords.left;
    const shiftY = e.pageY - coords.top;

    startX -= shiftX;
    startY -= shiftY;

    const moveAt = (event: MouseEvent) => {
      currentTarget.style.left = `${event.pageX - shiftX - startX}px`;
      currentTarget.style.top = `${event.pageY - shiftY - startY}px`;
    };
    moveAt(e);

    document.onmousemove = (action: MouseEvent) => {
      moveAt(action);
    };

    currentTarget.onmouseup = () => {
      const left = parseFloat(currentTarget.style.left);
      const top = parseFloat(currentTarget.style.top);
      const leftFloat = left % Constants.squareSize;
      const topFloat = top % Constants.squareSize;

      currentTarget.style.left =
        leftFloat > Constants.squareSize / 2
          ? `${left - leftFloat + Constants.squareSize}px`
          : `${left - leftFloat}px`;

      currentTarget.style.top =
        topFloat > Constants.squareSize / 2
          ? `${top - topFloat + Constants.squareSize}px`
          : `${top - topFloat}px`;

      document.onmousemove = null;
      currentTarget.onmouseup = null;
    };
  };

  startDrag = (e: any) => {
    e.preventDefault();
    return false;
  };

  render() {
    const { rowNumber, elementNumber } = this.props;
    return (
      <div
        role='presentation'
        className='figure-container'
        onMouseDown={this.mouseDown}
        onDragStart={this.startDrag}
        style={{
          top: `${
            Constants.squareSize * (Constants.rowNumbers - rowNumber - 1)
          }px`,
          left: `${
            Constants.squareSize * (Constants.rowNumbers - elementNumber - 1)
          }px`,
        }}
        draggable
      >
        {this.getFigure()}
      </div>
    );
  }
}
