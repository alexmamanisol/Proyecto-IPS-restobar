import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPagos, createPago, anularPago } from "../actions/pagoActions";

const PagosScreen = () => {
    const dispatch = useDispatch();
    const { pagos, loading } = useSelector((state) => state.pagoList);
    const { success } = useSelector((state) => state.pagoCreate);

    const [monto, setMonto] = useState("");
    const [metodoPago, setMetodoPago] = useState("efectivo");
    const [referencia, setReferencia] = useState("");

    useEffect(() => {
        dispatch(listPagos());
    }, [dispatch, success]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPago({ monto, metodo_pago: metodoPago, referencia }));
        setMonto("");
        setReferencia("");
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <h1 className="m-0">Gestión de Pagos</h1>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header bg-success text-white">
                                    <h3 className="card-title">Registrar Pago</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Monto (S/)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={monto}
                                                onChange={(e) => setMonto(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Método de Pago</label>
                                            <select
                                                className="form-control"
                                                value={metodoPago}
                                                onChange={(e) => setMetodoPago(e.target.value)}
                                            >
                                                <option value="efectivo">Efectivo</option>
                                                <option value="tarjeta">Tarjeta</option>
                                                <option value="transferencia">Transferencia</option>
                                                <option value="yape">Yape</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Referencia (opcional)</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={referencia}
                                                onChange={(e) => setReferencia(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-success btn-block">
                                            Registrar Pago
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Lista de Pagos</h3>
                                </div>
                                <div className="card-body table-responsive">
                                    {loading ? <p>Cargando...</p> : (
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Monto</th>
                                                    <th>Método</th>
                                                    <th>Estado</th>
                                                    <th>Fecha</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pagos && pagos.map((pago) => (
                                                    <tr key={pago.id}>
                                                        <td>{pago.id}</td>
                                                        <td>S/ {parseFloat(pago.monto).toFixed(2)}</td>
                                                        <td>{pago.metodo_pago}</td>
                                                        <td>
                                                            <span className={`badge badge-${pago.estado === "completado" ? "success" : pago.estado === "anulado" ? "danger" : "warning"}`}>
                                                                {pago.estado}
                                                            </span>
                                                        </td>
                                                        <td>{new Date(pago.createdAt).toLocaleDateString()}</td>
                                                        <td>
                                                            {pago.estado !== "anulado" && (
                                                                <button
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() => dispatch(anularPago(pago.id))}
                                                                >
                                                                    Anular
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagosScreen;