import {
    GASTO_LIST_REQUEST, GASTO_LIST_SUCCESS, GASTO_LIST_FAIL,
    GASTO_CREATE_REQUEST, GASTO_CREATE_SUCCESS, GASTO_CREATE_FAIL,
    GASTO_UPDATE_REQUEST, GASTO_UPDATE_SUCCESS, GASTO_UPDATE_FAIL,
    GASTO_DELETE_REQUEST, GASTO_DELETE_SUCCESS, GASTO_DELETE_FAIL,
} from "../constants/gastoConstants";

export const gastoListReducer = (state = { gastos: [] }, action) => {
    switch (action.type) {
        case GASTO_LIST_REQUEST: return { loading: true, gastos: [] };
        case GASTO_LIST_SUCCESS: return { loading: false, gastos: action.payload };
        case GASTO_LIST_FAIL: return { loading: false, error: action.payload };
        default: return state;
    }
};

export const gastoCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case GASTO_CREATE_REQUEST: return { loading: true };
        case GASTO_CREATE_SUCCESS: return { loading: false, success: true, gasto: action.payload };
        case GASTO_CREATE_FAIL: return { loading: false, error: action.payload };
        default: return state;
    }
};

export const gastoUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case GASTO_UPDATE_REQUEST: return { loading: true };
        case GASTO_UPDATE_SUCCESS: return { loading: false, success: true };
        case GASTO_UPDATE_FAIL: return { loading: false, error: action.payload };
        default: return state;
    }
};

export const gastoDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case GASTO_DELETE_REQUEST: return { loading: true };
        case GASTO_DELETE_SUCCESS: return { loading: false, success: true };
        case GASTO_DELETE_FAIL: return { loading: false, error: action.payload };
        default: return state;
    }
};