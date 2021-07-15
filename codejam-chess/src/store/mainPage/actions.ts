export const MAIN_EDIT_NAME = 'MAIN_EDIT_NAME';
export const MAIN_SET_ACTIVE_PLAYER = 'MAIN_SET_ACTIVE_PLAYER';
export const MAIN_CHANGE_POPAP_INPUT_VALUE = 'MAIN_CHANGE_POPAP_INPUT_VALUE'
export const MAIN_SHOW_POPAP = 'MAIN_SHOW_POPAP';
export const MAIN_HIDE_POPAP = 'MAIN_HIDE_POPAP';
export const GAME_START_GAME = 'GAME_START_GAME';
export const GAME_BREAK_GAME = 'GAME_BREAK_GAME';
export const GAME_INCREASE_TIME = 'GAME_INCREASE_TIME';
export const GAME_SET_TIMER_FUNC = 'GAME_SET_TIMER_FUNC';
export const GAME_SET_WINNER = 'GAME_SET_WINNER';
export const GAME_ADMIT_LOSS = 'GAME_ADMIT_LOSS';
export const GAME_GET_VALID_MOVES = 'GAME_GET_VALID_MOVES';
export const GAME_CLEAN_VALID_MOVES = 'GAME_CLEAN_VALID_MOVES';
export const GAME_DRAW_FIELD = 'GAME_DRAW_FIELD'
export const GAME_TURN_MOVE = 'GAME_TURN_MOVE';
export const GAME_MAKE_FIELD_MARKERS_VISIBLE = 'GAME_MAKE_FIELD_MARKERS_VISIBLE';
export const GAME_MAKE_FIELD_MARKERS_INVISIBLE = 'GAME_MAKE_FIELD_MARKERS_INVISIBLE';
export const GAME_TURN_AI_MOVE = 'GAME_TURN_AI_MOVE';
export const SETTINGS_CHANGE_RANDOM_PLAYER_SIDES = 'SETTINGS_CHANGE_RANDOM_PLAYER_SIDES';
export const SETTINGS_CHANGE_AI_LEVEL = 'SETTINGS_CHANGE_AI_LEVEL'
export const SETTINGS_CHANGE_GAME_MODE = 'SETTINGS_CHANGE_GAME_MODE'
export const SERVER_SET_STORE = 'SERVER_SET_STORE';
export const SERVER_SET_SELECTED_PLAYER = 'SERVER_SET_SELECTED_PLAYER'
export const SERVER_SET_WS_CONNECTION = 'SERVER_SET_WS_CONNECTION'
export const GAME_GET_HIGHLIGHTED_SQUARES = 'GAME_GET_HIGHLIGHTED_SQUARES'
export const GAME_RANDOMIZE_COLORS = 'GAME_RANDOMIZE_COLORS'
export const GAME_SLOW_MOVE_FIGURE = 'GAME_SLOW_MOVE_FIGURE'
export const GAME_CLEAN_SLOW_FIGURE_MOVE = 'GAME_CLEAN_SLOW_FIGURE_MOVE'
export const GAME_CLEAN_FIELD = 'GAME_CLEAN_FIELD'
export const APP_SET_PAGE = 'APP_SET_PAGE'
export const APP_CHANGE_PLAYERS = 'APP_CHANGE_PLAYERS'
export const REPLAY_START_REPLAY = 'REPLAY_START_REPLAY'
export const REPLAY_TURN_MOVE = 'REPLAY_TURN_MOVE'
export const REPLAY_CHANGE_SPEED = 'REPLAY_CHANGE_SPEED'
export const REPLAY_CHANGE_WINNER = 'REPLAY_CHANGE_WINNER'

export const setPlayerName = (name: string, id: number) => ({
  type: MAIN_EDIT_NAME,
  payload: { name, id }
});

export const setActivePlayer = (id: number) => ({
  type: MAIN_SET_ACTIVE_PLAYER,
  payload: id
});

