import React from "react";
// import { Redirect } from "react-router-dom";
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
  turnMove: (data: unknown) => void;
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
  breakGame: () => void;
  changeActivePage: (page: string) => void;
  boardRotationEnabled: boolean;
}

export default class GameField extends React.PureComponent<GameFieldProps> {
  public markersClassName: string = "";
  public keyNumber = 0;

  getFieldClassName = (
    gameType: string,
    selectedPlayer: PlayerData,
    activePlayer: PlayerData,
    activePlayerId: number,
    selectedPlayerId: number
  ) => {
    const { isGameProcessActive } = this.props;
    let className = "";
    if ((gameType === Constants.PVP_ONLINE_NAME || gameType === Constants.AI_NAME) && selectedPlayer.color === "b") {
      className += " field_rotated";
    }
    if (gameType === Constants.PVP_OFFLINE_NAME && activePlayer.color === "b") {
      className += " field_rotated";
    }
    if (gameType !== Constants.PVP_OFFLINE_NAME && activePlayerId !== selectedPlayerId) {
      className += " field_blocked";
    }
    if (isGameProcessActive === false) {
      className += " field_blocked";
    }
    return className;
  };

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
      boardRotationEnabled,
    } = this.props;
    const activePlayer = players.find((e) => e.id === activePlayerId) || { color: null, id: null };
    const selectedPlayer = players.find((e) => e.id === selectedPlayerId) || { color: null, id: null };
    return (
      <div className='field-container'>
        {data.length > 1 && (
          <>
            <FieldMarkers
              activePlayerId={activePlayerId}
              players={players}
              areFieldMarkersVisible={areFieldMarkersVisible}
              rotated={
                !this.getFieldClassName(
                  gameType,
                  selectedPlayer as PlayerData,
                  activePlayer as PlayerData,
                  activePlayerId,
                  selectedPlayerId
                ).includes("field_rotated")
              }
            />
            <div
              className={`field ${this.getFieldClassName(
                gameType,
                selectedPlayer as PlayerData,
                activePlayer as PlayerData,
                activePlayerId,
                selectedPlayerId
              )}`}
              style={{
                transition: `${
                  boardRotationEnabled && gameType === Constants.PVP_OFFLINE_NAME
                    ? `all linear ${Constants.BOARD_ROTATION_TIME}ms`
                    : ""
                }`,
              }}
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
          </>
        )}
        {data.length <= 1 && gameType !== Constants.PVP_ONLINE_NAME && (
          <div className='error'>Game is not active. Please go to the main.</div>
        )}
      </div>
    );
  };
}
