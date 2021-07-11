import NewChess from '../../chess.js/chess';
import Constants, { PlayerData } from '../../components/Constants';
import { GAME_BREAK_GAME, GAME_CLEAN_VALID_MOVES, GAME_DRAW_FIELD, GAME_GET_VALID_MOVES, GAME_INCREASE_TIME, GAME_MAKE_FIELD_MARKERS_INVISIBLE, GAME_MAKE_FIELD_MARKERS_VISIBLE, GAME_SET_TIMER_FUNC, GAME_SET_WINNER, GAME_START_GAME, GAME_TURN_AI_MOVE, GAME_TURN_MOVE, MAIN_CHANGE_POPAP_INPUT_VALUE, MAIN_EDIT_NAME, MAIN_HIDE_POPAP, MAIN_SET_ACTIVE_PLAYER, MAIN_SHOW_POPAP, SERVER_SET_SELECTED_PLAYER, SERVER_SET_STORE, SERVER_SET_WS_CONNECTION, SETTINGS_CHANGE_AI_LEVEL, SETTINGS_CHANGE_RANDOM_PLAYER_SIDES } from "./actions"

const defaultState = {
  players:
    [
      {
        name: Constants.defaultPlayers[0].name,
        image: Constants.defaultPlayers[0].image,
        id: 1,
        color: Constants.FIGURES_COLORS_NAMES.black
      },
      {
        name: Constants.defaultPlayers[1].name,
        image: Constants.defaultPlayers[1].image,
        id: 2,
        color: Constants.FIGURES_COLORS_NAMES.white
      }
    ],
  activePlayerId: 2,
  popap: {
    status: false,
    inputContext: '',
    isBtnBlocked: true
  },
  game: {
    selectedPlayerId: 0,
    history: [],
    data: [[]],
    chess: new NewChess(),
    timerFunction: 0,
    time: Constants.startTimeValue,
    isGamePageActive: false,
    isGameProcessActive: false,
    validMoves: [],
    areMarkersVisible: true,
    historyTime: [],
    areFieldMarkersVisible: true,
    kingPosition: '',
    checkSquares: [''],
    checkmateSquares: [''],
    arePlayersColorsReversed: true,
    areRandomSidesEnabled: true,
    AILevel: 1,
    gameType: Constants.AI_NAME,
    draw: false,
    winnerId: 0,
    wsConnection: null
  },
  isUserLogined: false,
}