export const showPopap = () => ({
  type: MAIN_SHOW_POPAP,
  payload: true
});

export const changePopapInputValue = (value: string) => ({
  type: MAIN_CHANGE_POPAP_INPUT_VALUE,
  payload: value
})

export const hidePopap = () => ({
  type: MAIN_HIDE_POPAP,
  payload: false
})

export const startGame = (type: string, id: string) => ({
  type: GAME_START_GAME,
  payload: {
    type,
    id
  }
})

export const breakGame = () => ({
  type: GAME_BREAK_GAME,
  payload: true
})

export const increaseTime = () => ({
  type: GAME_INCREASE_TIME,
  payload: true
})

export const setTimerFunc = (number: number) => ({
  type: GAME_SET_TIMER_FUNC,
  payload: number
})

export const setWinner = (id: number) => ({
  type: GAME_SET_WINNER,
  payload: id
})

export const checkValidMoves = (square: string) => ({
  type: GAME_GET_VALID_MOVES,
  payload: square
})

export const cleanValidMoves = () => ({
  type: GAME_CLEAN_VALID_MOVES,
  payload: true
})

export const drawField = () => ({
  type: GAME_DRAW_FIELD,
  payload: true
})

export const turnMove = (data: unknown) => ({
  type: GAME_TURN_MOVE,
  payload: data
})

export const turnAiMove = () => ({
  type: GAME_TURN_AI_MOVE,
  payload: true
})

export const makeFieldMarkersVisible = () => ({
  type: GAME_MAKE_FIELD_MARKERS_VISIBLE,
  payload: true
})

export const makeFieldMarkersInvisible = () => ({
  type: GAME_MAKE_FIELD_MARKERS_INVISIBLE,
  payload: true
})

export const changeRandomPlayerSides = (status: boolean) => ({
  type: SETTINGS_CHANGE_RANDOM_PLAYER_SIDES,
  payload: status
})

export const changeAiLevel = (number: number) => ({
  type: SETTINGS_CHANGE_AI_LEVEL,
  payload: number
})

export const changeGameMode = (type: string) => ({
  type: SETTINGS_CHANGE_GAME_MODE,
  payload: type
})

export const setStore = (store: unknown, roomId: string | number) => ({
  type: SERVER_SET_STORE,
  payload: {
    store,
    id: roomId
  }
})

export const setSelectedPlayer = (selectedPlayerId: number) => ({
  type: SERVER_SET_SELECTED_PLAYER,
  payload: selectedPlayerId
})

export const setWebsocketConnection = (connection: WebSocket) => ({
  type: SERVER_SET_WS_CONNECTION,
  payload: connection
})

export const getHighlightedSquares = () => ({
  type: GAME_GET_HIGHLIGHTED_SQUARES,
  payload: true
})

export const checkAndRandomizeColors = () => ({
  type: GAME_RANDOMIZE_COLORS,
  payload: true
})

export const slowFigureMove = (data: unknown) => ({
  type: GAME_SLOW_MOVE_FIGURE,
  payload: data
})

export const cleanSlowFigureMove = () => ({
  type: GAME_CLEAN_SLOW_FIGURE_MOVE,
  payload: true
})

export const cleanField = () => ({
  type: GAME_CLEAN_FIELD,
  payload: true
})

export const setPage = (page: string) => ({
  type: APP_SET_PAGE,
  payload: page
})

export const changePlayers = (data: unknown) => ({
  type: APP_CHANGE_PLAYERS,
  payload: data
})

export const startReplay = () => ({
  type: REPLAY_START_REPLAY,
  payload: true
})

export const turnReplayMove = () => ({
  type: REPLAY_TURN_MOVE,
  payload: true
})

export const changeReplaySpeed = (speed: number) => ({
  type: REPLAY_CHANGE_SPEED,
  payload: speed
})

export const changeReplayWinner = (id: number) => ({
  type: REPLAY_CHANGE_WINNER,
  payload: id
})

