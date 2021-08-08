import * as HeaderActionTypes from '../actiontypes/HeaderActionTypes';

const initialState = {
  mode: 'I'
};

export default function headerReducer(state = initialState, action) {
  switch (action.type) {
    case HeaderActionTypes.SET_MODE:
      return {
          mode: action.payload
      }
    default:
      return state;
  }
}