// import axios from "axios";
// import axios, { AxiosResponse } from "axios";
import { PieceSymbol } from "@lubert/chess.ts";
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
  speed: number;
  boardRotationEnabled: boolean;
  isAutopromotionEnabled: boolean;
}

interface FigureState {
  isPromotionWaitingActive: boolean;
}

export default class Figure extends React.Component<FigureProps, FigureState> {
  public isFigureAlreadyMoved = false;
  public promotionPosition: string = "";
  public promotionNewPosition: string = "";
  public currentTarget: HTMLElement | null = null;
  public startTop: number = 0;
  public startLeft: number = 0;

  constructor(props: FigureProps) {
    super(props);
    this.state = {
      isPromotionWaitingActive: false,
    };
  }

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
    const { isPromotionWaitingActive } = this.state;
    const leftMouseBtnCode = 0;
    if (e.button !== leftMouseBtnCode || isPromotionWaitingActive === true) {
      return;
    }
    this.setState({ isPromotionWaitingActive: false });
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
      this.setState({
        isPromotionWaitingActive: false,
      });
    };

    document.onmouseup = async () => {
      const { cleanValidMoves } = this.props;
      this.checkFigurePosition(currentTarget, startLeft, startTop);
      await this.checkMove(currentTarget, startTop, startLeft);
      cleanValidMoves();
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  checkMove = async (paramTarget: HTMLElement, startTop: number, startLeft: number) => {
    const currentTarget = paramTarget;
    const { position, chess, element, isAutopromotionEnabled } = this.props;
    const moveToBottom = (startTop - parseFloat(currentTarget.style.top)) / Constants.squareSize;
    const moveToRight = (startLeft - parseFloat(currentTarget.style.left)) / Constants.squareSize;
    const newPosition = `${Constants.letters[Constants.letters.indexOf(position[0]) - moveToRight]}${
      +position[1] + moveToBottom
    }`;
    const finalRow = chess.getSquareIndex(newPosition)[0];
    if (
      element.type === Constants.FIGURES_NAMES.PAWN &&
      (finalRow === 0 || finalRow === 7) &&
      !isAutopromotionEnabled
    ) {
      this.currentTarget = currentTarget;
      this.startTop = startTop;
      this.startLeft = startLeft;
      this.promotionPosition = position;
      this.promotionNewPosition = newPosition;
      this.showPromotionFigure(position, newPosition);
    } else {
      const moveStatus = chess.move({ from: position, to: newPosition, promotion: "q" });
      if (moveStatus) {
        this.makeMove(position, newPosition, chess);
      } else {
        currentTarget.style.left = `${startLeft}px`;
        currentTarget.style.top = `${startTop}px`;
      }
    }
  };

  showPromotionFigure = async (position: string, newPosition: string) => {
    const { chess, cleanValidMoves } = this.props;
    if (chess.move({ from: position, to: newPosition, promotion: "q" }) !== null) {
      document.onmousemove = null;
      document.onmouseup = null;
      this.setState({ isPromotionWaitingActive: true });
      cleanValidMoves();
    }
    chess.chess.undo();
  };

  makePromotion = (piece: string) => {
    const promotion = piece as PieceSymbol;
    const position = this.promotionPosition;
    const newPosition = this.promotionNewPosition;
    const { chess } = this.props;
    const moveStatus = chess.move({ from: position, to: newPosition, promotion });
    const currentTarget = this.currentTarget as HTMLElement;
    console.log(moveStatus);
    if (moveStatus) {
      this.makeMove(position, newPosition, chess, promotion);
    } else {
      currentTarget.style.left = `${this.startLeft}px`;
      currentTarget.style.top = `${this.startTop}px`;
    }
  };

  makeMove = async (position: string, newPosition: string, chess: NewChess, promotion: PieceSymbol = "q") => {
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
      boardRotationEnabled,
    } = this.props;
    drawField();
    const baseURL = process.env.REACT_APP_FULL_SERVER_URL;
    const url = `${baseURL}/move?id=${roomId}&time=${time}&promotion=${promotion}`;
    const getRoomUrl = `${baseURL}/rooms?id=${roomId}`;
    if (gameType === Constants.PVP_ONLINE_NAME) {
      const message = {
        event: "move",
        payload: {
          from: position,
          to: newPosition,
          promotion,
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
        data: {
          history: chess.history(),
        },
      });
      if (moveFigure.status === 200) {
        await this.checkGameStatus(chess, baseURL as string, roomId as string);
        const getRoomInfo = await axios.get(getRoomUrl);
        turnMove(getRoomInfo);
        if (gameType === Constants.AI_NAME) {
          this.turnAiMove(chess);
        }
        if (gameType === Constants.PVP_OFFLINE_NAME && boardRotationEnabled === true) {
          setTimeout(() => makeFieldMarkersVisible(), Constants.BOARD_ROTATION_TIME);
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
      getHighlightedSquares,
      turnReplayMove,
      speed,
    } = this.props;
    const movementTimeCoef = gamePage === Constants.APP_PAGES.REPLAY ? speed : 1;
    chess.move({
      from: requestMove.move?.from as string,
      to: requestMove.move?.to as string,
      promotion: requestMove.move?.promotion,
    });
    setTimeout(async () => {
      if (gamePage !== Constants.APP_PAGES.REPLAY) {
        await this.checkGameStatus(chess, process.env.REACT_APP_FULL_SERVER_URL as string, roomId as string);
        const baseURL = process.env.REACT_APP_FULL_SERVER_URL;
        const { time } = this.props;
        const moveUrl = `${baseURL}/move?id=${roomId}&time=${time}`;
        const getRoomUrl = `${baseURL}/rooms?id=${roomId}`;
        if (gameType === Constants.PVP_ONLINE_NAME) {
          const data = await axios.get(getRoomUrl);
          turnMove(data);
          this.isFigureAlreadyMoved = false;
          cleanSlowFigureMove();
          getHighlightedSquares();
        } else {
          const responce = await axios.post(moveUrl, { history: chess.history() });
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
    }, Constants.FIGURE_MOVEMENT_TIME / movementTimeCoef);
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
    const { rowNumber, elementNumber, requestMove, position, speed, gamePage } = this.props;
    const { isPromotionWaitingActive } = this.state;
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
    let FIGURE_MOVEMENT_TIME = 0;
    if (requestMove.status === true) {
      FIGURE_MOVEMENT_TIME = Constants.FIGURE_MOVEMENT_TIME;
    }
    if (gamePage === Constants.APP_PAGES.REPLAY && requestMove.status === true) {
      FIGURE_MOVEMENT_TIME = Constants.FIGURE_MOVEMENT_TIME / speed;
    }
    return (
      <div
        role='presentation'
        className={`figure-container
          ${this.getBlockedClassname()}
          ${this.getReversedClassName()}`}
        onMouseDown={this.mouseDown}
        onDragStart={this.startDrag}
        style={{
          top: `${Constants.squareSize * newRowNumber}px`,
          left: `${Constants.squareSize * newColNumber}px`,
          transition: `all linear ${FIGURE_MOVEMENT_TIME}ms`,
          zIndex: this.getBlockedClassname().includes("blocked") ? 10 : 20,
        }}
        draggable
      >
        {isPromotionWaitingActive === true && (
          <div
            className='figure-container__promotion'
            style={{ transform: this.getReversedClassName().includes("reversed") ? "rotateY(180deg)" : "none" }}
          >
            {["Q", "N", "B", "R"].map((e) => (
              <div
                className='promotion-item'
                role='presentation'
                onClick={() => {
                  this.setState({
                    isPromotionWaitingActive: false,
                  });
                  this.makePromotion(e.toLowerCase());
                }}
              >
                {e}
              </div>
            ))}
          </div>
        )}
        {this.getFigure()}
      </div>
    );
  }
}
