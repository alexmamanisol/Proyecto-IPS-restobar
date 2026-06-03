import {
    PRODUCTOS_REQUEST,
    PRODUCTOS_SUCCESS,
    PRODUCTOS_FAIL,
    PEDIDOS_REQUEST,
    PEDIDOS_SUCCESS,
    PEDIDOS_FAIL,
} from "../constants/coccionConstants";

export const productosConEventosReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case PRODUCTOS_REQUEST:
            return { loading: true, items: [] };
        case PRODUCTOS_SUCCESS:
            return { loading: false, items: action.payload };
        case PRODUCTOS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const ordenesPendientesReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case PEDIDOS_REQUEST:
            return { loading: true, items: [] };
        case PEDIDOS_SUCCESS:
            return { loading: false, items: action.payload };
        case PEDIDOS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
