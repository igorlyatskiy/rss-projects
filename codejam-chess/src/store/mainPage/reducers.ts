import { UserAction } from '../../components/Constants';
import { MAIN_EDIT_NAME, MAIN_SET_ACTIVE_PLAYER } from "./actions"

const defaultState = {
  players:
    [
      {
        name: 'Player 1',
        image: '',
        id: 1
      },
      {
        name: 'Player 2',
        image: '',
        id: 2
      }
    ],
  activePlayerId: 2
}

const mainPageReducer = (paramState = defaultState, action: UserAction) => {
  const state = paramState;
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
              name: action.payload.name,
              image: (player !== undefined) ? player.image : '',
              id: action.payload.id
            }

          ],
        activePlayerId: action.payload.id
      }
      break;
    }

    case MAIN_SET_ACTIVE_PLAYER: {
      return {
        ...state,
        activePlayerId: action.payload.id
      }
      break;
    }


    default:
      return state
      break;
  }
}
export { mainPageReducer as default }