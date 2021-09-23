import { combineReducers } from 'redux';
import counter from './counterReducer';
import callGetResources from './sandboxReducer';

const rootReducer = combineReducers({
    counter,
    callGetResources
});

export default rootReducer;
