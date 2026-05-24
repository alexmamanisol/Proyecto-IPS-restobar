import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loader, Message } from "@restobar/ui";
import { listarPendientes, listarTerminados, avanzarEvento } from "../actions/coccionActions";
import TarjetaProducto from "../components/TarjetaProducto";

const CocinaScreen = () => {
    const dispatch = useDispatch();

    const colaPendientes = useSelector((state) => state.colaPendientes);
    const { loading: loadingPend, error: errorPend, items: pendientes } = colaPendientes;

    const colaTerminados = useSelector((state) => state.colaTerminados);
    const { loading: loadingTerm, error: errorTerm, items: terminados } = colaTerminados;

    useEffect(() => {
        dispatch(listarPendientes());
        dispatch(listarTerminados());
        const interval = setInterval(() => {
            dispatch(listarPendientes());
            dispatch(listarTerminados());
        }, 10000);
        return () => clearInterval(interval);
    }, [dispatch]);

    const handleAvanzar = (eventoId) => {
        dispatch(avanzarEvento(eventoId));
    };

    return (
        <div className="wrapper">
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/config" className="nav-link btn btn-outline-secondary mr-2">
                            <i className="fas fa-cog" /> Config
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/menu" className="nav-link btn btn-outline-info">
                            <i className="fas fa-book" /> Menú
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="content-wrapper" style={{ marginLeft: 0 }}>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>
                                    <i className="fas fa-utensils" /> Cocina
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-8">
                                <div className="card card-warning">
                                    <div className="card-header">
                                        <h3 className="card-title">
                                            <i className="fas fa-clock" /> Alimentos por Hacer
                                        </h3>
                                        <Loader variable={loadingPend} />
                                    </div>
                                    <div className="card-body">
                                        <Message message={errorPend} color={"danger"} />
                                        {pendientes.length === 0 && !loadingPend ? (
                                            <p className="text-muted text-center">
                                                No hay alimentos en preparación
                                            </p>
                                        ) : (
                                            <div className="row">
                                                {pendientes.map((item) => (
                                                    <div key={item.id} className="col-12 col-md-6 mb-3">
                                                        <TarjetaProducto
                                                            item={item}
                                                            onAvanzar={handleAvanzar}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-4">
                                <div className="card card-success">
                                    <div className="card-header">
                                        <h3 className="card-title">
                                            <i className="fas fa-check-circle" /> Alimentos Terminados
                                        </h3>
                                        <Loader variable={loadingTerm} />
                                    </div>
                                    <div className="card-body">
                                        <Message message={errorTerm} color={"danger"} />
                                        {terminados.length === 0 && !loadingTerm ? (
                                            <p className="text-muted text-center">
                                                No hay alimentos terminados
                                            </p>
                                        ) : (
                                            <ul className="products-list product-list-in-card">
                                                {terminados.map((item) => (
                                                    <li key={item.id} className="item">
                                                        <div className="product-info">
                                                            <span className="product-title">
                                                                {item.producto?.name}
                                                            </span>
                                                            <span className="product-description">
                                                                Orden #{item.orderId} ·{" "}
                                                                {item.completadoEn && new Date(item.completadoEn).toLocaleTimeString()}
                                                            </span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CocinaScreen;
