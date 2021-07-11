import React from "react";
import NewChess from "../../../../chess.js/chess";
import FigureContainer from "../../../../Containers/FigureContainer";
import Constants, { FigureData, PlayerData } from "../../../Constants";
import FieldMarkers from "./FieldMarkers/FieldMarkers";
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
  turnAiMove: () => void;
  makeFieldMarkersVisible: () => void;
  areFieldMarkersVisible: boolean;
  squaresThatMadeCheck: string[];
  squaresThatMadeCheckMate: string[];
  setWinner: (id: number) => void;
  players: PlayerData[];
  gameType: string;
  selectedPlayerId: number;
  wsConnection: WebSocket;
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
      validMoves,
      activePlayerId,
      areFieldMarkersVisible,
      squaresThatMadeCheck,
      squaresThatMadeCheckMate,
      players,
      gameType,
      selectedPlayerId,
    } = this.props;
    const activePlayer = players.find((e) => e.id === activePlayerId) || { color: null, id: null };
    // const notAiPlayer = players.find((e) => e.id === Constants.NOT_AI_PLAYER_ID) || { color: null, id: null };
    const selectedPlayer = players.find((e) => e.id === selectedPlayerId) || { color: null, id: null };
    return (
      <div className='field-container'>
        <FieldMarkers
          activePlayerId={activePlayerId}
          players={players}
          areFieldMarkersVisible={areFieldMarkersVisible}
        />
        <div
          className={`field
        ${gameType === Constants.PVP_OFFLINE_NAME && activePlayer.color === "b" ? " field_rotated" : " "}
        ${gameType === Constants.PVP_ONLINE_NAME && selectedPlayer.color === "b" ? " field_rotated" : ""}
        ${activePlayerId === selectedPlayerId ? "" : " field_blocked"}
        `}
        >
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
                    <FigureContainer
                      element={element}
                      rowNumber={rowNumber}
                      elementNumber={elementNumber}
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
