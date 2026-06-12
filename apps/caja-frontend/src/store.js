import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { pagoListReducer, pagoCreateReducer } from "./reducers/pagoReducers";
import { facturaListReducer, facturaCreateReducer, facturaDetailReducer } from "./reducers/facturaReducers"; // agregado facturaDetailReducer
import { gastoListReducer, gastoCreateReducer } from "./reducers/gastoReducers";
import { estadisticaReducer } from "./reducers/estadisticaReducers";

const reducer = combineReducers({
    pagoList: pagoListReducer,       // ya existía — necesario para el selector de pagos
    pagoCreate: pagoCreateReducer,
    facturaList: facturaListReducer,
    facturaCreate: facturaCreateReducer,
    facturaDetail: facturaDetailReducer, // <-- AGREGADO
    gastoList: gastoListReducer,
    gastoCreate: gastoCreateReducer,
    estadisticas: estadisticaReducer,
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;