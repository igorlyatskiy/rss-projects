import NewChess from '../../chess.js/chess';
import Constants, { HistoryAction, PlayerData } from '../../components/Constants';
import { APP_CHANGE_PLAYERS, APP_SET_PAGE, GAME_BREAK_GAME, GAME_CLEAN_FIELD, GAME_CLEAN_SLOW_FIGURE_MOVE, GAME_CLEAN_VALID_MOVES, GAME_DRAW_FIELD, GAME_GET_HIGHLIGHTED_SQUARES, GAME_GET_VALID_MOVES, GAME_INCREASE_TIME, GAME_MAKE_FIELD_MARKERS_INVISIBLE, GAME_MAKE_FIELD_MARKERS_VISIBLE, GAME_RANDOMIZE_COLORS, GAME_SET_TIMER_FUNC, GAME_SET_WINNER, GAME_SLOW_MOVE_FIGURE, GAME_START_GAME, GAME_TURN_AI_MOVE, GAME_TURN_MOVE, MAIN_CHANGE_POPAP_INPUT_VALUE, MAIN_EDIT_NAME, MAIN_HIDE_POPAP, MAIN_SET_ACTIVE_PLAYER, MAIN_SHOW_POPAP, REPLAY_CHANGE_SPEED, REPLAY_CHANGE_WINNER, REPLAY_START_REPLAY, REPLAY_TURN_MOVE, SERVER_SET_SELECTED_PLAYER, SERVER_SET_STORE, SERVER_SET_WS_CONNECTION, SETTINGS_CHANGE_AI_LEVEL, SETTINGS_CHANGE_GAME_MODE, SETTINGS_CHANGE_RANDOM_PLAYER_SIDES } from "./actions"

