import {
    PAGO_LIST_REQUEST, PAGO_LIST_SUCCESS, PAGO_LIST_FAIL,
    PAGO_CREATE_REQUEST, PAGO_CREATE_SUCCESS, PAGO_CREATE_FAIL,
    PAGO_ANULAR_REQUEST, PAGO_ANULAR_SUCCESS, PAGO_ANULAR_FAIL,
} from "../constants/pagoConstants";

export const pagoListReducer = (state = { pagos: [] }, action) => {
    switch (action.type) {
        case PAGO_LIST_REQUEST: return { loading: true, pagos: [] };
        case PAGO_LIST_SUCCESS: return { loading: false, pagos: action.payload };
        case PAGO_LIST_FAIL: return { loading: false, error: action.payload };
        default: return state;
    }
};

export const pagoCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PAGO_CREATE_REQUEST: return { loading: true };
        case PAGO_CREATE_SUCCESS: return { loading: false, success: true, pago: action.payload };
        case PAGO_CREATE_FAIL: return { loading: false, error: action.payload };
        default: return state;
    }
};

export const pagoAnularReducer = (state = {}, action) => {
    switch (action.type) {
        case PAGO_ANULAR_REQUEST: return { loading: true };
        case PAGO_ANULAR_SUCCESS: return { loading: false, success: true };
        case PAGO_ANULAR_FAIL: return { loading: false, error: action.payload };
        default: return state;
    }
};