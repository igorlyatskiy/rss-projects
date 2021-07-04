import { Chess, PartialMove } from '@lubert/chess.ts'
import Constants from '../components/Constants';
import ChessConstants from "./Constants";


export default class NewChess {
  public chess = new Chess();
  public checkSquares: string[] = []
  public activePlayer: string = ''

  turn = () => {
    const returnValue = this.chess.turn();
    this.activePlayer = returnValue;
    this.checkSquares = [];
    if (this.chess.inCheck()) {
      if (this.chess.inCheckmate()) {
        console.log('checkmate');
      } else {
        this.getCheckMoves();
      }
    }
    return returnValue
  }

  move = (object: string | PartialMove) => this.chess.move(object);

  board = () => this.chess.board();

  reset = () => this.chess.reset();

  moves = (data: string) => {
    const moves = this.chess.moves({ square: data });
    return moves
      .map((e) => {
        const reg = /\w\d/g;
        const result: any = e.match(reg);
        if (e.includes('x')) {
          return `${result[0]}x`;
        }
        if (result === null) {
          if (e === "O-O") {
            switch (this.activePlayer) {
              case ChessConstants.WHITE:
                return 'g1-O';
              case ChessConstants.BLACK:
                return 'g8-O'
              default:
                break;
            }
          }
          if (e === "O-O-O") {
            switch (this.activePlayer) {
              case ChessConstants.WHITE:
                return 'c1-O-O';
              case ChessConstants.BLACK:
                return 'c8-O-O'
              default:
                break;
            }
          }
          return e;
        }
        return result[0];
      })
  }
  history = () => this.chess.history();

  getKingPosition = () => {
    let kingRow
    let kingCol;
    for (let i = 0; i < Constants.rowNumbers; i += 1) {
      for (let j = 0; j < Constants.rowNumbers; j += 1) {
        if (this.chess.board()[i][j]?.color === this.activePlayer && this.chess.board()[i][j]?.type === 'k') {
          kingRow = i;
          kingCol = j;
        }
      }
    }
    if (kingRow !== undefined && kingCol !== undefined) {
      const square = this.getSquareNameByIndex(kingRow, kingCol);
      return square;
    }
    return null;
  }

  getSquare = (square: string) => {
    const [rowNumber, colNumber] = this.getSquareIndex(square);
    return this.chess.board()[rowNumber][colNumber]
  }

  getSquareByIndex = (row: number, col: number) => {
    if (this.chess.board()[row] === undefined) {
      return undefined
    };
    return this.chess.board()[row][col];
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

  getAttackCheckMoves = (square: string) => {
    const ableMoves: string[] = [];
    const figure = this.getSquare(square);
    const [rowNumber, colNumber] = this.getSquareIndex(square);
    if (figure !== null) {
      switch (figure.type) {

        case 'p': {
          const coef = (this.activePlayer === ChessConstants.BLACK) ? 1 : -1;
          if (this.getSquareNameByIndex(rowNumber - coef, colNumber - coef) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber - coef, colNumber - coef))
          }
          if (this.getSquareNameByIndex(rowNumber - coef, colNumber - coef) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber - coef, colNumber + coef))
          }
        }
          break;

