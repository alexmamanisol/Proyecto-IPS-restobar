import axios from "axios";
import {
    PAGO_LIST_REQUEST, PAGO_LIST_SUCCESS, PAGO_LIST_FAIL,
    PAGO_CREATE_REQUEST, PAGO_CREATE_SUCCESS, PAGO_CREATE_FAIL,
    PAGO_ANULAR_REQUEST, PAGO_ANULAR_SUCCESS, PAGO_ANULAR_FAIL,
} from "../constants/pagoConstants";

export const listPagos = () => async (dispatch) => {
    try {
        dispatch({ type: PAGO_LIST_REQUEST });
        const { data } = await axios.get("/api/caja/pagos");
        dispatch({ type: PAGO_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PAGO_LIST_FAIL, payload: error.response?.data?.message || error.message });
    }
};

export const createPago = (pago) => async (dispatch) => {
    try {
        dispatch({ type: PAGO_CREATE_REQUEST });
        const { data } = await axios.post("/api/caja/pagos", pago);
        dispatch({ type: PAGO_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PAGO_CREATE_FAIL, payload: error.response?.data?.message || error.message });
    }
};

export const anularPago = (id) => async (dispatch) => {
    try {
        dispatch({ type: PAGO_ANULAR_REQUEST });
        const { data } = await axios.put(`/api/caja/pagos/${id}/anular`);
        dispatch({ type: PAGO_ANULAR_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PAGO_ANULAR_FAIL, payload: error.response?.data?.message || error.message });
    }
};