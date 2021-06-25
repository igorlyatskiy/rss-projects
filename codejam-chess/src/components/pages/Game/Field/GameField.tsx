import React from "react";
import { FieldDataItem } from "../../../../store/initialFieldState";
import "./GameField.sass";

interface GameFieldProps {
  data: FieldDataItem[][];
}

export default class GameField extends React.PureComponent<GameFieldProps> {
  checkClassName = (rowNumber: number, elementNumber: number) => {
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

  render = () => {
    const { data } = this.props;
    return (
      <div className='field-container'>
        <div className='field'>
          {data.map((row, rowNumber) => (
            <div className='field__row'>
              {row.map((element, elementNumber) => (
                <div
                  key={element.id}
                  className={this.checkClassName(rowNumber, elementNumber)}
                >
                  {element.figure?.render()}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };
}
