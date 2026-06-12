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
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">
                    <strong>{item.producto?.name}</strong>
                    <small className="ml-2 text-muted">Orden #{item.orderId}</small>
                </h5>
                <span className="badge bg-info">
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
                <div className="d-flex flex-wrap gap-1">
                    {item.eventos.map((evento, i) => {
                        let btnClass = "btn btn-sm btn-block mb-1 text-left";
                        let icon = "";
                        if (evento.completado) {
                            btnClass += " btn-success";
                            icon = "fas fa-check-circle";
                        } else if (evento.activo) {
                            btnClass += " btn-warning";
                            icon = "fas fa-spinner fa-pulse";
                        } else {
                            btnClass += " btn-secondary";
                            icon = "fas fa-hourglass-half";
                        }
                        return (
                            <div key={i} className="col-12 px-0">
                                <div className={btnClass} style={{ cursor: "default" }}>
                                    <i className={`${icon} mr-2`} />
                                    <span className="mr-auto">{evento.nombre}</span>
                                    <span className={`badge badge-light float-right`}>
                                        {evento.completado ? "Hecho" : formatearTiempo(evento.restante)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
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
