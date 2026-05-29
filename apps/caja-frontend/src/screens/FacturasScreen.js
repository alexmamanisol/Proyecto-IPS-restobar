import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listFacturas, createFactura } from "../actions/facturaActions";

const FacturasScreen = () => {
    const dispatch = useDispatch();
    const { facturas, loading } = useSelector((state) => state.facturaList);
    const { success } = useSelector((state) => state.facturaCreate);

    const [tipo, setTipo] = useState("boleta");
    const [clienteNombre, setClienteNombre] = useState("");
    const [clienteRuc, setClienteRuc] = useState("");
    const [subtotal, setSubtotal] = useState("");
    const [pagoId, setPagoId] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("");
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");

    useEffect(() => {
        dispatch(listFacturas());
    }, [dispatch, success]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createFactura({
            tipo,
            cliente_nombre: clienteNombre,
            cliente_ruc: clienteRuc,
            subtotal: parseFloat(subtotal),
            pago_id: parseInt(pagoId),
        }));
        setClienteNombre("");
        setClienteRuc("");
        setSubtotal("");
        setPagoId("");
    };

    const handleFiltrar = () => {
        dispatch(listFacturas({ tipo: filtroTipo, desde, hasta }));
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <h1 className="m-0">Gestión de Facturas</h1>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header bg-primary text-white">
                                    <h3 className="card-title">Generar Factura/Boleta</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Tipo</label>
                                            <select className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                                <option value="boleta">Boleta</option>
                                                <option value="factura">Factura</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Cliente</label>
                                            <input type="text" className="form-control" value={clienteNombre} onChange={(e) => setClienteNombre(e.target.value)} placeholder="Nombre del cliente" />
                                        </div>
                                        {tipo === "factura" && (
                                            <div className="form-group">
                                                <label>RUC</label>
                                                <input type="text" className="form-control" value={clienteRuc} onChange={(e) => setClienteRuc(e.target.value)} placeholder="RUC" />
                                            </div>
                                        )}
                                        <div className="form-group">
                                            <label>Subtotal (S/)</label>
                                            <input type="number" className="form-control" value={subtotal} onChange={(e) => setSubtotal(e.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                            <label>ID de Pago</label>
                                            <input type="number" className="form-control" value={pagoId} onChange={(e) => setPagoId(e.target.value)} required />
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Generar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Lista de Facturas</h3>
                                    <div className="card-tools">
                                        <div className="input-group input-group-sm">
                                            <select className="form-control" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                                                <option value="">Todos</option>
                                                <option value="boleta">Boleta</option>
                                                <option value="factura">Factura</option>
                                            </select>
                                            <input type="date" className="form-control" value={desde} onChange={(e) => setDesde(e.target.value)} />
                                            <input type="date" className="form-control" value={hasta} onChange={(e) => setHasta(e.target.value)} />
                                            <button className="btn btn-sm btn-primary" onClick={handleFiltrar}>Filtrar</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body table-responsive">
                                    {loading ? <p>Cargando...</p> : (
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Número</th>
                                                    <th>Tipo</th>
                                                    <th>Cliente</th>
                                                    <th>Subtotal</th>
                                                    <th>IGV</th>
                                                    <th>Total</th>
                                                    <th>Fecha</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {facturas && facturas.map((factura) => (
                                                    <tr key={factura.id}>
                                                        <td>{factura.numero}</td>
                                                        <td><span className={`badge badge-${factura.tipo === "factura" ? "primary" : "info"}`}>{factura.tipo}</span></td>
                                                        <td>{factura.cliente_nombre || "-"}</td>
                                                        <td>S/ {parseFloat(factura.subtotal).toFixed(2)}</td>
                                                        <td>S/ {parseFloat(factura.igv).toFixed(2)}</td>
                                                        <td>S/ {parseFloat(factura.total).toFixed(2)}</td>
                                                        <td>{new Date(factura.createdAt).toLocaleDateString()}</td>
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

export default FacturasScreen;