export interface FigureMovement {
  from: string,
  to: string
}

export default class ChessConstants {
  static BLACK = 'b';
  static WHITE = 'w';
  static defaultBoard = [
    [{ type: 'r', color: 'b' },
    { type: 'n', color: 'b' },
    { type: 'b', color: 'b' },
    { type: 'q', color: 'b' },
    { type: 'k', color: 'b' },
    { type: 'b', color: 'b' },
    { type: 'n', color: 'b' },
    { type: 'r', color: 'b' }],
    [{ type: "p", color: "b" },
    { type: "p", color: "b" },
    { type: "p", color: "b" },
    { type: "p", color: "b" },
    { type: "p", color: "b" },
    { type: "p", color: "b" },
    { type: "p", color: "b" },
    { type: "p", color: "b" },],
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null,],
    [{ type: "p", color: "w" },
    { type: "p", color: "w" },
    { type: "p", color: "w" },
    { type: "p", color: "w" },
    { type: "p", color: "w" },
    { type: "p", color: "w" },
    { type: "p", color: "w" },
    { type: "p", color: "w" },],
    [{ type: 'r', color: 'w' },
    { type: 'n', color: 'w' },
    { type: 'b', color: 'w' },
    { type: 'q', color: 'w' },
    { type: 'k', color: 'w' },
    { type: 'b', color: 'w' },
    { type: 'n', color: 'w' },
    { type: 'r', color: 'w' }]]
}