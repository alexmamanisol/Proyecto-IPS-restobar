import {
    COLA_LIST_REQUEST,
    COLA_LIST_SUCCESS,
    COLA_LIST_FAIL,
    COLA_PENDIENTES_REQUEST,
    COLA_PENDIENTES_SUCCESS,
    COLA_PENDIENTES_FAIL,
    COLA_TERMINADOS_REQUEST,
    COLA_TERMINADOS_SUCCESS,
    COLA_TERMINADOS_FAIL,
    COLA_AGREGAR_SUCCESS,
    EVENTO_AVANZAR_SUCCESS,
} from "../constants/coccionConstants";

export const colaCoccionReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case COLA_LIST_REQUEST:
            return { loading: true, items: [] };
        case COLA_LIST_SUCCESS:
            return { loading: false, items: action.payload };
        case COLA_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const colaPendientesReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case COLA_PENDIENTES_REQUEST:
            return { loading: true, items: [] };
        case COLA_PENDIENTES_SUCCESS:
            return { loading: false, items: action.payload };
        case COLA_PENDIENTES_FAIL:
            return { loading: false, error: action.payload };
        case COLA_AGREGAR_SUCCESS:
            return { ...state, items: [...state.items, action.payload] };
        case EVENTO_AVANZAR_SUCCESS: {
            const updated = state.items.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
            return { ...state, items: updated };
        }
        default:
            return state;
    }
};

export const colaTerminadosReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case COLA_TERMINADOS_REQUEST:
            return { loading: true, items: [] };
        case COLA_TERMINADOS_SUCCESS:
            return { loading: false, items: action.payload };
        case COLA_TERMINADOS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
