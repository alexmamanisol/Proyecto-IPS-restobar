import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResumenGeneral } from "../actions/estadisticaActions";
import { listPagos } from "../actions/pagoActions";

const PERIODOS = [
    { valor: "hoy",    label: "Hoy" },
    { valor: "semana", label: "Semana" },
    { valor: "mes",    label: "Mes" },
    { valor: "año",    label: "Año" },
];

const DashboardScreen = () => {
    const dispatch = useDispatch();
    const { resumen, loadingResumen } = useSelector((state) => state.estadisticas);
    const { pagos, loading: loadingPagos } = useSelector((state) => state.pagoList);
    const [periodo, setPeriodo] = useState("mes");

    useEffect(() => {
        dispatch(getResumenGeneral(periodo));
        dispatch(listPagos());
    }, [dispatch, periodo]);

    const handlePeriodo = (valor) => {
        setPeriodo(valor);
    };

    return (
        <div className="content-header">
            <div className="container-fluid">

                {/* Título + filtros */}
                <div className="row mb-3 align-items-center">
                    <div className="col-sm-6">
                        <h1 className="m-0">Dashboard - Caja</h1>
                    </div>
                    <div className="col-sm-6 text-right">
                        <div className="btn-group">
                            {PERIODOS.map((p) => (
                                <button
                                    key={p.valor}
                                    className={`btn btn-sm ${periodo === p.valor ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => handlePeriodo(p.valor)}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Cards de resumen */}
                {loadingResumen ? (
                    <div className="text-center py-4">
                        <i className="fas fa-spinner fa-spin fa-2x"></i>
                        <p className="mt-2">Cargando resumen...</p>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>S/ {resumen.totalIngresos?.toFixed(2) || "0.00"}</h3>
                                    <p>Total Ingresos</p>
                                </div>
                                <div className="icon"><i className="fas fa-dollar-sign"></i></div>
                                <a href="/pagos" className="small-box-footer">
                                    Ver pagos <i className="fas fa-arrow-circle-right"></i>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>S/ {resumen.totalGastos?.toFixed(2) || "0.00"}</h3>
                                    <p>Total Gastos</p>
                                </div>
                                <div className="icon"><i className="fas fa-shopping-cart"></i></div>
                                <a href="/gastos" className="small-box-footer">
                                    Ver gastos <i className="fas fa-arrow-circle-right"></i>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>S/ {resumen.ganancia?.toFixed(2) || "0.00"}</h3>
                                    <p>Ganancia Neta</p>
                                </div>
                                <div className="icon"><i className="fas fa-chart-line"></i></div>
                                <a href="/estadisticas" className="small-box-footer">
                                    Ver estadísticas <i className="fas fa-arrow-circle-right"></i>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>{resumen.totalPagos || 0}</h3>
                                    <p>Total Pagos</p>
                                </div>
                                <div className="icon"><i className="fas fa-receipt"></i></div>
                                <a href="/facturas" className="small-box-footer">
                                    Ver facturas <i className="fas fa-arrow-circle-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Accesos rápidos */}
                <div className="row mt-2">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <i className="fas fa-bolt mr-2"></i>Accesos Rápidos
                                </h3>
                            </div>
                            <div className="card-body">
                                <div className="row text-center">
                                    <div className="col-6 col-md-3 mb-3">
                                        <a href="/pagos" className="btn btn-success btn-lg btn-block">
                                            <i className="fas fa-plus-circle d-block mb-1" style={{ fontSize: "1.5rem" }}></i>
                                            Nuevo Pago
                                        </a>
                                    </div>
                                    <div className="col-6 col-md-3 mb-3">
                                        <a href="/facturas" className="btn btn-primary btn-lg btn-block">
                                            <i className="fas fa-file-invoice d-block mb-1" style={{ fontSize: "1.5rem" }}></i>
                                            Nueva Factura
                                        </a>
                                    </div>
                                    <div className="col-6 col-md-3 mb-3">
                                        <a href="/gastos" className="btn btn-danger btn-lg btn-block">
                                            <i className="fas fa-minus-circle d-block mb-1" style={{ fontSize: "1.5rem" }}></i>
                                            Registrar Gasto
                                        </a>
                                    </div>
                                    <div className="col-6 col-md-3 mb-3">
                                        <a href="/estadisticas" className="btn btn-info btn-lg btn-block">
                                            <i className="fas fa-chart-bar d-block mb-1" style={{ fontSize: "1.5rem" }}></i>
                                            Estadísticas
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

{/* Últimos movimientos */}
<div className="row mt-2">
<div className="col-12">
    <div className="card">
        <div className="card-header">
            <h3 className="card-title">
                <i className="fas fa-history mr-2"></i>Últimos Movimientos
            </h3>
        </div>
        <div className="card-body p-0">
            {loadingPagos ? (
                <div className="text-center py-3">
                    <i className="fas fa-spinner fa-spin"></i> Cargando...
                </div>
            ) : pagos.length === 0 ? (
                <div className="text-center py-3 text-muted">
                    No hay movimientos registrados.
                </div>
            ) : (
                <table className="table table-striped table-sm m-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Método</th>
                            <th>Monto</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagos.slice(0, 8).map((pago) => (
                            <tr key={pago.id}>
                                <td>{pago.id}</td>
                                <td>
                                    <span className="badge badge-secondary text-capitalize">
                                        {pago.metodo_pago}
                                    </span>
                                </td>
                                <td>S/ {parseFloat(pago.monto).toFixed(2)}</td>
                                <td>
                                    <span className={`badge ${pago.estado === "completado" ? "badge-success" : "badge-danger"}`}>
                                        {pago.estado}
                                    </span>
                                </td>
                                <td>{new Date(pago.createdAt).toLocaleDateString("es-PE")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        <div className="card-footer text-right">
            <a href="/pagos" className="btn btn-sm btn-outline-primary">
                Ver todos <i className="fas fa-arrow-right ml-1"></i>
            </a>
        </div>
    </div>
</div>
</div>

                {/* Placeholder futuras integraciones */}
                <div className="row mt-2">
                    <div className="col-md-6">
                        <div className="card card-outline card-secondary">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <i className="fas fa-chair mr-2"></i>Cobro por Mesa
                                </h3>
                                <div className="card-tools">
                                    <span className="badge badge-secondary">Próximamente</span>
                                </div>
                            </div>
                            <div className="card-body text-center text-muted py-4">
                                <i className="fas fa-plug fa-2x mb-2"></i>
                                <p>Se conectará con el módulo de Mesas</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card card-outline card-secondary">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <i className="fas fa-motorcycle mr-2"></i>Cobro Delivery
                                </h3>
                                <div className="card-tools">
                                    <span className="badge badge-secondary">Próximamente</span>
                                </div>
                            </div>
                            <div className="card-body text-center text-muted py-4">
                                <i className="fas fa-plug fa-2x mb-2"></i>
                                <p>Se conectará con el módulo de Delivery</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardScreen;