import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';
import initialState from './reducers/initialState';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore() {
    // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
    return createStore(rootReducer, initialState, composedEnhancer);
}
// composeEnhancers(applyMiddleware(thunk))
