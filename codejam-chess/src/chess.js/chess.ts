import Constants from "../components/Constants";
import ChessConstants, { FigureMovement } from "./Constants";

export default class NewChess {
  public chessBoard = ChessConstants.defaultBoard;
  activePlayer = ChessConstants.WHITE;

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
      return 'a';
    }
    return null;
  }

  moves = () => {

  }

  getSquare = (square: string) => {
    const [rowNumber, colNumber] = this.getSquareIndex(square)
    return this.chessBoard[rowNumber][colNumber]
  }

  getSquareByIndex = (row: number, col: number) => this.chessBoard[row][col];

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

  checkFigureMoves = (square: string) => {
    const ableMoves = [];
    const figure = this.getSquare(square)?.type;
    if (figure !== null) {
      switch (figure) {
        case 'r': {
          const [rowNumber, colNumber] = this.getSquareIndex(square);
          let i = rowNumber - 1;
          if (this.getSquareByIndex(i, colNumber) === null) {
            while (this.getSquareByIndex(i, colNumber) === null) {
              ableMoves.push(this.getSquareNameByIndex(i, colNumber))
              i -= 1;
            }
          }
          i = rowNumber - 1;
          while (this.getSquareByIndex(i, colNumber)?.color !== this.oppositeColor()) {
            ableMoves.push(this.getSquareNameByIndex(i, colNumber))
            i -= 1;
          }
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


}
