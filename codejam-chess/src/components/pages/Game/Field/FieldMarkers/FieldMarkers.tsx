import React from "react";
import Constants, { PlayerData } from "../../../../Constants";

interface FieldMarkersProps {
  activePlayerId: number;
  areFieldMarkersVisible: boolean;
  players: PlayerData[];
  rotated: boolean;
}

export default class FieldMarkers extends React.PureComponent<FieldMarkersProps> {
  getRowClassName = () => {};

  render() {
    const { areFieldMarkersVisible, rotated } = this.props;
    return (
      <div
        className={`field-markers ${areFieldMarkersVisible ? " field-markers_visible" : " field-markers_invisible"}`}
      >
        <div className={`field-markers__row field-markers__row_top${rotated ? "" : " field-markers__row_reversed"}`}>
          {Constants.letters.map((e) => (
            <p className='field-markers__text'>{e}</p>
          ))}
        </div>
        <div className={`field-markers__row field-markers__row_bottom${rotated ? "" : " field-markers__row_reversed"}`}>
          {Constants.letters.map((e) => (
            <p className='field-markers__text'>{e}</p>
          ))}
        </div>
        <div
          className={`field-markers__column field-markers__column_left${
            rotated ? "" : " field-markers__column_reversed"
          }`}
        >
          {Constants.numbers.reverse().map((e) => (
            <p className='field-markers__text'>{e}</p>
          ))}
        </div>
        <div
          className={`field-markers__column field-markers__column_right${
            rotated ? "" : " field-markers__column_reversed"
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
