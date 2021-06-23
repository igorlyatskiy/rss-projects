import { UserAction } from '../../components/Constants';
import { MAIN_EDIT_NAME } from "./actions"

const defaultState = {
  players: [
    {
      name: 'Player 1',
      image: '',
      id: 1
    },
    {
      name: 'Player 2',
      image: '',
      id: 2
    },
  ],
}

const mainPageReducer = (state = defaultState, action: UserAction) => {
  switch (action.type) {
    case MAIN_EDIT_NAME: {
      return {
        ...state,
        // players: [
        //   ...state.players,
        //   {
        //     name: action.payload.name,
        //     image: state.players[action.payload.id - 1].image,
        //     id: action.payload.id
        //   }
        // ]
      }
      break;
    }

    default:
      return state
      break;
  }
}
export { mainPageReducer as default }