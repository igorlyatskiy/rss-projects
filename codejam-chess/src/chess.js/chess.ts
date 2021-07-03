import Constants from "../components/Constants";
import ChessConstants, { FigureMovement } from "./Constants";

export default class NewChess {
  public chessBoard = ChessConstants.defaultBoard;
  public activePlayer = ChessConstants.WHITE;
  public gameHistory = [];
  public didWhiteKingMove = false;
  public didBlackKingMove = false;
  public isWhiteCheckmate = false;
  public isBlackCheckmate = false;
  public checkmateSquares: string[] = []

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
      if (this.moves(movement.from).map((e) => e.substr(0, 2)).includes(movement.to)) {
        const [moveFromRow, moveFromColumn] = this.getSquareIndex(from);
        const [moveToRow, moveToColumn] = this.getSquareIndex(to);
        const moveFrom = this.chessBoard[moveFromRow][moveFromColumn]
        const moveTo = this.chessBoard[moveToRow][moveToColumn]
        if (moveFrom !== null && moveTo !== moveFrom) {
          this.chessBoard[moveToRow][moveToColumn] = { ...moveFrom }
          this.chessBoard[moveFromRow][moveFromColumn] = null;
        }
        return { ...movement, status: true }
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

  checkSituations = () => {

  }

  moves = (square: string) => {
    const ableMoves: string[] = [];
    const figure = this.getSquare(square);
    const [rowNumber, colNumber] = this.getSquareIndex(square);
    if (figure !== null) {
      switch (figure.type) {

        case 'p': {
          const coef = (this.activePlayer === ChessConstants.BLACK) ? - 1 : 1;
          if (coef >= 0) {
            if (rowNumber === 6 && this.getSquareByIndex(rowNumber - 2, colNumber) === null) {
              ableMoves.push(this.getSquareNameByIndex(rowNumber - 2, colNumber))
            }
          }
          if (coef <= 0) {
            if (rowNumber === 1 && this.getSquareByIndex(rowNumber + 2, colNumber) === null) {
              ableMoves.push(this.getSquareNameByIndex(rowNumber + 2, colNumber))
            }
          }
          if (this.getSquareByIndex(rowNumber - coef, colNumber) === null) {
            ableMoves.push(this.getSquareNameByIndex(rowNumber - coef, colNumber))
          }
          if (this.getSquareByIndex(rowNumber - coef, colNumber - coef) !== null &&
            this.getSquareByIndex(rowNumber - coef, colNumber - coef)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber - coef, colNumber - coef))
          }
          if (this.getSquareByIndex(rowNumber - coef, colNumber + coef) !== null &&
            this.getSquareByIndex(rowNumber - coef, colNumber + coef)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber - coef, colNumber + coef))
          }
        }
          break;

