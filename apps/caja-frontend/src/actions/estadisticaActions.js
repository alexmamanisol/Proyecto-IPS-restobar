import axios from "axios";
import {
    ESTADISTICA_RESUMEN_REQUEST, ESTADISTICA_RESUMEN_SUCCESS, ESTADISTICA_RESUMEN_FAIL,
    ESTADISTICA_INGRESOS_REQUEST, ESTADISTICA_INGRESOS_SUCCESS, ESTADISTICA_INGRESOS_FAIL,
    ESTADISTICA_METODOS_REQUEST, ESTADISTICA_METODOS_SUCCESS, ESTADISTICA_METODOS_FAIL,
    ESTADISTICA_GASTOS_REQUEST, ESTADISTICA_GASTOS_SUCCESS, ESTADISTICA_GASTOS_FAIL,
} from "../constants/estadisticaConstants";

export const getResumenGeneral = (periodo = "") => async (dispatch) => {
    try {
        dispatch({ type: ESTADISTICA_RESUMEN_REQUEST });
        const { data } = await axios.get(
            `/api/caja/estadisticas/resumen${periodo ? `?periodo=${periodo}` : ""}`
        );
        dispatch({ type: ESTADISTICA_RESUMEN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ESTADISTICA_RESUMEN_FAIL, payload: error.response?.data?.message || error.message });
    }
};

export const getIngresos = (periodo = "mes") => async (dispatch) => {
    try {
        dispatch({ type: ESTADISTICA_INGRESOS_REQUEST });
        const { data } = await axios.get(`/api/caja/estadisticas/ingresos?periodo=${periodo}`);
        dispatch({ type: ESTADISTICA_INGRESOS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ESTADISTICA_INGRESOS_FAIL, payload: error.response?.data?.message || error.message });
    }
};

export const getMetodosPago = () => async (dispatch) => {
    try {
        dispatch({ type: ESTADISTICA_METODOS_REQUEST });
        const { data } = await axios.get("/api/caja/estadisticas/metodos-pago");
        dispatch({ type: ESTADISTICA_METODOS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ESTADISTICA_METODOS_FAIL, payload: error.response?.data?.message || error.message });
    }
};

export const getResumenGastos = () => async (dispatch) => {
    try {
        dispatch({ type: ESTADISTICA_GASTOS_REQUEST });
        const { data } = await axios.get("/api/caja/estadisticas/gastos");
        dispatch({ type: ESTADISTICA_GASTOS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ESTADISTICA_GASTOS_FAIL, payload: error.response?.data?.message || error.message });
    }
};