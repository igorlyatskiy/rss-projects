export const MAIN_EDIT_NAME = 'MAIN_EDIT_NAME';
export const MAIN_SET_ACTIVE_PLAYER = 'MAIN_SET_ACTIVE_PLAYER';
export const MAIN_SHOW_POPAP = 'MAIN_SHOW_POPAP';
export const MAIN_HIDE_POPAP = 'MAIN_HIDE_POPAP';
export const GAME_START_GAME = 'GAME_START_GAME';
export const GAME_BREAK_GAME = 'GAME_BREAK_GAME';
export const GAME_INCREASE_TIME = 'GAME_INCREASE_TIME';
export const GAME_SET_TIMER_FUNC = 'GAME_SET_TIMER_FUNC';
export const GAME_SET_WINNER = 'GAME_SET_WINNER';
export const GAME_ADMIT_LOSS = 'GAME_ADMIT_LOSS';
export const GAME_GET_VALID_MOVES = 'GAME_GET_VALID_MOVES';

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

export const hidePopap = () => ({
  type: MAIN_HIDE_POPAP,
  payload: false
})

export const startGame = () => ({
  type: GAME_START_GAME,
  payload: true
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

export const setWinner = (id:number) => ({
  type: GAME_SET_WINNER,
  payload: id
})

export const getValidMoves = (square:string) => ({
  type: GAME_GET_VALID_MOVES,
  payload: square
})
