export const MAIN_EDIT_NAME = 'MAIN_EDIT_NAME';

export const setPlayerName = (name: string, id: number) => ({
  type: MAIN_EDIT_NAME,
  payload: { name, id }
});