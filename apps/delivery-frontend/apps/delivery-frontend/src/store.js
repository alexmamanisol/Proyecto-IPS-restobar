import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    (state = {}) => state,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;