import axios from "axios";
import {
    GASTO_LIST_REQUEST, GASTO_LIST_SUCCESS, GASTO_LIST_FAIL,
    GASTO_CREATE_REQUEST, GASTO_CREATE_SUCCESS, GASTO_CREATE_FAIL,
    GASTO_UPDATE_REQUEST, GASTO_UPDATE_SUCCESS, GASTO_UPDATE_FAIL,
    GASTO_DELETE_REQUEST, GASTO_DELETE_SUCCESS, GASTO_DELETE_FAIL,
} from "../constants/gastoConstants";

export const listGastos = (filtros = {}) => async (dispatch) => {
    try {
        dispatch({ type: GASTO_LIST_REQUEST });
        const { categoria, desde, hasta } = filtros;
        let url = "/api/caja/gastos?";
        if (categoria) url += `categoria=${categoria}&`;
        if (desde) url += `desde=${desde}&`;
        if (hasta) url += `hasta=${hasta}&`;
        const { data } = await axios.get(url);
        dispatch({ type: GASTO_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GASTO_LIST_FAIL, payload: error.response?.data?.message || error.message });
    }
};

export const createGasto = (gasto) => async (dispatch) => {
    try {
        dispatch({ type: GASTO_CREATE_REQUEST });
        const { data } = await axios.post("/api/caja/gastos", gasto);
        dispatch({ type: GASTO_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GASTO_CREATE_FAIL, payload: error.response?.data?.message || error.message });
    }
};

export const updateGasto = (id, gasto) => async (dispatch) => {
    try {
        dispatch({ type: GASTO_UPDATE_REQUEST });
        const { data } = await axios.put(`/api/caja/gastos/${id}`, gasto);
        dispatch({ type: GASTO_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GASTO_UPDATE_FAIL, payload: error.response?.data?.message || error.message });
    }
};

export const deleteGasto = (id) => async (dispatch) => {
    try {
        dispatch({ type: GASTO_DELETE_REQUEST });
        await axios.delete(`/api/caja/gastos/${id}`);
        dispatch({ type: GASTO_DELETE_SUCCESS });
    } catch (error) {
        dispatch({ type: GASTO_DELETE_FAIL, payload: error.response?.data?.message || error.message });
    }
};