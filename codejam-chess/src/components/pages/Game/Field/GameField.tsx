import React from "react";
import NewChess from "../../../../chess.js/chess";
import Constants, { FigureData, PlayerData } from "../../../Constants";
import FieldMarkers from "./FieldMarkers/FieldMarkers";
import Figure from "./Figure/Figure";
import "./GameField.sass";
import Square from "./Square/Square";

interface GameFieldProps {
  data: FigureData[][];
  checkValidMoves: (square: string) => void;
  validMoves: string[];
  activePlayerId: number;
  isGameProcessActive: boolean;
  chess: NewChess;
  cleanValidMoves: () => void;
  drawField: () => void;
  turnMove: () => void;
  makeFieldMarkersVisible: () => void;
  areFieldMarkersVisible: boolean;
  squaresThatMadeCheck: string[];
  squaresThatMadeCheckMate: string[];
  setWinner: (id: number) => void;
  players: PlayerData[];
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
      squaresThatMadeCheck,
      squaresThatMadeCheckMate,
      setWinner,
      players,
    } = this.props;
    const player = players.find((e) => e.id === activePlayerId) || { color: null };
    return (
      <div className='field-container'>
        <FieldMarkers activePlayerId={activePlayerId} players={players} areFieldMarkersVisible={areFieldMarkersVisible} />
        <div className={`field${player.color === "w" ? "" : " field_rotated"}`}>
          {data.map((row, rowNumber) => (
            <div key={this.getKeyNumber()} className='field__row'>
              {row.map((element, elementNumber) => (
                <Square
                  validMoves={validMoves}
                  key={this.getKeyNumber()}
                  elementNumber={elementNumber}
                  rowNumber={rowNumber}
                  position={this.getPositionKey(rowNumber, elementNumber)}
                  squaresThatMadeCheck={squaresThatMadeCheck}
                  squaresThatMadeCheckMate={squaresThatMadeCheckMate}
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
                      setWinner={setWinner}
                      players={players}
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
