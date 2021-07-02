import Constants from "../components/Constants";
import ChessConstants, { FigureMovement } from "./Constants";

export default class NewChess {
  public chessBoard = ChessConstants.defaultBoard;
  public activePlayer = ChessConstants.WHITE;
  public gameHistory = [];

  board = () => this.chessBoard;

  reset = () => {
    this.chessBoard = ChessConstants.defaultBoard;
  }

  turn = () => {
    this.activePlayer = (this.activePlayer === ChessConstants.WHITE) ? ChessConstants.BLACK : ChessConstants.WHITE;
  }

  move = (movement: FigureMovement) => {
    const { from, to } = movement;
    if (this.getSquare(from) !== undefined && this.getSquare(to) !== undefined) {
      const [moveFromRow, moveFromColumn] = this.getSquareIndex(from);
      const [moveToRow, moveToColumn] = this.getSquareIndex(to);
      const moveFrom = this.chessBoard[moveFromRow][moveFromColumn]
      const moveTo = this.chessBoard[moveToRow][moveToColumn]
      if (moveFrom !== null && moveTo !== moveFrom) {
        this.chessBoard[moveToRow][moveToColumn] = { ...moveFrom }
        this.chessBoard[moveFromRow][moveFromColumn] = null;
      }
    }
    return null;
  }

  getSquare = (square: string) => {
    const [rowNumber, colNumber] = this.getSquareIndex(square);
    return this.chessBoard[rowNumber][colNumber]
  }

  getSquareByIndex = (row: number, col: number) => {
    if (this.chessBoard[row] === undefined) {
      return undefined
    };
    return this.chessBoard[row][col];
  }


  getSquareIndex = (square: string) => {
    const rowNumber = Constants.rowNumbers - (+square[1]);
    const columnNumber = Constants.letters.indexOf(square[0]);
    return [rowNumber, columnNumber]
  }

  getSquareNameByIndex = (row: number, col: number) => {
    const letter = Constants.letters[col];
    const number = Constants.rowNumbers - row;
    return `${letter}${number}`;
  }

  getAttackedNameByIndex = (row: number, col: number) => {
    const letter = Constants.letters[col];
    const number = Constants.rowNumbers - row;
    return `${letter}${number}x`;
  }

  moves = (square: string) => {
    const ableMoves: string[] = [];
    const figure = this.getSquare(square)?.type;
    if (figure !== null) {
      switch (figure) {
        case 'r': {
          const [rowNumber, colNumber] = this.getSquareIndex(square);
          let i = rowNumber - 1;
          while (this.getSquareByIndex(i, colNumber) === null && i >= 0 && i < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, colNumber))
            i -= 1;
          }
          if (this.getSquareByIndex(i, colNumber) !== undefined && this.getSquareByIndex(i, colNumber)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(i, colNumber));
          }

          i = rowNumber + 1;
          while (this.getSquareByIndex(i, colNumber) === null && i >= 0 && i < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, colNumber))
            i += 1;
          }
          if (this.getSquareByIndex(i, colNumber) !== undefined && this.getSquareByIndex(i, colNumber)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(i, colNumber));
          }


          i = colNumber - 1;
          while (this.getSquareByIndex(rowNumber, i) === null) {
            ableMoves.push(this.getSquareNameByIndex(rowNumber, i))
            i -= 1;
          }
          if (this.getSquareByIndex(rowNumber, i) !== undefined && this.getSquareByIndex(rowNumber, i)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber, i));
          }
          i = colNumber + 1;
          while (this.getSquareByIndex(rowNumber, i) === null) {
            ableMoves.push(this.getSquareNameByIndex(rowNumber, i))
            i += 1;
          }
          if (this.getSquareByIndex(rowNumber, i) !== undefined && this.getSquareByIndex(rowNumber, i)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber, i));
          }
          console.log(ableMoves);
        }
          break;

        case 'q': {
          const [rowNumber, colNumber] = this.getSquareIndex(square);
          let i = rowNumber - 1;
          if (this.getSquareByIndex(i, colNumber) !== null) {
            while (this.getSquareByIndex(i, colNumber) === null) {
              ableMoves.push(this.getSquareNameByIndex(i, colNumber))
              i -= 1;
            }
          }
        }
          break;
        default:
          break;
      }
    }
    return ableMoves;
  }

  oppositeColor = () =>
    (this.activePlayer === ChessConstants.WHITE) ? ChessConstants.BLACK : ChessConstants.WHITE;

  history = () => this.gameHistory;
}
