import React from "react";
import Constants, { FigureData } from "../../../Constants";
import FieldMarkers from "./FieldMarkers/FieldMarkers";
import Figure from "./Figure/Figure";
import "./GameField.sass";
import Square from "./Square/Square";

const Chess = require("chess.js");

interface GameFieldProps {
  data: FigureData[][];
  checkValidMoves: (square: string) => void;
  validMoves: string[];
  activePlayerId: number;
  isGameProcessActive: boolean;
  chess: typeof Chess;
  cleanValidMoves: () => void;
  drawField: () => void;
  turnMove: () => void;
  makeFieldMarkersVisible: () => void;
  areFieldMarkersVisible: boolean;
}

export default class GameField extends React.PureComponent<GameFieldProps> {
  public markersClassName: string = "";
  public keyNumber = 0;

  getKeyNumber = () => {
    this.keyNumber += 1;
    return this.keyNumber;
  };

  getPositionKey = (rowNumber: number, elementNumber: number) =>
    `${Constants.letters[elementNumber]}${Constants.rowNumbers - rowNumber}`;

  render = () => {
    const {
      data,
      checkValidMoves,
      validMoves,
      activePlayerId,
      isGameProcessActive,
      chess,
      cleanValidMoves,
      drawField,
      turnMove,
      areFieldMarkersVisible,
      makeFieldMarkersVisible,
    } = this.props;
    return (
      <div className='field-container'>
        <FieldMarkers activePlayerId={activePlayerId} areFieldMarkersVisible={areFieldMarkersVisible} />
        <div className={`field${activePlayerId === 1 ? "" : " field_rotated"}`}>
          {data.map((row, rowNumber) => (
            <div key={this.getKeyNumber()} className='field__row'>
              {row.map((element, elementNumber) => (
                <Square
                  validMoves={validMoves}
                  key={this.getKeyNumber()}
                  elementNumber={elementNumber}
                  rowNumber={rowNumber}
                  position={this.getPositionKey(rowNumber, elementNumber)}
                />
              ))}
            </div>
          ))}

          {data.map((row, rowNumber) => (
            <>
              {row.map(
                (element, elementNumber) =>
                  element !== null && (
                    <Figure
                      element={element}
                      elementNumber={elementNumber}
                      rowNumber={rowNumber}
                      position={this.getPositionKey(rowNumber, elementNumber)}
                      activePlayerId={activePlayerId}
                      isGameProcessActive={isGameProcessActive}
                      chess={chess}
                      checkValidMoves={checkValidMoves}
                      cleanValidMoves={cleanValidMoves}
                      drawField={drawField}
                      turnMove={turnMove}
                      makeFieldMarkersVisible={makeFieldMarkersVisible}
                    />
                  )
              )}
            </>
          ))}
        </div>
      </div>
    );
  };
}
