import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listFacturas, createFactura, getFacturaById } from "../actions/facturaActions";
import { listPagos } from "../actions/pagoActions";
import { FACTURA_CREATE_RESET } from "../constants/facturaConstants";

const FacturasScreen = () => {
    const dispatch = useDispatch();

    // Redux state
    const { facturas, loading } = useSelector((state) => state.facturaList);
    const { success, error: errorCreate, loading: loadingCreate } = useSelector((state) => state.facturaCreate);
    const { pagos } = useSelector((state) => state.pagoList);
    const { factura: facturaDetalle, loading: loadingDetalle } = useSelector((state) => state.facturaDetail);

    // Form state
    const [tipo, setTipo] = useState("boleta");
    const [clienteNombre, setClienteNombre] = useState("");
    const [clienteRuc, setClienteRuc] = useState("");
    const [subtotal, setSubtotal] = useState("");
    const [pagoId, setPagoId] = useState("");

    // Filtros state
    const [filtroTipo, setFiltroTipo] = useState("");
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");

    // UI state
    const [mensajeExito, setMensajeExito] = useState(false);
    const [errorRuc, setErrorRuc] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    // Cálculos IGV
    const IGV_RATE = 0.18;
    const igvCalculado = subtotal ? (parseFloat(subtotal) * IGV_RATE).toFixed(2) : "0.00";
    const totalCalculado = subtotal ? (parseFloat(subtotal) * (1 + IGV_RATE)).toFixed(2) : "0.00";

    // Pagos sin factura asociada
    const pagosDisponibles = pagos
        ? pagos.filter((p) => p.estado !== "anulado" && (!p.Facturas || p.Facturas.length === 0))
        : [];

    // Carga inicial
    useEffect(() => {
        dispatch(listPagos());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listFacturas());
    }, [dispatch, success]);

    useEffect(() => {
        if (success) {
            setMensajeExito(true);
            resetFormulario();
            setTimeout(() => setMensajeExito(false), 3000);
            dispatch(listPagos());
        }
    }, [success, dispatch]);

    useEffect(() => {
        return () => {
            dispatch({ type: FACTURA_CREATE_RESET });
        };
    }, [dispatch]);

    const resetFormulario = () => {
        setTipo("boleta");
        setClienteNombre("");
        setClienteRuc("");
        setSubtotal("");
        setPagoId("");
        setErrorRuc("");
    };

    const validarRuc = (ruc) => {
        if (!/^\d{11}$/.test(ruc)) {
            setErrorRuc("El RUC debe tener exactamente 11 dígitos numéricos.");
            return false;
        }
        setErrorRuc("");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tipo === "factura" && !validarRuc(clienteRuc)) return;
        dispatch(createFactura({
            tipo,
            cliente_nombre: clienteNombre,
            cliente_ruc: clienteRuc,
            subtotal: parseFloat(subtotal),
            pago_id: parseInt(pagoId),
        }));
    };

    const handleVerDetalle = (id) => {
        dispatch(getFacturaById(id));
        setModalVisible(true);
    };

    const handleCerrarModal = () => {
        setModalVisible(false);
    };

    const handleImprimir = () => {
        window.print();
    };

    const handleFiltrar = () => {
        dispatch(listFacturas({ tipo: filtroTipo, desde, hasta }));
    };

    const handleLimpiarFiltros = () => {
        setFiltroTipo("");
        setDesde("");
        setHasta("");
        dispatch(listFacturas());
    };

    const totalEmitido = facturas
        ? facturas.reduce((acc, f) => acc + parseFloat(f.total || 0), 0)
        : 0;

    return (
        <>
            {/* ===== ESTILOS DE IMPRESIÓN ===== */}
            <style>{`
                @media print {
                    body * { visibility: hidden; }
                    #comprobante-imprimible,
                    #comprobante-imprimible * { visibility: visible; }
                    #comprobante-imprimible {
                        position: fixed;
                        top: 0; left: 0;
                        width: 100%;
                        padding: 30px;
                        font-family: monospace;
                        font-size: 13px;
                    }
                }
            `}</style>

            <div className="content-header">
                <div className="container-fluid">

                    {/* Título */}
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <h1 className="m-0">
                                <i className="fas fa-file-invoice mr-2 text-primary"></i>
                                Gestión de Facturas
                            </h1>
                            <small className="text-muted">Boletas y facturas emitidas</small>
                        </div>
                        <div className="col-sm-6 text-right">
                            <span className="badge badge-success p-2">
                                <i className="fas fa-check-circle mr-1"></i>
                                {pagosDisponibles.length} pago(s) sin facturar
                            </span>
                        </div>
                    </div>

                    {/* Alertas */}
                    {mensajeExito && (
                        <div className="alert alert-success alert-dismissible">
                            <i className="fas fa-check-circle mr-2"></i>
                            Comprobante generado correctamente.
                        </div>
                    )}
                    {errorCreate && (
                        <div className="alert alert-danger alert-dismissible">
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            {errorCreate}
                        </div>
                    )}

                    <div className="row">

                        {/* ===== FORMULARIO ===== */}
                        <div className="col-md-4">
                            <div className="card card-primary card-outline">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="fas fa-file-invoice mr-2"></i>
                                        Generar Comprobante
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>

                                        {/* Tipo comprobante */}
                                        <div className="form-group">
                                            <label>Tipo de comprobante</label>
                                            <div className="btn-group d-flex">
                                                <button
                                                    type="button"
                                                    className={`btn btn-sm ${tipo === "boleta" ? "btn-primary" : "btn-outline-primary"}`}
                                                    onClick={() => { setTipo("boleta"); setClienteRuc(""); setErrorRuc(""); }}
                                                >
                                                    <i className="fas fa-receipt mr-1"></i> Boleta
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`btn btn-sm ${tipo === "factura" ? "btn-primary" : "btn-outline-primary"}`}
                                                    onClick={() => setTipo("factura")}
                                                >
                                                    <i className="fas fa-file-invoice mr-1"></i> Factura
                                                </button>
                                            </div>
                                        </div>

                                        {/* Selector de pago */}
                                        <div className="form-group">
                                            <label>Pago asociado <span className="text-danger">*</span></label>
                                            {pagosDisponibles.length === 0 ? (
                                                <div className="callout callout-warning p-2">
                                                    <small>
                                                        <i className="fas fa-exclamation-triangle mr-1"></i>
                                                        No hay pagos pendientes de facturar.
                                                    </small>
                                                </div>
                                            ) : (
                                                <select
                                                    className="form-control"
                                                    value={pagoId}
                                                    onChange={(e) => {
                                                        const id = e.target.value;
                                                        setPagoId(id);
                                                        if (id) {
                                                            const pago = pagosDisponibles.find((p) => p.id === parseInt(id));
                                                            if (pago) {
                                                                const sub = (parseFloat(pago.monto) / 1.18).toFixed(2);
                                                                setSubtotal(sub);
                                                            }
                                                        } else {
                                                            setSubtotal("");
                                                        }
                                                    }}
                                                    required
                                                >
                                                    <option value="">— Selecciona un pago —</option>
                                                    {pagosDisponibles.map((pago) => (
                                                        <option key={pago.id} value={pago.id}>
                                                            #{pago.id} | S/ {parseFloat(pago.monto).toFixed(2)} | {pago.metodo_pago}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                            <small className="text-muted">Solo se muestran pagos no facturados.</small>
                                        </div>

                                        {/* Cliente */}
                                        <div className="form-group">
                                            <label>Nombre del cliente</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={clienteNombre}
                                                onChange={(e) => setClienteNombre(e.target.value)}
                                                placeholder="Ej: Juan Pérez"
                                            />
                                        </div>

                                        {/* RUC solo para factura */}
                                        {tipo === "factura" && (
                                            <div className="form-group">
                                                <label>RUC <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errorRuc ? "is-invalid" : clienteRuc.length === 11 ? "is-valid" : ""}`}
                                                    value={clienteRuc}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/\D/g, "");
                                                        setClienteRuc(val);
                                                        if (val.length === 11) setErrorRuc("");
                                                    }}
                                                    onBlur={() => validarRuc(clienteRuc)}
                                                    placeholder="Ej: 20123456789"
                                                    maxLength={11}
                                                    required
                                                />
                                                {errorRuc && <div className="invalid-feedback">{errorRuc}</div>}
                                                {!errorRuc && clienteRuc.length === 11 && (
                                                    <div className="valid-feedback">RUC válido</div>
                                                )}
                                            </div>
                                        )}

                                        {/* Subtotal */}
                                        <div className="form-group">
                                            <label>Subtotal (S/)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={subtotal}
                                                onChange={(e) => setSubtotal(e.target.value)}
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                            <small className="text-muted">Se completa automáticamente al seleccionar un pago.</small>
                                        </div>

                                        {/* Preview IGV */}
                                        {subtotal && (
                                            <div className="callout callout-info p-2 mb-3">
                                                <div className="d-flex justify-content-between">
                                                    <small>Subtotal:</small>
                                                    <small><strong>S/ {parseFloat(subtotal).toFixed(2)}</strong></small>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <small>IGV (18%):</small>
                                                    <small><strong>S/ {igvCalculado}</strong></small>
                                                </div>
                                                <hr className="m-1" />
                                                <div className="d-flex justify-content-between">
                                                    <small><strong>Total:</strong></small>
                                                    <small><strong className="text-primary">S/ {totalCalculado}</strong></small>
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                            disabled={loadingCreate || pagosDisponibles.length === 0}
                                        >
                                            {loadingCreate
                                                ? <><i className="fas fa-spinner fa-spin mr-2"></i>Generando...</>
                                                : <><i className="fas fa-file-invoice mr-2"></i>Generar Comprobante</>
                                            }
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-block mt-2"
                                            onClick={resetFormulario}
                                        >
                                            <i className="fas fa-times mr-2"></i>Limpiar formulario
                                        </button>

                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* ===== LISTA ===== */}
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="fas fa-list mr-2"></i>
                                        Comprobantes emitidos
                                    </h3>
                                </div>

                                {/* Filtros */}
                                <div className="card-body border-bottom pb-3">
                                    <div className="row align-items-end">
                                        <div className="col-md-3">
                                            <label className="mb-1"><small>Tipo</small></label>
                                            <select
                                                className="form-control form-control-sm"
                                                value={filtroTipo}
                                                onChange={(e) => setFiltroTipo(e.target.value)}
                                            >
                                                <option value="">Todos</option>
                                                <option value="boleta">Boleta</option>
                                                <option value="factura">Factura</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="mb-1"><small>Desde</small></label>
                                            <input
                                                type="date"
                                                className="form-control form-control-sm"
                                                value={desde}
                                                onChange={(e) => setDesde(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="mb-1"><small>Hasta</small></label>
                                            <input
                                                type="date"
                                                className="form-control form-control-sm"
                                                value={hasta}
                                                onChange={(e) => setHasta(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <button className="btn btn-sm btn-primary mr-1" onClick={handleFiltrar}>
                                                <i className="fas fa-search mr-1"></i>Filtrar
                                            </button>
                                            <button className="btn btn-sm btn-outline-secondary" onClick={handleLimpiarFiltros}>
                                                <i className="fas fa-times mr-1"></i>Limpiar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabla */}
                                <div className="card-body table-responsive p-0">
                                    {loading ? (
                                        <div className="text-center py-4">
                                            <i className="fas fa-spinner fa-spin fa-2x"></i>
                                            <p className="mt-2">Cargando comprobantes...</p>
                                        </div>
                                    ) : facturas && facturas.length === 0 ? (
                                        <div className="text-center py-4 text-muted">
                                            <i className="fas fa-file-invoice fa-2x mb-2 d-block"></i>
                                            <p>No hay comprobantes registrados.</p>
                                        </div>
                                    ) : (
                                        <table className="table table-bordered table-hover table-sm m-0">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>Número</th>
                                                    <th>Tipo</th>
                                                    <th>Cliente / RUC</th>
                                                    <th>Subtotal</th>
                                                    <th>IGV</th>
                                                    <th>Total</th>
                                                    <th>Fecha</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {facturas && facturas.map((factura) => (
                                                    <tr key={factura.id}>
                                                        <td><strong>{factura.numero}</strong></td>
                                                        <td>
                                                            <span className={`badge badge-${factura.tipo === "factura" ? "primary" : "info"}`}>
                                                                {factura.tipo === "factura" ? "Factura" : "Boleta"}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div>{factura.cliente_nombre || <span className="text-muted">—</span>}</div>
                                                            {factura.tipo === "factura" && factura.cliente_ruc && (
                                                                <small className="text-muted">RUC: {factura.cliente_ruc}</small>
                                                            )}
                                                        </td>
                                                        <td>S/ {parseFloat(factura.subtotal).toFixed(2)}</td>
                                                        <td>S/ {parseFloat(factura.igv).toFixed(2)}</td>
                                                        <td><strong>S/ {parseFloat(factura.total).toFixed(2)}</strong></td>
                                                        <td>{new Date(factura.createdAt).toLocaleDateString("es-PE")}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-xs btn-outline-primary"
                                                                title="Ver detalle"
                                                                onClick={() => handleVerDetalle(factura.id)}
                                                            >
                                                                <i className="fas fa-eye"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot className="thead-light">
                                                <tr>
                                                    <td colSpan="5" className="text-right">
                                                        <strong>Total emitido:</strong>
                                                    </td>
                                                    <td><strong>S/ {totalEmitido.toFixed(2)}</strong></td>
                                                    <td colSpan="2"></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ===== MODAL DETALLE ===== */}
            {modalVisible && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                    onClick={handleCerrarModal}
                >
                    <div
                        className="modal-dialog modal-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content">

                            {/* Header */}
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    <i className="fas fa-file-invoice mr-2"></i>
                                    Detalle del Comprobante
                                </h5>
                                <button
                                    type="button"
                                    className="close text-white"
                                    onClick={handleCerrarModal}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>

                            {/* Body */}
                            <div className="modal-body">
                                {loadingDetalle ? (
                                    <div className="text-center py-4">
                                        <i className="fas fa-spinner fa-spin fa-2x"></i>
                                        <p className="mt-2">Cargando detalle...</p>
                                    </div>
                                ) : facturaDetalle && facturaDetalle.id ? (
                                    <div id="comprobante-imprimible">

                                        {/* Encabezado comprobante */}
                                        <div className="text-center mb-3">
                                            <h4 className="mb-0">
                                                <strong>RESTOBAR</strong>
                                            </h4>
                                            <small className="text-muted">Sistema de Gestión</small>
                                            <hr />
                                            <h5>
                                                <span className={`badge badge-${facturaDetalle.tipo === "factura" ? "primary" : "info"} p-2`}>
                                                    {facturaDetalle.tipo === "factura" ? "FACTURA ELECTRÓNICA" : "BOLETA DE VENTA"}
                                                </span>
                                            </h5>
                                            <h6 className="mt-2">
                                                <strong>{facturaDetalle.numero}</strong>
                                            </h6>
                                        </div>

                                        {/* Datos del cliente */}
                                        <div className="callout callout-info p-2 mb-3">
                                            <small className="text-muted d-block mb-1">
                                                <strong>DATOS DEL CLIENTE</strong>
                                            </small>
                                            <div className="d-flex justify-content-between">
                                                <small>Cliente:</small>
                                                <small><strong>{facturaDetalle.cliente_nombre || "—"}</strong></small>
                                            </div>
                                            {facturaDetalle.tipo === "factura" && (
                                                <div className="d-flex justify-content-between">
                                                    <small>RUC:</small>
                                                    <small><strong>{facturaDetalle.cliente_ruc || "—"}</strong></small>
                                                </div>
                                            )}
                                            <div className="d-flex justify-content-between">
                                                <small>Fecha:</small>
                                                <small>
                                                    <strong>
                                                        {new Date(facturaDetalle.createdAt).toLocaleDateString("es-PE", {
                                                            year: "numeric", month: "long", day: "numeric"
                                                        })}
                                                    </strong>
                                                </small>
                                            </div>
                                        </div>

                                        {/* Montos */}
                                        <div className="callout callout-success p-2 mb-3">
                                            <small className="text-muted d-block mb-1">
                                                <strong>DETALLE DE MONTOS</strong>
                                            </small>
                                            <div className="d-flex justify-content-between">
                                                <small>Subtotal:</small>
                                                <small>S/ {parseFloat(facturaDetalle.subtotal).toFixed(2)}</small>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <small>IGV (18%):</small>
                                                <small>S/ {parseFloat(facturaDetalle.igv).toFixed(2)}</small>
                                            </div>
                                            <hr className="m-1" />
                                            <div className="d-flex justify-content-between">
                                                <small><strong>TOTAL:</strong></small>
                                                <small><strong className="text-success">S/ {parseFloat(facturaDetalle.total).toFixed(2)}</strong></small>
                                            </div>
                                        </div>

                                        {/* Datos del pago asociado */}
                                        {facturaDetalle.Pago && (
                                            <div className="callout callout-warning p-2 mb-2">
                                                <small className="text-muted d-block mb-1">
                                                    <strong>PAGO ASOCIADO</strong>
                                                </small>
                                                <div className="d-flex justify-content-between">
                                                    <small>Método:</small>
                                                    <small>
                                                        <strong className="text-capitalize">
                                                            {facturaDetalle.Pago.metodo_pago}
                                                        </strong>
                                                    </small>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <small>Monto pagado:</small>
                                                    <small>S/ {parseFloat(facturaDetalle.Pago.monto).toFixed(2)}</small>
                                                </div>
                                                {facturaDetalle.Pago.referencia && (
                                                    <div className="d-flex justify-content-between">
                                                        <small>Referencia:</small>
                                                        <small>{facturaDetalle.Pago.referencia}</small>
                                                    </div>
                                                )}
                                                <div className="d-flex justify-content-between">
                                                    <small>Estado:</small>
                                                    <small>
                                                        <span className={`badge badge-${facturaDetalle.Pago.estado === "anulado" ? "danger" : "success"}`}>
                                                            {facturaDetalle.Pago.estado}
                                                        </span>
                                                    </small>
                                                </div>
                                            </div>
                                        )}

                                        <div className="text-center mt-3">
                                            <small className="text-muted">
                                                Comprobante generado por el Sistema Restobar
                                            </small>
                                        </div>

                                    </div>
                                ) : (
                                    <div className="text-center text-muted py-3">
                                        <i className="fas fa-exclamation-circle mr-1"></i>
                                        No se pudo cargar el detalle.
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={handleCerrarModal}
                                >
                                    <i className="fas fa-times mr-1"></i> Cerrar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleImprimir}
                                    disabled={loadingDetalle || !facturaDetalle?.id}
                                >
                                    <i className="fas fa-print mr-1"></i> Imprimir
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FacturasScreen;