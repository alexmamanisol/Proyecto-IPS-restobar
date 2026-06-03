import {
    FACTURA_LIST_REQUEST, FACTURA_LIST_SUCCESS, FACTURA_LIST_FAIL,
    FACTURA_CREATE_REQUEST, FACTURA_CREATE_SUCCESS, FACTURA_CREATE_FAIL,
    FACTURA_DETAIL_REQUEST, FACTURA_DETAIL_SUCCESS, FACTURA_DETAIL_FAIL, FACTURA_CREATE_RESET,
} from "../constants/facturaConstants";

export const facturaListReducer = (state = { facturas: [] }, action) => {
    switch (action.type) {
        case FACTURA_LIST_REQUEST: return { loading: true, facturas: [] };
        case FACTURA_LIST_SUCCESS: return { loading: false, facturas: action.payload };
        case FACTURA_LIST_FAIL: return { loading: false, error: action.payload };
        default: return state;
    }
};

export const facturaCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case FACTURA_CREATE_REQUEST: return { loading: true };
        case FACTURA_CREATE_SUCCESS: return { loading: false, success: true, factura: action.payload };
        case FACTURA_CREATE_FAIL:    return { loading: false, error: action.payload };
        case FACTURA_CREATE_RESET:   return {};   // <-- agrega esto
        default: return state;
    }
};

export const facturaDetailReducer = (state = { factura: {} }, action) => {
    switch (action.type) {
        case FACTURA_DETAIL_REQUEST: return { loading: true, factura: {} };
        case FACTURA_DETAIL_SUCCESS: return { loading: false, factura: action.payload };
        case FACTURA_DETAIL_FAIL: return { loading: false, error: action.payload };
        default: return state;
    }
};