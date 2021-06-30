import React from "react";
import Constants from "../../../../Constants";

interface FieldMarkersProps {
  activePlayerId: number;
  areFieldMarkersVisible: boolean;
}

export default class FieldMarkers extends React.PureComponent<FieldMarkersProps> {
  render() {
    const { activePlayerId, areFieldMarkersVisible } = this.props;
    return (
      <div
        className={`field-markers ${areFieldMarkersVisible ? " field-markers_visible" : " field-markers_invisible"}`}
      >
        <div className={`field-markers__row field-markers__row_top${
            activePlayerId === 1 ? "" : " field-markers__row_reversed"
          }`}>
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
    );
  }
}
