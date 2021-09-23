import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function counterReducer(state = initialState.counter, action) {
    if (action.type === types.INCREMENT) {
        return state + 1;
    }
    if (action.type === types.DECREMENT) {
        return state - 1;
    }
    return state;
}
