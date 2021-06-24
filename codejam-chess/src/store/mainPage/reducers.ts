import Constants, { UserAction } from '../../components/Constants';
import { MAIN_EDIT_NAME, MAIN_HIDE_POPAP, MAIN_SET_ACTIVE_PLAYER, MAIN_SHOW_POPAP } from "./actions"

const defaultState = {
  players:
    [
      {
        name: Constants.defaultPlayers[0].name,
        image: Constants.defaultPlayers[0].image,
        id: 1
      },
      {
        name: Constants.defaultPlayers[1].name,
        image: Constants.defaultPlayers[1].image,
        id: 2
      }
    ],
  activePlayerId: 2,
  popap: {
    status: false
  }
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
              name: (String(action.payload.name).trim().length === 0) ? `Player ${action.payload.id}` : action.payload.name,
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
        activePlayerId: action.payload
      }
      break;
    }

    case MAIN_SHOW_POPAP: {
      return {
        ...state,
        popap: {
          status: true
        }
      }
    }

    case MAIN_HIDE_POPAP: {
      return {
        ...state,
        popap: {
          status: false
        }
      }
    }


    default:
      return state
      break;
  }
}
export { mainPageReducer as default }