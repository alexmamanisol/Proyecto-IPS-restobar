import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResumenGeneral } from "../actions/estadisticaActions";

const DashboardScreen = () => {
    const dispatch = useDispatch();
    const { resumen, loadingResumen } = useSelector((state) => state.estadisticas);

    useEffect(() => {
        dispatch(getResumenGeneral());
    }, [dispatch]);

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <h1 className="m-0">Dashboard - Caja</h1>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    {loadingResumen ? (
                        <p>Cargando...</p>
                    ) : (
                        <div className="row">
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
                                        <h3>{resumen.totalPagos || 0}</h3>
                                        <p>Total Pagos</p>
                                    </div>
                                    <div className="icon"><i className="fas fa-receipt"></i></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardScreen;