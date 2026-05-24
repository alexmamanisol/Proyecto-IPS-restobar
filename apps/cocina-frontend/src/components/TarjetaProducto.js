import React from "react";

const TarjetaProducto = ({ item, onAvanzar }) => {
    return (
        <div className="card card-primary h-100">
            <div className="card-header">
                <h5 className="card-title">
                    <strong>{item.producto?.name}</strong>
                    <small className="ml-2 text-muted">Orden #{item.orderId}</small>
                </h5>
                <span className={`float-right badge ${item.estado === "cooking" ? "bg-warning" : "bg-secondary"}`}>
                    {item.estado === "cooking" ? "En cocción" : "Pendiente"}
                </span>
            </div>
            <div className="card-body">
                {item.eventos?.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {item.eventos.map((evento) => (
                            <li
                                key={evento.id}
                                className={`list-group-item d-flex justify-content-between align-items-center ${evento.estado === "completed" ? "list-group-item-success" : ""
                                    } ${evento.estado === "cooking" ? "list-group-item-warning" : ""}`}
                            >
                                <span>
                                    {evento.eventoCoccion?.nombre || "Evento"}
                                    <small className="d-block text-muted">
                                        {evento.eventoCoccion?.duracionSegundos
                                            ? `${Math.round(evento.eventoCoccion.duracionSegundos / 60)}min`
                                            : ""}
                                        {evento.iniciadoEn && ` · ${new Date(evento.iniciadoEn).toLocaleTimeString()}`}
                                    </small>
                                </span>

                                {evento.estado === "cooking" && (
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => onAvanzar(evento.id)}
                                    >
                                        <i className="fas fa-check" /> Terminado
                                    </button>
                                )}
                                {evento.estado === "completed" && (
                                    <i className="fas fa-check-circle text-success" />
                                )}
                                {evento.estado === "pending" && (
                                    <i className="fas fa-hourglass-start text-muted" />
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-muted mb-0">Sin eventos definidos</p>
                )}

                <hr />
                <div className="text-center text-muted small">
                    Iniciado: {item.iniciadoEn && new Date(item.iniciadoEn).toLocaleTimeString()}
                </div>
            </div>
        </div>
    );
};

export default TarjetaProducto;
