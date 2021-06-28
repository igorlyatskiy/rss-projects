import React from "react";
import Constants, { FigureData } from "../../../Constants";
import Figure from "./Figure/Figure";
import "./GameField.sass";
import Square from "./Square/Square";

interface GameFieldProps {
  data: FigureData[][];
  getValidMoves: (square: string) => void;
  validMoves: string[];
}

export default class GameField extends React.PureComponent<GameFieldProps> {
  public keyNumber = 0;

  getKeyNumber = () => {
    this.keyNumber += 1;
    return this.keyNumber;
  };

  getPositionKey = (rowNumber: number, elementNumber: number) =>
    `${Constants.letters[elementNumber]}${rowNumber + 1}`;

  render = () => {
    const { data, getValidMoves, validMoves } = this.props;
    return (
      <div className='field-container'>
        <div className='field'>
          {data.map((row, rowNumber) => (
            <div key={this.getKeyNumber()} className='field__row'>
              {row.map((element, elementNumber) => (
                <Square
                  validMoves={validMoves}
                  getValidMoves={getValidMoves}
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
                      key={this.getKeyNumber()}
                      element={element}
                      elementNumber={elementNumber}
                      rowNumber={rowNumber}
                      position={this.getPositionKey(rowNumber, elementNumber)}
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
