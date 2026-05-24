import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    colaCoccionReducer,
    colaPendientesReducer,
    colaTerminadosReducer,
} from "./reducers/coccionReducers";

const reducer = combineReducers({
    colaCoccion: colaCoccionReducer,
    colaPendientes: colaPendientesReducer,
    colaTerminados: colaTerminadosReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
