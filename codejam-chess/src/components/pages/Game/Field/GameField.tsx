import React from "react";

interface GameFieldProps {
  data: string[][];
}

export default class GameField extends React.PureComponent<GameFieldProps> {
  render() {
    // const { data } = this.props;
    return (
      <div className='field-container'>
        <div className='field'>
          {/* {data.map((row) => (
            <div className='field__row'>
              {row.map((element) => (
                <div key={row[row.length - 1]} className='field__element'>
                  {element}
                </div>
              ))}
            </div>
          ))} */}
        </div>
      </div>
    );
  }
}