        case 'k':
          for (let i = -1; i <= 1; i += 1) {
            for (let j = -1; j <= 1; j += 1) {
              if (this.getSquareNameByIndex(rowNumber + i, colNumber + j) === this.getKingPosition()) {
                ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j))
              }
            }
          }
          break;

        case 'r': {
          let i = rowNumber - 1;
          while (this.getSquareByIndex(i, colNumber) === null && i >= 0 && i < Constants.rowNumbers) {
            i -= 1;
          }
          if (this.getSquareNameByIndex(i, colNumber) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(i, colNumber));
            i = rowNumber - 1;
            while (this.getSquareNameByIndex(i, colNumber) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(i, colNumber))
              i -= 1;
            }
          }


          i = rowNumber + 1;
          while (this.getSquareByIndex(i, colNumber) === null && i >= 0 && i < Constants.rowNumbers) {
            i += 1;
          }
          if (this.getSquareNameByIndex(i, colNumber) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(i, colNumber));
            i = rowNumber + 1
            while (this.getSquareNameByIndex(i, colNumber) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(i, colNumber))
              i += 1;
            }
          }


          i = colNumber - 1;
          while (this.getSquareByIndex(rowNumber, i) === null) {
            i -= 1;
          }
          if (this.getSquareNameByIndex(rowNumber, i) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber, i));
            i = colNumber - 1;
            while (this.getSquareNameByIndex(rowNumber, i) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(rowNumber, i));
              i -= 1;
            }
          }


          i = colNumber + 1;
          while (this.getSquareByIndex(rowNumber, i) === null) {
            i += 1;
          }
          if (this.getSquareNameByIndex(rowNumber, i) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber, i));
            i = colNumber + 1;
            while (this.getSquareNameByIndex(rowNumber, i) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(rowNumber, i));
              i += 1;
            }
          }

        }
          break;

        case 'n': {
          let i = 2;
          let j = 1;
          if (this.getSquareNameByIndex(rowNumber + i, colNumber + j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          i = 1;
          j = 2;
          if (this.getSquareNameByIndex(rowNumber + i, colNumber + j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          i = -1;
          j = 2;
          if (this.getSquareNameByIndex(rowNumber + i, colNumber + j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          i = -2;
          j = 1;
          if (this.getSquareNameByIndex(rowNumber + i, colNumber + j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          i = -1;
          j = -2;
          if (this.getSquareNameByIndex(rowNumber + i, colNumber + j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          i = -2;
          j = -1;
          if (this.getSquareNameByIndex(rowNumber + i, colNumber + j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          i = 1;
          j = -2;
          if (this.getSquareNameByIndex(rowNumber + i, colNumber + j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
          i = 2;
          j = -1;
          if (this.getSquareNameByIndex(rowNumber + i, colNumber + j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber + i, colNumber + j));
          }
        }
          break;

        case 'b': {
          let i = rowNumber - 1;
          let j = colNumber - 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            i -= 1;
            j -= 1;
          }
          if (this.getSquareNameByIndex(i, j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
            i = rowNumber - 1;
            j = colNumber - 1;
            while (this.getSquareNameByIndex(i, j) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(i, j))
              i -= 1;
              j -= 1;
            }
          }

          i = rowNumber + 1;
          j = colNumber - 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            i += 1;
            j -= 1;
          }
          if (this.getSquareNameByIndex(i, j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
            i = rowNumber + 1;
            j = colNumber - 1;
            while (this.getSquareNameByIndex(i, j) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(i, j))
              i += 1;
              j -= 1;
            }
          }

          i = rowNumber - 1;
          j = colNumber + 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            i -= 1;
            j += 1;
          }
          if (this.getSquareNameByIndex(i, j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
            i = rowNumber - 1;
            j = colNumber + 1;
            while (this.getSquareNameByIndex(i, j) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(i, j))
              i -= 1;
              j += 1;
            }
          }

          i = rowNumber + 1;
          j = colNumber + 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            i += 1;
            j += 1;
          }
          if (this.getSquareNameByIndex(i, j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
            i = rowNumber + 1;
            j = colNumber + 1;
            while (this.getSquareNameByIndex(i, j) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(i, j))
              i += 1;
              j += 1;
            }
          }
        }
          break;

        case 'q': {
          let i = rowNumber - 1;
          let j;
          while (this.getSquareByIndex(i, colNumber) === null && i >= 0 && i < Constants.rowNumbers) {
            i -= 1;
          }
          if (this.getSquareNameByIndex(i, colNumber) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(i, colNumber));
            i = rowNumber - 1;
            while (this.getSquareNameByIndex(i, colNumber) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(i, colNumber))
              i -= 1;
            }
          }


          i = rowNumber + 1;
          while (this.getSquareByIndex(i, colNumber) === null && i >= 0 && i < Constants.rowNumbers) {
            i += 1;
          }
          if (this.getSquareNameByIndex(i, colNumber) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(i, colNumber));
            i = rowNumber + 1
            while (this.getSquareNameByIndex(i, colNumber) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(i, colNumber))
              i += 1;
            }
          }


          i = colNumber - 1;
          while (this.getSquareByIndex(rowNumber, i) === null) {
            i -= 1;
          }
          if (this.getSquareNameByIndex(rowNumber, i) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber, i));
            i = colNumber - 1;
            while (this.getSquareNameByIndex(rowNumber, i) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(rowNumber, i));
              i -= 1;
            }
          }


          i = colNumber + 1;
          while (this.getSquareByIndex(rowNumber, i) === null) {
            i += 1;
          }
          if (this.getSquareNameByIndex(rowNumber, i) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(rowNumber, i));
            i = colNumber + 1;
            while (this.getSquareNameByIndex(rowNumber, i) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(rowNumber, i));
              i += 1;
            }
          }
          i = rowNumber - 1;
          j = colNumber - 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            i -= 1;
            j -= 1;
          }
          if (this.getSquareNameByIndex(i, j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
            i = rowNumber - 1;
            j = colNumber - 1;
            while (this.getSquareNameByIndex(i, j) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(i, j))
              i -= 1;
              j -= 1;
            }
          }

          i = rowNumber + 1;
          j = colNumber - 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            i += 1;
            j -= 1;
          }
          if (this.getSquareNameByIndex(i, j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
            i = rowNumber + 1;
            j = colNumber - 1;
            while (this.getSquareNameByIndex(i, j) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(i, j))
              i += 1;
              j -= 1;
            }
          }

          i = rowNumber - 1;
          j = colNumber + 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            i -= 1;
            j += 1;
          }
          if (this.getSquareNameByIndex(i, j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
            i = rowNumber - 1;
            j = colNumber + 1;
            while (this.getSquareNameByIndex(i, j) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(i, j))
              i -= 1;
              j += 1;
            }
          }

          i = rowNumber + 1;
          j = colNumber + 1;
          while (this.getSquareByIndex(i, j) === null && i >= 0 && i < Constants.rowNumbers && j >= 0 && j < Constants.rowNumbers) {
            i += 1;
            j += 1;
          }
          if (this.getSquareNameByIndex(i, j) === this.getKingPosition()) {
            ableMoves.push(this.getAttackedNameByIndex(i, j));
            i = rowNumber + 1;
            j = colNumber + 1;
            while (this.getSquareNameByIndex(i, j) !== this.getKingPosition()) {
              ableMoves.push(this.getSquareNameByIndex(i, j))
              i += 1;
              j += 1;
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


  getCheckMoves = () => {
    this.checkSquares = [];
    this.chess.board().forEach((row, rowIndex) => {
      row.forEach((element, elementIndex) => {
        if (element?.color === this.oppositeColor()) {
          const moves = this.getAttackCheckMoves(this.getSquareNameByIndex(rowIndex, elementIndex));
          this.checkSquares.push(...moves);
        }
      })
    })
  }

  oppositeColor = () => (this.activePlayer === ChessConstants.WHITE) ? ChessConstants.BLACK : ChessConstants.WHITE;
}