import initialState from './initialState';
import * as types from '../actions/sandbox';

export default function callresourcesReducer(state = initialState.callGetResources, action) {
    if (action.type === types.SETCALLRESOURCESFALSE) {
        return false;
    }
    if (action.type === types.SETCALLRESOURCESTRUE) {
        return true;
    }
    return state;
}
