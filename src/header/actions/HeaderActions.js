import * as HeaderActionTypes from '../actiontypes/HeaderActionTypes';

const setMode = (mode) => {
    return {
        type: HeaderActionTypes.SET_MODE, payload: mode
    }
}
export function onModeChange(mode) {
    return dispatch => dispatch(setMode(mode));
}