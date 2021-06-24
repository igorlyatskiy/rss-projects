export const MAIN_EDIT_NAME = 'MAIN_EDIT_NAME';
export const MAIN_SHOW_POPAP = 'MAIN_SHOW_POPAP';
export const MAIN_SET_ACTIVE_PLAYER = 'MAIN_SET_ACTIVE_PLAYER';

export const setPlayerName = (name: string, id: number) => ({
  type: MAIN_EDIT_NAME,
  payload: { name, id }
});

export const setActivePlayer = (id: number) => ({
  type: MAIN_SET_ACTIVE_PLAYER,
  payload: id
});

export const setPopapActiveStatus = () => ({
  type: MAIN_SHOW_POPAP,
  payload: { status: true }
});