const mainPageReducer = (paramState = defaultState, action: any) => {
  const state = { ...paramState };
  switch (action.type) {
    case MAIN_EDIT_NAME: {
      let player;
      if (action.payload) {
        player = state.players.find((e) => e.id === action.payload.id);
        if (player) {
          state.players.splice(state.players.indexOf(player), 1);
        }
      }
      return {
        ...state,
        players:
          [
            ...state.players,
            {
              name: (String(action.payload.name).trim().length === 0) ? `Player ${action.payload.id}` : String(action.payload.name).trim(),
              image: (player !== undefined) ? player.image : '',
              id: action.payload.id,
              color: player?.color
            }

          ],
        activePlayerId: action.payload.id
      }
      break;
    }

    case MAIN_SET_ACTIVE_PLAYER: {
      return {
        ...state,
        activePlayerId: action.payload
      }
      break;
    }

    case MAIN_CHANGE_POPAP_INPUT_VALUE: {
      const value = action.payload;
      const cleanValue = value.trim();
      return {
        ...state,
        popap: {
          ...state.popap,
          inputContext: value,
          isBtnBlocked: cleanValue.length === 0
        }
      }
    }

    case MAIN_SHOW_POPAP: {
      return {
        ...state,
        popap: {
          ...state.popap,
          status: true,
          inputContext: '',
          isBtnBlocked: true
        }
      }
    }

    case MAIN_HIDE_POPAP: {
      return {
        ...state,
        popap: {
          ...state.popap,
          status: false,
        }
      }
    }

    case GAME_START_GAME: {
      // let firstPlayerColor = Constants.FIGURES_COLORS_NAMES.white;
      // if (firstPlayerColor === Constants.FIGURES_COLORS_NAMES.black && state.game.gameType === Constants.AI_NAME) {
      //   state.game.chess.moveAI(state.game.AILevel);
      // }
      const timeHistory: number[] = [];
      // if (state.game.gameType === Constants.AI_NAME) {
      //   if (firstPlayerColor === Constants.FIGURES_COLORS_NAMES.black) {
      //     timeHistory = [0]
      //   }
      // }
      return {
        ...state,
        game: {
          ...state.game,
          data: state.game.chess.board(),
          time: 0,
          isGamePageActive: true,
          isGameProcessActive: true,
          history: state.game.chess.history(),
          historyTime: timeHistory,
          winnerId: 0,
        },
        activePlayerId: state.players.find((e) => e.color === Constants.FIGURES_COLORS_NAMES.white)?.id,
        isUserLogined: true,
        draw: false
      }
    }

    case GAME_INCREASE_TIME: {
      return {
        ...state,
        game: {
          ...state.game,
          time: state.game.time + 1,
        }
      }
    }

    case GAME_BREAK_GAME: {
      window.clearInterval(state.game.timerFunction)
      state.game.chess.reset();
      return {
        ...state,
        game: {
          ...state.game,
          data: state.game.chess.board(),
          time: Constants.startTimeValue,
          isGamePageActive: false,
          isGameProcessActive: false,
          timerFunction: 0,
          historyTime: [],
          history: [],
          checkmateSquares: [],
          checkSquares: [],
          winnerId: 0
        },
      }
    }

    case GAME_SET_TIMER_FUNC: {
      return {
        ...state,
        game: {
          ...state.game,
          timerFunction: action.payload
        }
      }
    }

    case GAME_SET_WINNER: {
      window.clearInterval(state.game.timerFunction)
      return {
        ...state,
        game: {
          ...state.game,
          winnerId: action.payload,
          timerFunction: 0,
          isGameProcessActive: false,
        }
      }
    }

    case GAME_GET_VALID_MOVES: {
      const validMoves = state.game.chess.moves(action.payload);
      console.log(validMoves);
      return {
        ...state,
        game: {
          ...state.game,
          validMoves,
          data: state.game.chess.board()
        }
      }
    }

    case GAME_CLEAN_VALID_MOVES: {
      return {
        ...state,
        game: {
          ...state.game,
          validMoves: []
        }
      }
    }

    case GAME_DRAW_FIELD: {
      return {
        ...state,
        game: {
          ...state.game,
          data: state.game.chess.board()
        }
      }
    }

    case GAME_TURN_MOVE: {
      state.game.chess.turn();
      state.game.checkSquares = [...state.game.chess.checkSquares];
      state.game.checkmateSquares = [...state.game.chess.checkmateSquares];
      const isGameFinished = state.game.chess.chess.gameOver()
      let draw = false;
      if (isGameFinished) {
        window.clearInterval(state.game.timerFunction)
        draw = !state.game.chess.chess.inCheckmate();
      }
      return {
        ...state,
        activePlayerId: (state.activePlayerId === 1) ? 2 : 1,
        game: {
          ...state.game,
          history: state.game.chess.history(),
          historyTime: [
            ...state.game.historyTime,
            state.game.time
          ],
          areFieldMarkersVisible: false,
          isGameProcessActive: !isGameFinished,
          draw,
          winnerId: state.game.chess.chess.inCheckmate() ? state.activePlayerId : 0,
        },
      }
    }

    case GAME_TURN_AI_MOVE: {
      state.game.chess.turn();
      state.game.chess.moveAI(state.game.AILevel);
      state.game.checkSquares = [...state.game.chess.checkSquares];
      state.game.checkmateSquares = [...state.game.chess.checkmateSquares];
      const isGameFinished = state.game.chess.chess.gameOver()
      let draw = false;
      if (isGameFinished) {
        window.clearInterval(state.game.timerFunction)
        draw = !state.game.chess.chess.inCheckmate();
      }
      return {
        ...state,
        activePlayerId: state.activePlayerId,
        game: {
          ...state.game,
          history: state.game.chess.history(),
          historyTime: isGameFinished ? [
            ...state.game.historyTime,
            state.game.time,
          ] : [
            ...state.game.historyTime,
            state.game.time,
            state.game.time,
          ],
          areFieldMarkersVisible: false,
          isGameProcessActive: !isGameFinished,
          data: state.game.chess.board(),
          draw,
          winnerId: state.game.chess.chess.inCheckmate() ? state.activePlayerId : 0,
        },
      }
    }

    case GAME_MAKE_FIELD_MARKERS_VISIBLE: {
      return {
        ...state,
        game: {
          ...state.game,
          areFieldMarkersVisible: true
        }
      }
    }

    case GAME_MAKE_FIELD_MARKERS_INVISIBLE: {
      return {
        ...state,
        game: {
          ...state.game,
          areFieldMarkersVisible: false
        }
      }
    }

    case SETTINGS_CHANGE_RANDOM_PLAYER_SIDES: {
      return {
        ...state,
        game: {
          ...state.game,
          areRandomSidesEnabled: action.payload
        }
      }
    }

    case SETTINGS_CHANGE_AI_LEVEL: {
      return {
        ...state,
        game: {
          ...state.game,
          AILevel: action.payload
        }
      }
    }

    case SERVER_SET_STORE: {
      const data = action.payload.store;
      const players = Object.values(data.players) as PlayerData[];
      return {
        ...state,
        activePlayerId: data.activePlayerId,
        players: [{
          id: 1,
          color: players.find((e) => e.id === 1)?.color,
          image: state.players.find((e) => e.id === 1)?.image,
          name: players.find((e) => e.id === 1)?.name
        },
        {
          id: 2,
          color: players.find((e) => e.id === 2)?.color,
          image: state.players.find((e) => e.id === 2)?.image,
          name: players.find((e) => e.id === 2)?.name
        }],
        game: {
          ...state.game,
          roomId: action.payload.id,
          gameType: Constants.PVP_ONLINE_NAME,
        }
      }
    }

    case SERVER_SET_SELECTED_PLAYER: {
      return {
        ...state,
        game: {
          ...state.game,
          selectedPlayerId: action.payload
        }
      }
    }

    case SERVER_SET_WS_CONNECTION: {
      return {
        ...state,
        game: {
          ...state.game,
          wsConnection: action.payload
        }
      }
    }

    default:
      return state
      break;
  }
}
export { mainPageReducer as default }