import axios from "axios";
import {
    FACTURA_LIST_REQUEST, FACTURA_LIST_SUCCESS, FACTURA_LIST_FAIL,
    FACTURA_CREATE_REQUEST, FACTURA_CREATE_SUCCESS, FACTURA_CREATE_FAIL,
    FACTURA_DETAIL_REQUEST, FACTURA_DETAIL_SUCCESS, FACTURA_DETAIL_FAIL,
} from "../constants/facturaConstants";

export const listFacturas = (filtros = {}) => async (dispatch) => {
    try {
        dispatch({ type: FACTURA_LIST_REQUEST });
        const { tipo, desde, hasta } = filtros;
        let url = "/api/caja/facturas?";
        if (tipo) url += `tipo=${tipo}&`;
        if (desde) url += `desde=${desde}&`;
        if (hasta) url += `hasta=${hasta}&`;
        const { data } = await axios.get(url);
        dispatch({ type: FACTURA_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FACTURA_LIST_FAIL, payload: error.response?.data?.message || error.message });
    }
};

export const getFacturaById = (id) => async (dispatch) => {
    try {
        dispatch({ type: FACTURA_DETAIL_REQUEST });
        const { data } = await axios.get(`/api/caja/facturas/${id}`);
        dispatch({ type: FACTURA_DETAIL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FACTURA_DETAIL_FAIL, payload: error.response?.data?.message || error.message });
    }
};

export const createFactura = (factura) => async (dispatch) => {
    try {
        dispatch({ type: FACTURA_CREATE_REQUEST });
        const { data } = await axios.post("/api/caja/facturas", factura);
        dispatch({ type: FACTURA_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FACTURA_CREATE_FAIL, payload: error.response?.data?.message || error.message });
    }
};