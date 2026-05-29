import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResumenGeneral, getIngresos, getMetodosPago, getResumenGastos } from "../actions/estadisticaActions";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const EstadisticasScreen = () => {
    const dispatch = useDispatch();
    const { resumen, ingresos, metodos, gastosStats } = useSelector((state) => state.estadisticas);
    const [periodo, setPeriodo] = useState("mes");

    useEffect(() => {
        dispatch(getResumenGeneral());
        dispatch(getMetodosPago());
        dispatch(getResumenGastos());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getIngresos(periodo));
    }, [dispatch, periodo]);

    const ingresosData = {
        labels: ingresos?.map((i) => i.periodo) || [],
        datasets: [{
            label: "Ingresos (S/)",
            data: ingresos?.map((i) => i.total) || [],
            backgroundColor: "rgba(40, 167, 69, 0.7)",
        }],
    };

    const metodosData = {
        labels: metodos?.map((m) => m.metodo_pago) || [],
        datasets: [{
            data: metodos?.map((m) => m.cantidad) || [],
            backgroundColor: ["#28a745", "#007bff", "#ffc107", "#dc3545"],
        }],
    };

    const gastosData = {
        labels: gastosStats?.map((g) => g.categoria) || [],
        datasets: [{
            data: gastosStats?.map((g) => g.total) || [],
            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40"],
        }],
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <h1 className="m-0">Estadísticas</h1>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>S/ {resumen.totalIngresos?.toFixed(2) || "0.00"}</h3>
                                    <p>Total Ingresos</p>
                                </div>
                                <div className="icon"><i className="fas fa-dollar-sign"></i></div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>S/ {resumen.totalGastos?.toFixed(2) || "0.00"}</h3>
                                    <p>Total Gastos</p>
                                </div>
                                <div className="icon"><i className="fas fa-shopping-cart"></i></div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>S/ {resumen.ganancia?.toFixed(2) || "0.00"}</h3>
                                    <p>Ganancia Neta</p>
                                </div>
                                <div className="icon"><i className="fas fa-chart-line"></i></div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>{resumen.totalFacturas || 0}</h3>
                                    <p>Total Facturas</p>
                                </div>
                                <div className="icon"><i className="fas fa-receipt"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Ingresos por Período</h3>
                                    <div className="card-tools">
                                        <select className="form-control form-control-sm" value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
                                            <option value="dia">Por Día</option>
                                            <option value="semana">Por Semana</option>
                                            <option value="mes">Por Mes</option>
                                            <option value="año">Por Año</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <Bar data={ingresosData} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Métodos de Pago</h3>
                                </div>
                                <div className="card-body">
                                    <Pie data={metodosData} />
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Gastos por Categoría</h3>
                                </div>
                                <div className="card-body">
                                    <Pie data={gastosData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasScreen;