import React from "react";

const formatearTiempo = (segundos) => {
    const m = Math.floor(segundos / 60);
    const s = segundos % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
};

const TarjetaProducto = ({ item }) => {
    const eventosCompletados = item.eventos.filter((e) => e.completado).length;
    const totalEventos = item.eventos.length;
    const progreso = totalEventos > 0 ? (eventosCompletados / totalEventos) * 100 : 0;
    const totalRestante = item.eventos.reduce((acc, e) => acc + (e.completado ? 0 : e.restante), 0);

    return (
        <div className={`card h-100 ${item.completado ? "card-success" : "card-primary"}`}>
            <div className="card-header">
                <h5 className="card-title mb-0">
                    <strong>{item.producto?.name}</strong>
                    <small className="ml-2 text-muted">Orden #{item.orderId}</small>
                </h5>
                <span className="float-right badge bg-info">
                    {formatearTiempo(totalRestante)}
                </span>
            </div>
            <div className="card-body">
                <div className="progress mb-3" style={{ height: 8 }}>
                    <div
                        className="progress-bar bg-success"
                        style={{ width: `${progreso}%` }}
                    />
                </div>
                <ul className="list-group list-group-flush">
                    {item.eventos.map((evento, i) => (
                        <li
                            key={i}
                            className={`list-group-item d-flex justify-content-between align-items-center ${
                                evento.completado ? "list-group-item-success" : ""
                            } ${evento.activo ? "list-group-item-warning" : ""}`}
                        >
                            <span>
                                {evento.nombre}
                                {evento.completado && <i className="fas fa-check-circle ml-2 text-success" />}
                            </span>
                            <span className={`badge ${evento.activo ? "badge-warning" : evento.completado ? "badge-success" : "badge-secondary"}`}>
                                {evento.completado ? "Hecho" : formatearTiempo(evento.restante)}
                            </span>
                        </li>
                    ))}
                </ul>
                {item.completado && (
                    <div className="text-center mt-2">
                        <i className="fas fa-check-circle text-success fa-2x" />
                        <small className="d-block text-muted">Completado</small>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TarjetaProducto;
