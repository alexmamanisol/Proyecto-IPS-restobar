import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listGastos, createGasto, deleteGasto } from "../actions/gastoActions";

const GastosScreen = () => {
    const dispatch = useDispatch();
    const { gastos, loading } = useSelector((state) => state.gastoList);
    const { success } = useSelector((state) => state.gastoCreate);

    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("insumos");
    const [monto, setMonto] = useState("");
    const [fecha, setFecha] = useState("");
    const [comprobante, setComprobante] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState("");
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");

    useEffect(() => {
        dispatch(listGastos());
    }, [dispatch, success]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createGasto({ descripcion, categoria, monto: parseFloat(monto), fecha, comprobante }));
        setDescripcion("");
        setMonto("");
        setFecha("");
        setComprobante("");
    };

    const handleFiltrar = () => {
        dispatch(listGastos({ categoria: filtroCategoria, desde, hasta }));
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <h1 className="m-0">Gestión de Gastos</h1>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header bg-danger text-white">
                                    <h3 className="card-title">Registrar Gasto</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Descripción</label>
                                            <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Categoría</label>
                                            <select className="form-control" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                                <option value="insumos">Insumos</option>
                                                <option value="mantenimiento">Mantenimiento</option>
                                                <option value="alquiler">Alquiler</option>
                                                <option value="pagos_externos">Pagos Externos</option>
                                                <option value="impuestos">Impuestos</option>
                                                <option value="otros">Otros</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Monto (S/)</label>
                                            <input type="number" className="form-control" value={monto} onChange={(e) => setMonto(e.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Fecha</label>
                                            <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Comprobante (opcional)</label>
                                            <input type="text" className="form-control" value={comprobante} onChange={(e) => setComprobante(e.target.value)} />
                                        </div>
                                        <button type="submit" className="btn btn-danger btn-block">
                                            Registrar Gasto
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Lista de Gastos</h3>
                                    <div className="card-tools">
                                        <div className="input-group input-group-sm">
                                            <select className="form-control" value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                                                <option value="">Todas las categorías</option>
                                                <option value="insumos">Insumos</option>
                                                <option value="mantenimiento">Mantenimiento</option>
                                                <option value="alquiler">Alquiler</option>
                                                <option value="pagos_externos">Pagos Externos</option>
                                                <option value="impuestos">Impuestos</option>
                                                <option value="otros">Otros</option>
                                            </select>
                                            <input type="date" className="form-control" value={desde} onChange={(e) => setDesde(e.target.value)} />
                                            <input type="date" className="form-control" value={hasta} onChange={(e) => setHasta(e.target.value)} />
                                            <button className="btn btn-sm btn-danger" onClick={handleFiltrar}>Filtrar</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body table-responsive">
                                    {loading ? <p>Cargando...</p> : (
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Descripción</th>
                                                    <th>Categoría</th>
                                                    <th>Monto</th>
                                                    <th>Fecha</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {gastos && gastos.map((gasto) => (
                                                    <tr key={gasto.id}>
                                                        <td>{gasto.id}</td>
                                                        <td>{gasto.descripcion}</td>
                                                        <td><span className="badge badge-warning">{gasto.categoria}</span></td>
                                                        <td>S/ {parseFloat(gasto.monto).toFixed(2)}</td>
                                                        <td>{gasto.fecha}</td>
                                                        <td>
                                                            <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteGasto(gasto.id))}>
                                                                <i className="fas fa-trash"></i>
                                                            </button>
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

export default GastosScreen;