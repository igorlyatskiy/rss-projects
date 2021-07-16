// import axios from "axios";
// import axios, { AxiosResponse } from "axios";
import React from "react";
import NewChess from "../../../../../chess.js/chess";
import Constants, { FigureData, PlayerData, RequestMove } from "../../../../Constants";
import Bishop from "../../../../Figures/Bishop/Bishop";
import King from "../../../../Figures/King/King";
import Knight from "../../../../Figures/Knight/Knight";
import Pawn from "../../../../Figures/Pawn/Pawn";
import Queen from "../../../../Figures/Queen/Queen";
import Rook from "../../../../Figures/Rook/Rook";
import "./Figure.sass";

const axios = require("axios");

interface FigureProps {
  element: FigureData;
  elementNumber: number;
  rowNumber: number;
  position: string;
  activePlayerId: number;
  isGameProcessActive: boolean;
  chess: NewChess;
  checkValidMoves: (square: string) => void;
  cleanValidMoves: () => void;
  drawField: () => void;
  turnAiMove: () => void;
  turnMove: (data: unknown) => void;
  slowFigureMove: (data: unknown) => void;
  makeFieldMarkersVisible: () => void;
  setWinner: (id: number) => void;
  players: PlayerData[];
  gameType: string;
  wsConnection: WebSocket;
  roomId: number | string;
  time: number;
  winnerId: number;
  checkSquares: string[];
  checkmateSquares: string[];
  getHighlightedSquares: () => void;
  cleanSlowFigureMove: () => void;
  turnReplayMove: () => void;
  selectedPlayerId: number;
  requestMove: RequestMove;
  AILevel: number;
  gamePage: string;
  setPage: (page: string) => void;
}

export default class Figure extends React.PureComponent<FigureProps> {
  public isFigureAlreadyMoved = false;
  getFigure = () => {
    const { elementNumber, rowNumber, element } = this.props;
    const unicId = `${elementNumber}, ${rowNumber}`;

    if (element !== null) {
      switch (element.type) {
        case Constants.FIGURES_NAMES.BISHOP:
          return <Bishop key={unicId} color={element.color} />;
        case Constants.FIGURES_NAMES.KING:
          return <King key={unicId} color={element.color} />;
        case Constants.FIGURES_NAMES.KNIGHT:
          return <Knight key={unicId} color={element.color} />;
        case Constants.FIGURES_NAMES.PAWN:
          return <Pawn key={unicId} color={element.color} />;
        case Constants.FIGURES_NAMES.QUEEN:
          return <Queen key={unicId} color={element.color} />;
        case Constants.FIGURES_NAMES.ROOK:
          return <Rook key={unicId} color={element.color} />;

        default:
          return <div>Unexpected error</div>;
      }
    }
    return null;
  };

