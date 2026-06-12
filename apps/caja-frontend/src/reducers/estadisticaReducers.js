import {
    ESTADISTICA_RESUMEN_REQUEST, ESTADISTICA_RESUMEN_SUCCESS, ESTADISTICA_RESUMEN_FAIL,
    ESTADISTICA_INGRESOS_REQUEST, ESTADISTICA_INGRESOS_SUCCESS, ESTADISTICA_INGRESOS_FAIL,
    ESTADISTICA_METODOS_REQUEST, ESTADISTICA_METODOS_SUCCESS, ESTADISTICA_METODOS_FAIL,
    ESTADISTICA_GASTOS_REQUEST, ESTADISTICA_GASTOS_SUCCESS, ESTADISTICA_GASTOS_FAIL,
} from "../constants/estadisticaConstants";

export const estadisticaReducer = (state = { resumen: {}, ingresos: [], metodos: [], gastos: [] }, action) => {
    switch (action.type) {
        case ESTADISTICA_RESUMEN_REQUEST: return { ...state, loadingResumen: true };
        case ESTADISTICA_RESUMEN_SUCCESS: return { ...state, loadingResumen: false, resumen: action.payload };
        case ESTADISTICA_RESUMEN_FAIL: return { ...state, loadingResumen: false, errorResumen: action.payload };

        case ESTADISTICA_INGRESOS_REQUEST: return { ...state, loadingIngresos: true };
        case ESTADISTICA_INGRESOS_SUCCESS: return { ...state, loadingIngresos: false, ingresos: action.payload };
        case ESTADISTICA_INGRESOS_FAIL: return { ...state, loadingIngresos: false, errorIngresos: action.payload };

        case ESTADISTICA_METODOS_REQUEST: return { ...state, loadingMetodos: true };
        case ESTADISTICA_METODOS_SUCCESS: return { ...state, loadingMetodos: false, metodos: action.payload };
        case ESTADISTICA_METODOS_FAIL: return { ...state, loadingMetodos: false, errorMetodos: action.payload };

        case ESTADISTICA_GASTOS_REQUEST: return { ...state, loadingGastos: true };
        case ESTADISTICA_GASTOS_SUCCESS: return { ...state, loadingGastos: false, gastosStats: action.payload };
        case ESTADISTICA_GASTOS_FAIL: return { ...state, loadingGastos: false, errorGastos: action.payload };

        default: return state;
    }
};