        case 'k':
          for (let i = -1; i <= 1; i += 1) {
            for (let j = -1; j <= 1; j += 1) {
              if (this.getSquareByIndex(rowNumber + i, colNumber + j) === null) {
                ableMoves.push(this.getSquareNameByIndex(rowNumber + i, colNumber + j))
              } else if (this.getSquareByIndex(rowNumber + i, colNumber + j)?.color === this.oppositeColor()) {
                ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j))
              }
            }
          }
          if (this.getSquare(square)?.color === this.activePlayer) {
            console.log(this.isKingUnderAttack());
            // if (this.isKingUnderAttack()) {
            //   this.isWhiteCheckmate = (figure.color === ChessConstants.WHITE);
            //   this.isBlackCheckmate = figure.color === ChessConstants.BLACK;
            // }
          }
          break;

        case 'r': {
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
        }
          break;

        case 'n': {
          let i = 2;
          let j = 1;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined && this.getSquareByIndex(rowNumber + i, colNumber + j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) === null) {
            ableMoves.push(this.getSquareNameByIndex(rowNumber + i, colNumber + j));
          }
          i = 1;
          j = 2;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined && this.getSquareByIndex(rowNumber + i, colNumber + j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) === null) {
            ableMoves.push(this.getSquareNameByIndex(rowNumber + i, colNumber + j));
          }
          i = -1;
          j = 2;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined && this.getSquareByIndex(rowNumber + i, colNumber + j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) === null) {
            ableMoves.push(this.getSquareNameByIndex(rowNumber + i, colNumber + j));
          }
          i = -2;
          j = 1;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined && this.getSquareByIndex(rowNumber + i, colNumber + j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) === null) {
            ableMoves.push(this.getSquareNameByIndex(rowNumber + i, colNumber + j));
          }
          i = -1;
          j = -2;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined && this.getSquareByIndex(rowNumber + i, colNumber + j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) === null) {
            ableMoves.push(this.getSquareNameByIndex(rowNumber + i, colNumber + j));
          }
          i = -2;
          j = -1;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined && this.getSquareByIndex(rowNumber + i, colNumber + j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) === null) {
            ableMoves.push(this.getSquareNameByIndex(rowNumber + i, colNumber + j));
          }
          i = 1;
          j = -2;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined && this.getSquareByIndex(rowNumber + i, colNumber + j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) === null) {
            ableMoves.push(this.getSquareNameByIndex(rowNumber + i, colNumber + j));
          }
          i = 2;
          j = -1;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined && this.getSquareByIndex(rowNumber + i, colNumber + j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) === null) {
            ableMoves.push(this.getSquareNameByIndex(rowNumber + i, colNumber + j));
          }
        }
          break;

        case 'b': {
          let i = rowNumber - 1;
          let j = colNumber - 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i -= 1;
            j -= 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined && this.getSquareByIndex(i, j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }

          i = rowNumber + 1;
          j = colNumber - 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i += 1;
            j -= 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined && this.getSquareByIndex(i, j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }

          i = rowNumber - 1;
          j = colNumber + 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i -= 1;
            j += 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined && this.getSquareByIndex(i, j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }

          i = rowNumber + 1;
          j = colNumber + 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i += 1;
            j += 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined && this.getSquareByIndex(i, j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }
        }
          break;

        case 'q': {
          let i = rowNumber - 1;
          let j = colNumber - 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i -= 1;
            j -= 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined && this.getSquareByIndex(i, j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }

          i = rowNumber + 1;
          j = colNumber - 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i += 1;
            j -= 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined && this.getSquareByIndex(i, j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }

          i = rowNumber - 1;
          j = colNumber + 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i -= 1;
            j += 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined && this.getSquareByIndex(i, j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }

          i = rowNumber + 1;
          j = colNumber + 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i += 1;
            j += 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined && this.getSquareByIndex(i, j)?.color === this.oppositeColor()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }

          i = rowNumber - 1;
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
        }
          break;

        default:
          break;
      }
    }
    return ableMoves;
  }

  attackMoves = (square: string) => {
    let ableMoves: string[] = [];
    const figure = this.getSquare(square);
    const [rowNumber, colNumber] = this.getSquareIndex(square);
    if (figure !== null) {
      switch (figure.type) {

        case 'p': {
          const coef = (this.activePlayer === ChessConstants.BLACK) ? 1 : -1;
          if (this.getSquareByIndex(rowNumber - coef, colNumber - coef) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber - coef, colNumber - coef))
          }
          if (this.getSquareByIndex(rowNumber - coef, colNumber + coef) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber - coef, colNumber + coef))
          }
        }
          break;

        case 'k':
          for (let i = -1; i <= 1; i += 1) {
            for (let j = -1; j <= 1; j += 1) {
              ableMoves.push(this.getSquareNameByIndex(rowNumber + i, colNumber + j))
            }
          }
          if (figure.color === this.activePlayer) {
            ableMoves = ableMoves.filter((e) => !this.attackMoves(this.oppositeColor()).includes(e))
            if (figure.color === ChessConstants.WHITE) {
              this.isWhiteCheckmate = true;
            }
            if (figure.color === ChessConstants.BLACK) {
              this.isBlackCheckmate = true;
            }
          }
          break;

        case 'r': {
          let i = rowNumber - 1;
          while (this.getSquareByIndex(i, colNumber) === null && i >= 0 && i < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, colNumber))
            i -= 1;
          }
          if (this.getSquareByIndex(i, colNumber) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(i, colNumber));
          }

          i = rowNumber + 1;
          while (this.getSquareByIndex(i, colNumber) === null && i >= 0 && i < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, colNumber))
            i += 1;
          }
          if (this.getSquareByIndex(i, colNumber) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(i, colNumber));
          }


          i = colNumber - 1;
          while (this.getSquareByIndex(rowNumber, i) === null) {
            ableMoves.push(this.getSquareNameByIndex(rowNumber, i))
            i -= 1;
          }
          if (this.getSquareByIndex(rowNumber, i) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber, i));
          }
          i = colNumber + 1;
          while (this.getSquareByIndex(rowNumber, i) === null) {
            ableMoves.push(this.getSquareNameByIndex(rowNumber, i))
            i += 1;
          }
          if (this.getSquareByIndex(rowNumber, i) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber, i));
          }
        }
          break;

        case 'n': {
          let i = 2;
          let j = 1;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          i = 1;
          j = 2;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          i = -1;
          j = 2;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          i = -2;
          j = 1;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          i = -1;
          j = -2;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          i = -2;
          j = -1;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          i = 1;
          j = -2;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          i = 2;
          j = -1;
          if (this.getSquareByIndex(rowNumber + i, colNumber + j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
        }
          break;

        case 'b': {
          let i = rowNumber - 1;
          let j = colNumber - 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i -= 1;
            j -= 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }

          i = rowNumber + 1;
          j = colNumber - 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i += 1;
            j -= 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }

          i = rowNumber - 1;
          j = colNumber + 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i -= 1;
            j += 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }

          i = rowNumber + 1;
          j = colNumber + 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i += 1;
            j += 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }
        }
          break;

        case 'q': {
          let i = rowNumber - 1;
          let j = colNumber - 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i -= 1;
            j -= 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }

          i = rowNumber + 1;
          j = colNumber - 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i += 1;
            j -= 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }

          i = rowNumber - 1;
          j = colNumber + 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i -= 1;
            j += 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }

          i = rowNumber + 1;
          j = colNumber + 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, j))
            i += 1;
            j += 1;
          }
          if (this.getSquareByIndex(i, j) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
          }

          i = rowNumber - 1;
          while (this.getSquareByIndex(i, colNumber) === null && i >= 0 && i < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, colNumber))
            i -= 1;
          }
          if (this.getSquareByIndex(i, colNumber) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(i, colNumber));
          }

          i = rowNumber + 1;
          while (this.getSquareByIndex(i, colNumber) === null && i >= 0 && i < Constants.rowNumbers) {
            ableMoves.push(this.getSquareNameByIndex(i, colNumber))
            i += 1;
          }
          if (this.getSquareByIndex(i, colNumber) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(i, colNumber));
          }


          i = colNumber - 1;
          while (this.getSquareByIndex(rowNumber, i) === null) {
            ableMoves.push(this.getSquareNameByIndex(rowNumber, i))
            i -= 1;
          }
          if (this.getSquareByIndex(rowNumber, i) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber, i));
          }
          i = colNumber + 1;
          while (this.getSquareByIndex(rowNumber, i) === null) {
            ableMoves.push(this.getSquareNameByIndex(rowNumber, i))
            i += 1;
          }
          if (this.getSquareByIndex(rowNumber, i) !== undefined) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber, i));
          }
        }
          break;

        default:
          break;
      }
    }
    return ableMoves;
  }

  // checkShortCastling = (color: string) => {
  //   if (color === ChessConstants.BLACK) {
  //     // if(this.didBlackKingMove===false && )
  //   }
  //   if (color === ChessConstants.WHITE) {

  //   }
  // }

  isKingUnderAttack = () => {
    this.checkmateSquares = [];
    const king = this.chessBoard.flat().find((e) => e?.color === this.activePlayer && e.type === 'k');
    let kingRow
    let kingCol;
    for (let i = 0; i < Constants.rowNumbers; i += 1) {
      for (let j = 0; j < Constants.rowNumbers; j += 1) {
        if (this.chessBoard[i][j] === king) {
          kingRow = i;
          kingCol = j;
        }
      }
    }
    if (kingRow !== undefined && kingCol !== undefined) {
      const square = this.getSquareNameByIndex(kingRow, kingCol);
      this.chessBoard.forEach((row, rowIndex) => {
        row.forEach((el, colIndex) => {
          if (el?.color === this.activePlayer) {
            this.attackMoves(this.getSquareNameByIndex(rowIndex, colIndex)).forEach((e) => {
              if (e === square) {
                this.checkmateSquares.push(this.getSquareNameByIndex(rowIndex, colIndex));
              }
            });
          }
        })
      })
      return this.checkmateSquares.length !== 0;
    }
    return null;
  }

  oppositeColor = () =>
    (this.activePlayer === ChessConstants.WHITE) ? ChessConstants.BLACK : ChessConstants.WHITE;

  history = () => this.gameHistory;
}
