import React, { SyntheticEvent } from "react";
import Constants, { FigureData } from "../../../Constants";
import "./GameField.sass";
import Square from "./Square/Square";

interface GameFieldProps {
  data: FigureData[][];
  getValidMoves: (square: string) => void;
  validMoves: string[];
}

export default class GameField extends React.PureComponent<GameFieldProps> {
  public keyNumber = 0;

  checkSquares = (e: SyntheticEvent) => {
    const element = e.target as HTMLElement;
    console.log(element);
  };

  getKeyNumber = () => {
    this.keyNumber += 1;
    return this.keyNumber;
  };

  getSquareDataKey = (rowNumber: number, elementNumber: number) =>
    `${Constants.letters[elementNumber]}${rowNumber + 1}`;

  render = () => {
    const { data, getValidMoves, validMoves } = this.props;
    return (
      <div className='field-container'>
        <div
          className='field'
          role='presentation'
          onMouseDown={this.checkSquares}
        >
          {data.map((row, rowNumber) => (
            <div key={this.getKeyNumber()} className='field__row'>
              {row.map((element, elementNumber) => (
                <Square
                  validMoves={validMoves}
                  getValidMoves={getValidMoves}
                  key={this.getKeyNumber()}
                  element={element}
                  elementNumber={elementNumber}
                  rowNumber={rowNumber}
                  position={this.getSquareDataKey(rowNumber, elementNumber)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };
}
