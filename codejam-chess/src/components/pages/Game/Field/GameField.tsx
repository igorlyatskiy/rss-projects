import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FigureData } from "../../../Constants";
import "./GameField.sass";
import Square from "./Square/Square";

interface GameFieldProps {
  data: FigureData[][];
}

export default class GameField extends React.PureComponent<GameFieldProps> {
  public keyNumber = 0;

  getKeyNumber = () => {
    this.keyNumber += 1;
    return this.keyNumber;
  };

  render = () => {
    const { data } = this.props;
    return (
      <DndProvider backend={HTML5Backend}>
        <div className='field-container'>
          <div className='field'>
            {data.map((row, rowNumber) => (
              <div key={this.getKeyNumber()} className='field__row'>
                {row.map((element, elementNumber) => (
                  <Square
                    key={this.getKeyNumber()}
                    element={element}
                    elementNumber={elementNumber}
                    rowNumber={rowNumber}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </DndProvider>
    );
  };
}