  mouseDown = (e: any) => {
    const { currentTarget } = e;
    const leftMouseBtnCode = 0;
    if (e.button !== leftMouseBtnCode) {
      return;
    }
    const { checkValidMoves, position, activePlayerId, players } = this.props;
    checkValidMoves(position);

    const coords = {
      top: currentTarget.getBoundingClientRect().top,
      left: currentTarget.getBoundingClientRect().left,
    };

    const startLeft = parseFloat(currentTarget.style.left);
    const startTop = parseFloat(currentTarget.style.top);

    const shiftX = e.pageX - coords.left;
    const shiftY = e.pageY - coords.top;

    const startX = e.pageX - startLeft - shiftX;
    const startY = e.pageY - startTop - shiftY;

    const startPageX = e.pageX;
    const startPageY = e.pageY;

    const reverseCoef = players[activePlayerId - 1].color === "w" ? 1 : -1;

    const moveAt = (event: MouseEvent) => {
      currentTarget.style.left = `${startPageX - reverseCoef * (startPageX - event.pageX) - shiftX - startX}px`;
      currentTarget.style.top = `${startPageY - reverseCoef * (startPageY - event.pageY) - shiftY - startY}px`;
    };
    moveAt(e);

    document.onmousemove = (action: MouseEvent) => {
      moveAt(action);
    };

    window.onblur = () => {
      currentTarget.style.left = `${startLeft}px`;
      currentTarget.style.top = `${startTop}px`;
      document.onmousemove = null;
      document.onmouseup = null;
    };

    document.onmouseup = () => {
      const { cleanValidMoves } = this.props;
      this.checkFigurePosition(currentTarget, startLeft, startTop);
      this.checkMove(currentTarget, startTop, startLeft);
      cleanValidMoves();
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  checkMove = (paramTarget: HTMLElement, startTop: number, startLeft: number) => {
    const currentTarget = paramTarget;
    const { position, chess } = this.props;
    const moveToBottom = (startTop - parseFloat(currentTarget.style.top)) / Constants.squareSize;
    const moveToRight = (startLeft - parseFloat(currentTarget.style.left)) / Constants.squareSize;
    const newPosition = `${Constants.letters[Constants.letters.indexOf(position[0]) - moveToRight]}${
      +position[1] + moveToBottom
    }`;

    const moveStatus = chess.move({ from: position, to: newPosition, promotion: "q" });
    if (moveStatus) {
      this.makeMove(position, newPosition, chess);
    } else {
      currentTarget.style.left = `${startLeft}px`;
      currentTarget.style.top = `${startTop}px`;
    }
  };

  makeMove = async (position: string, newPosition: string, chess: NewChess) => {
    const {
      drawField,
      wsConnection,
      roomId,
      time,
      gameType,
      turnMove,
      element,
      getHighlightedSquares,
      makeFieldMarkersVisible,
    } = this.props;
    drawField();
    const baseURL = process.env.REACT_APP_FULL_SERVER_URL;
    const url = `${baseURL}/move?id=${roomId}&from=${position}&to=${newPosition}&time=${time}&color=${element.color}&piece=${element.type}`;
    const getRoomUrl = `${baseURL}/rooms?id=${roomId}`;
    if (gameType === Constants.PVP_ONLINE_NAME) {
      const message = {
        event: "move",
        payload: {
          from: position,
          to: newPosition,
          promotion: "q",
          roomId,
          time,
          color: element.color,
          piece: element.type,
        },
      };
      await wsConnection.send(JSON.stringify(message));
      const getRoomInfo = await axios.get(getRoomUrl);
      turnMove(getRoomInfo);
      getHighlightedSquares();
    } else {
      const moveFigure = await axios({
        method: "post",
        url,
        mode: "cors",
      });
      if (moveFigure.status === 200) {
        await this.checkGameStatus(chess, baseURL as string, roomId as string);
        const getRoomInfo = await axios.get(getRoomUrl);
        turnMove(getRoomInfo);
        if (gameType === Constants.AI_NAME) {
          this.turnAiMove(chess);
        } else {
          setTimeout(() => makeFieldMarkersVisible, Constants.BOARD_ROTATION_TIME);
        }
        getHighlightedSquares();
      }
    }
  };

  turnAiMove = (chess: NewChess) => {
    const { AILevel, slowFigureMove } = this.props;
    const move = chess.moveAI(AILevel);
    if (move !== null && move !== undefined) {
      setTimeout(() => {
        slowFigureMove(move);
      }, Constants.FIGURE_WAITING_TIME);
    }
  };

  checkGameStatus = async (chess: NewChess, baseURL: string, roomId: string) => {
    const { wsConnection, gameType, players } = this.props;
    if (!chess.isGameActive()) {
      console.log("set winner");
      const loserColor = chess.turn();
      const winner = players.find((e) => e.color !== loserColor);
      if (gameType === Constants.PVP_ONLINE_NAME) {
        const data = {
          event: "finish-game",
          payload: {
            winnerId: winner?.id,
            draw: !chess.inCheckmate(),
            roomId,
          },
        };
        wsConnection.send(JSON.stringify(data));
      } else if (chess.inCheckmate()) {
        const setWinnerUrl = `${baseURL}/room/winner?id=${roomId}&winnerId=${winner?.id}`;
        await axios.post(setWinnerUrl);
      } else {
        const setDrawUrl = `${baseURL}/room/draw?id=${roomId}`;
        await axios.post(setDrawUrl);
      }
    }
  };

  checkFigurePosition = (target: HTMLElement, startLeftParam: number, startTopParam: number) => {
    const currentTarget = target;
    const startLeft = startLeftParam;
    const startTop = startTopParam;

    const left = parseFloat(currentTarget.style.left);
    const top = parseFloat(currentTarget.style.top);
    const leftFloat = left % Constants.squareSize;
    const topFloat = top % Constants.squareSize;

    currentTarget.style.left =
      leftFloat > Constants.squareSize / 2 ? `${left - leftFloat + Constants.squareSize}px` : `${left - leftFloat}px`;

    currentTarget.style.top =
      topFloat > Constants.squareSize / 2 ? `${top - topFloat + Constants.squareSize}px` : `${top - topFloat}px`;

    if (
      left < -Constants.squareSize / 2 ||
      left > (Constants.rowNumbers - 0.5) * Constants.squareSize ||
      top < -Constants.squareSize / 2 ||
      top > (Constants.rowNumbers - 0.5) * Constants.squareSize
    ) {
      currentTarget.style.left = `${startLeft}px`;
      currentTarget.style.top = `${startTop}px`;
    }
  };

  startDrag = (e: any) => {
    e.preventDefault();
    return false;
  };

  moveFigureWithTimeout = () => {
    const {
      gamePage,
      requestMove,
      chess,
      cleanSlowFigureMove,
      turnMove,
      roomId,
      gameType,
      element,
      getHighlightedSquares,
      turnReplayMove,
    } = this.props;
    setTimeout(async () => {
      chess.move({
        from: requestMove.move?.from as string,
        to: requestMove.move?.to as string,
        promotion: "q",
      });
      await this.checkGameStatus(chess, process.env.REACT_APP_FULL_SERVER_URL as string, roomId as string);
      if (gamePage !== Constants.APP_PAGES.REPLAY) {
        const baseURL = process.env.REACT_APP_FULL_SERVER_URL;
        const { time } = this.props;
        const moveUrl = `${baseURL}/move?id=${roomId}&from=${requestMove.move?.from}&to=${requestMove.move?.to}&time=${time}&color=${element.color}&piece=${element.type}`;
        const getRoomUrl = `${baseURL}/rooms?id=${roomId}`;
        if (gameType === Constants.PVP_ONLINE_NAME) {
          const data = await axios.get(getRoomUrl);
          turnMove(data);
          this.isFigureAlreadyMoved = false;
          cleanSlowFigureMove();
          getHighlightedSquares();
        } else {
          const responce = await axios.post(moveUrl);
          if (responce.status === 200) {
            const data = await axios.get(getRoomUrl);
            turnMove(data);
            this.isFigureAlreadyMoved = false;
            cleanSlowFigureMove();
            getHighlightedSquares();
          }
        }
      } else {
        cleanSlowFigureMove();
        turnReplayMove();
        getHighlightedSquares();
      }
    }, Constants.FIGURE_MOVEMENT_TIME);
  };

  getBlockedClassname = () => {
    const { gameType, activePlayerId, element, selectedPlayerId, players } = this.props;
    const playerId = players.find((e) => e.color === element.color)?.id;

    switch (gameType) {
      case Constants.PVP_OFFLINE_NAME: {
        if (activePlayerId !== playerId) {
          return " figure-container_blocked";
        }
        break;
      }
      case Constants.PVP_ONLINE_NAME: {
        if (selectedPlayerId !== activePlayerId || selectedPlayerId !== playerId) {
          return " figure-container_blocked";
        }
        break;
      }
      case Constants.AI_NAME: {
        if (selectedPlayerId !== activePlayerId || selectedPlayerId !== playerId) {
          return " figure-container_blocked";
        }
        break;
      }
      default:
        return "";
    }
    return "";
  };

  getReversedClassName = () => {
    const { element } = this.props;
    return element.color === Constants.FIGURES_COLORS_NAMES.black ? " figure-container_reversed" : "";
  };

  render() {
    const { rowNumber, elementNumber, requestMove, position } = this.props;
    let newRowNumber = rowNumber;
    let newColNumber = elementNumber;
    if (requestMove.status === true && position === requestMove.move?.from) {
      newRowNumber = Constants.rowNumbers - +requestMove.move?.to[1];
      newColNumber = Constants.letters.indexOf(requestMove.move.to[0]);
      if (this.isFigureAlreadyMoved === false) {
        this.moveFigureWithTimeout();
        this.isFigureAlreadyMoved = true;
      }
    }
    return (
      <div
        role='presentation'
        className={`figure-container
          ${this.getBlockedClassname()}
          ${this.getReversedClassName()}
          ${requestMove.status === true ? " figure-container_long-move" : ""}`}
        onMouseDown={this.mouseDown}
        onDragStart={this.startDrag}
        style={{
          top: `${Constants.squareSize * newRowNumber}px`,
          left: `${Constants.squareSize * newColNumber}px`,
        }}
        draggable
      >
        {this.getFigure()}
      </div>
    );
  }
}
