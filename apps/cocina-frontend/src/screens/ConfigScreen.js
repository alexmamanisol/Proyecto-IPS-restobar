import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Message } from "@restobar/ui";

const API = "/api/coccion";

const config = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo")).token
            : ""
            }`,
    },
});

const ConfigScreen = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const { data } = await axios.get(`${API}/tiempos/productos`, config());
            setProductos(data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const actualizarTiempo = async (id, tiempoPromedio) => {
        try {
            await axios.put(`${API}/tiempos/${id}`, { tiempoPromedio }, config());
            cargarProductos();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const guardarEventos = async (productId, eventos) => {
        try {
            await axios.put(`${API}/tiempos/${productId}/eventos`, { eventos }, config());
            cargarProductos();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="wrapper">
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link btn btn-outline-primary">
                            <i className="fas fa-arrow-left" /> Volver
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="content-wrapper" style={{ marginLeft: 0 }}>
                <section className="content-header">
                    <div className="container-fluid">
                        <h1><i className="fas fa-cog" /> Configuración de Tiempos</h1>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <Message message={error} color={"danger"} />

                        <div className="row">
                            {productos.map((prod) => (
                                <div key={prod.id} className="col-12 col-md-6 col-lg-4 mb-4">
                                    <ProductoConfig
                                        producto={prod}
                                        onGuardarTiempo={actualizarTiempo}
                                        onGuardarEventos={guardarEventos}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

const ProductoConfig = ({ producto, onGuardarTiempo, onGuardarEventos }) => {
    const [tiempo, setTiempo] = useState(producto.tiemposCoccion?.[0]?.tiempoPromedio || 0);
    const [eventos, setEventos] = useState(
        producto.eventosCoccion?.map((e) => ({
            nombre: e.nombre,
            duracionSegundos: e.duracionSegundos,
        })) || [{ nombre: "", duracionSegundos: 0 }]
    );

    const agregarEvento = () => {
        setEventos([...eventos, { nombre: "", duracionSegundos: 0 }]);
    };

    const cambiarEvento = (i, field, value) => {
        const nuevos = [...eventos];
        nuevos[i][field] = value;
        setEventos(nuevos);
    };

    const eliminarEvento = (i) => {
        setEventos(eventos.filter((_, idx) => idx !== i));
    };

    return (
        <div className="card card-info">
            <div className="card-header">
                <h5 className="card-title mb-0">{producto.name}</h5>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label>Tiempo promedio (segundos)</label>
                    <div className="input-group">
                        <input
                            type="number"
                            className="form-control"
                            value={tiempo}
                            onChange={(e) => setTiempo(parseInt(e.target.value) || 0)}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-success"
                                onClick={() => {
                                    if (producto.tiemposCoccion?.[0]?.id) {
                                        onGuardarTiempo(producto.tiemposCoccion[0].id, tiempo);
                                    }
                                }}
                            >
                                <i className="fas fa-save" />
                            </button>
                        </div>
                    </div>
                </div>

                <hr />
                <h6>Eventos de cocción</h6>
                {eventos.map((ev, i) => (
                    <div key={i} className="row mb-2">
                        <div className="col-5">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Nombre del evento"
                                value={ev.nombre}
                                onChange={(e) => cambiarEvento(i, "nombre", e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                placeholder="Duración (seg)"
                                value={ev.duracionSegundos}
                                onChange={(e) => cambiarEvento(i, "duracionSegundos", parseInt(e.target.value) || 0)}
                            />
                        </div>
                        <div className="col-3">
                            <button className="btn btn-danger btn-sm" onClick={() => eliminarEvento(i)}>
                                <i className="fas fa-trash" />
                            </button>
                        </div>
                    </div>
                ))}
                <div className="d-flex justify-content-between mt-2">
                    <button className="btn btn-outline-primary btn-sm" onClick={agregarEvento}>
                        <i className="fas fa-plus" /> Agregar evento
                    </button>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onGuardarEventos(producto.id, eventos)}
                    >
                        <i className="fas fa-save" /> Guardar eventos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfigScreen;
