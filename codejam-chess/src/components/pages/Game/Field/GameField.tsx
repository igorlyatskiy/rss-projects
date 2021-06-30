import React from "react";
import Constants, { FigureData } from "../../../Constants";
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

  checkClassName = () => {
    let className = "";
    const { activePlayerId } = this.props;
    className = " field-markers__invisible";
    setTimeout(() => {
      if (activePlayerId === 2) {
        className = "field-markers__row_reversed";
      }
    }, 1200);
    return className;
  };

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
    } = this.props;
    return (
      <div className='field-container'>
        <div className='field-markers'>
          <div className={`field-markers__row field-markers__row_top${this.checkClassName()}`}>
            {Constants.letters.map((e) => (
              <p className='field-markers__text'>{e}</p>
            ))}
          </div>
          <div
            className={`field-markers__row field-markers__row_bottom${
              activePlayerId === 1 ? "" : " field-markers__row_reversed"
            }`}
          >
            {Constants.letters.map((e) => (
              <p className='field-markers__text'>{e}</p>
            ))}
          </div>
          <div
            className={`field-markers__column field-markers__column_left${
              activePlayerId === 1 ? "" : " field-markers__column_reversed"
            }`}
          >
            {Constants.numbers.reverse().map((e) => (
              <p className='field-markers__text'>{e}</p>
            ))}
          </div>
          <div
            className={`field-markers__column field-markers__column_right${
              activePlayerId === 1 ? "" : " field-markers__column_reversed"
            }`}
          >
            {Constants.numbers.map((e) => (
              <p className='field-markers__text'>{e}</p>
            ))}
          </div>
        </div>
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