const defaultState = {
  players:
    [
      {
        name: Constants.defaultPlayers[0].name,
        image: Constants.defaultPlayers[0].image,
        id: 1,
        color: Constants.FIGURES_COLORS_NAMES.white
      },
      {
        name: Constants.defaultPlayers[1].name,
        image: Constants.defaultPlayers[1].image,
        id: 2,
        color: Constants.FIGURES_COLORS_NAMES.black
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
    areRandomSidesEnabled: false,
    AILevel: 3,
    gameType: Constants.PVP_OFFLINE_NAME,
    draw: false,
    winnerId: 0,
    wsConnection: null,
    requestMove: {
      status: false,
      move: null
    },
    boardRotationEnabled: false
  },
  isUserLogined: false,
  gamePage: Constants.APP_PAGES.MAIN,
  replay: {
    speed: 1,
    activePlayerId: 0,
    history: [],
    historyTime: [],
    winnerId: 0
  }
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

    case GAME_RANDOMIZE_COLORS: {
      let firstPlayerColor = 'w';
      if (state.game.areRandomSidesEnabled === true) {
        firstPlayerColor = (Math.random() - 0.5 > 0) ? 'w' : 'b';
      }
      const firstPlayer = { ...state.players.find((e) => e.id === 1) || '' }
      const secondPlayer = { ...state.players.find((e) => e.id === 2) || '' }
      return {
        ...state,
        players: [
          {
            id: 1,
            name: firstPlayer.name,
            color: firstPlayerColor,
            image: firstPlayer.image
          },
          {
            id: 2,
            name: secondPlayer.name,
            color: firstPlayerColor === 'w' ? 'b' : 'w',
            image: secondPlayer.image
          }
        ]
      }
    }

    case GAME_START_GAME: {
      state.game.chess.reset();
      return {
        ...state,
        game: {
          ...state.game,
          data: state.game.chess.board(),
          time: 0,
          isGamePageActive: true,
          isGameProcessActive: true,
          history: state.game.chess.history(),
          historyTime: [],
          winnerId: 0,
          gameType: action.payload.type,
          roomId: action.payload.id,
          requestMove: {
            status: false,
            move: null
          }
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
      const { data } = action.payload;
      let history = Object.values(data.game.history).filter((e) => e !== null) as HistoryAction[]
      history = history.sort((a, b: HistoryAction) => a.time - b.time)
      if (!data.game.isGameProcessActive) {
        clearInterval(state.game.timerFunction);
        state.game.timerFunction = 0;
        state.game.time = history.map((e) => e.time)[history.map((e) => e.time).length - 1];
      }
      const dataPlayers = Object.values(data.players) as PlayerData[];
      let areMarkersVisible = true;
      if (state.game.gameType === Constants.PVP_OFFLINE_NAME && state.game.boardRotationEnabled === true) {
        areMarkersVisible = false;
      }
      return {
        ...state,
        players: [{
          id: 1,
          color: dataPlayers.find((e: PlayerData) => e.id === 1)?.color,
          image: dataPlayers.find((e: PlayerData) => e.id === 1)?.image,
          name: dataPlayers.find((e: PlayerData) => e.id === 1)?.name
        },
        {
          id: 2,
          color: dataPlayers.find((e: PlayerData) => e.id === 2)?.color,
          image: dataPlayers.find((e: PlayerData) => e.id === 2)?.image,
          name: dataPlayers.find((e: PlayerData) => e.id === 2)?.name
        }],
        activePlayerId: data.activePlayerId,
        game: {
          ...state.game,
          data: state.game.chess.board(),
          history: [...history.map((e) => e.move)],
          historyTime: [...history.map((e) => e.time)],
          areFieldMarkersVisible: areMarkersVisible,
          isGameProcessActive: data.game.isGameProcessActive,
          draw: data.game.draw,
          winnerId: data.game.winnerId,
        },
      }
    }

    case GAME_SLOW_MOVE_FIGURE: {
      return {
        ...state,
        game: {
          ...state.game,
          requestMove: {
            status: true,
            move: {
              from: action.payload.from,
              to: action.payload.to
            }
          }
        }
      }
    }

    case GAME_CLEAN_SLOW_FIGURE_MOVE: {
      return {
        ...state,
        game: {
          ...state.game,
          requestMove: {
            status: false,
            move: null
          }
        }
      }
    }

    case GAME_TURN_AI_MOVE: {
      return {
        ...state,
      }
    }

    case GAME_MAKE_FIELD_MARKERS_VISIBLE: {
      console.log('making');
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

    case SETTINGS_CHANGE_GAME_MODE: {
      return {
        ...state,
        game: {
          ...state.game,
          gameType: action.payload
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
          gameType: data.game.gameType,
          data: state.game.chess.board(),
          winnerId: data.game.winnerId,
          selectedPlayerId: data.game.gameType === Constants.AI_NAME ? data.game.selectedPlayerId : state.game.selectedPlayerId,
          isGameProcessActive: data.game.isGameProcessActive
        }
      }
    }

    case GAME_CLEAN_FIELD: {
      state.game.chess.reset();
      return {
        ...state,
        activePlayerId: 0,
        game: {
          ...state.game,
          winnerId: 0,
          data: []
        }
      }
    }

    case SERVER_SET_SELECTED_PLAYER: {
      return {
        ...state,
        game: {
          ...state.game,
          selectedPlayerId: action.payload,
          winnerId: 0,
          data: [[]],
          gameType: Constants.PVP_ONLINE_NAME
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

    case GAME_GET_HIGHLIGHTED_SQUARES: {
      // state.game.chess.activePlayer = (state.game.chess.activePlayer !== Constants.FIGURES_COLORS_NAMES.black || state.game.chess !== Constants.FIGURES_COLORS_NAMES.white) ?
      state.players.find((e) => e.id === state.activePlayerId)?.color as string;
      state.game.chess.getHighlightedSquares();
      return {
        ...state,
        game: {
          ...state.game,
          checkSquares: state.game.chess.checkSquares,
          checkmateSquares: state.game.chess.checkmateSquares
        }
      }
    }

    case APP_SET_PAGE: {
      return {
        ...state,
        gamePage: action.payload
      }
    }

    case APP_CHANGE_PLAYERS: {
      const newPlayers = action.payload as PlayerData[];
      return {
        ...state,
        players: [
          {
            ...newPlayers.find((e) => e.id === 1),
            id: 1
          },
          {
            ...newPlayers.find((e) => e.id === 2),
            id: 2
          },
        ]
      }
    }

    case REPLAY_START_REPLAY: {
      state.game.chess.reset();
      return {
        ...state,
        replay: {
          ...state.replay,
          activePlayerId: state.players.find((e) => e.color === Constants.FIGURES_COLORS_NAMES.white)?.id,
          history: [],
          historyTime: [],
          winnerId: 0
        },
        game: {
          ...state.game,
          data: state.game.chess.board(),
          checkSquares: [],
          checkmateSquares: [],
          time: 0,
          winnerId: 0
        },
        gamePage: Constants.APP_PAGES.REPLAY
      }
    }

    case REPLAY_TURN_MOVE: {
      const activePlayerId = state.replay.activePlayerId === 1 ? 2 : 1
      state.game.chess.activePlayer = state.players.find((e) => e.id === activePlayerId)?.color as string;
      return {
        ...state,
        game: {
          ...state.game,
          data: state.game.chess.board()
        },
        replay: {
          ...state.replay,
          activePlayerId,
          history: state.game.chess.history(),
          historyTime: [...state.replay.historyTime, state.game.time]
        }
      }
    }

    case REPLAY_CHANGE_SPEED: {
      return {
        ...state,
        replay: {
          ...state.replay,
          speed: action.payload
        }
      }
    }

    case REPLAY_CHANGE_WINNER: {
      return {
        ...state,
        replay: {
          ...state.replay,
          winnerId: action.payload
        }
      }
    }

    default:
      return state
      break;
  }
}
export { mainPageReducer as default }