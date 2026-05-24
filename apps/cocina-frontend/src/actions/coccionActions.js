import axios from "axios";
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
    COLA_AGREGAR_REQUEST,
    COLA_AGREGAR_SUCCESS,
    COLA_AGREGAR_FAIL,
    EVENTO_AVANZAR_REQUEST,
    EVENTO_AVANZAR_SUCCESS,
    EVENTO_AVANZAR_FAIL,
} from "../constants/coccionConstants";

const API = "/api/coccion/cola";

const config = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo")).token
            : ""
            }`,
    },
});

export const listarCola = () => async (dispatch) => {
    try {
        dispatch({ type: COLA_LIST_REQUEST });
        const { data } = await axios.get(API, config());
        dispatch({ type: COLA_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COLA_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const listarPendientes = () => async (dispatch) => {
    try {
        dispatch({ type: COLA_PENDIENTES_REQUEST });
        const { data } = await axios.get(`${API}/pendientes`, config());
        dispatch({ type: COLA_PENDIENTES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COLA_PENDIENTES_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const listarTerminados = () => async (dispatch) => {
    try {
        dispatch({ type: COLA_TERMINADOS_REQUEST });
        const { data } = await axios.get(`${API}/terminados`, config());
        dispatch({ type: COLA_TERMINADOS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COLA_TERMINADOS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const agregarACola = (orderId, productId) => async (dispatch) => {
    try {
        dispatch({ type: COLA_AGREGAR_REQUEST });
        const { data } = await axios.post(API, { orderId, productId }, config());
        dispatch({ type: COLA_AGREGAR_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COLA_AGREGAR_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const avanzarEvento = (eventoId) => async (dispatch) => {
    try {
        dispatch({ type: EVENTO_AVANZAR_REQUEST });
        const { data } = await axios.put(`${API}/${eventoId}/avanzar`, {}, config());
        dispatch({ type: EVENTO_AVANZAR_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: EVENTO_AVANZAR_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
