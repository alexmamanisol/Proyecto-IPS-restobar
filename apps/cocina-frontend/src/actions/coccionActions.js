import axios from "axios";
import {
    PRODUCTOS_REQUEST,
    PRODUCTOS_SUCCESS,
    PRODUCTOS_FAIL,
    PEDIDOS_REQUEST,
    PEDIDOS_SUCCESS,
    PEDIDOS_FAIL,
} from "../constants/coccionConstants";

const authConfig = () => ({
    headers: {
        Authorization: `Bearer ${
            localStorage.getItem("userInfo")
                ? JSON.parse(localStorage.getItem("userInfo")).token
                : ""
        }`,
    },
});

export const fetchProductosConEventos = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCTOS_REQUEST });
        const { data } = await axios.get(
            "/api/coccion/tiempos/productos",
            authConfig()
        );
        dispatch({ type: PRODUCTOS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCTOS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const fetchPedidos = () => async (dispatch) => {
    try {
        dispatch({ type: PEDIDOS_REQUEST });
        const { data } = await axios.get(
            "/api/coccion/pedidos",
            authConfig()
        );
        dispatch({ type: PEDIDOS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PEDIDOS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
