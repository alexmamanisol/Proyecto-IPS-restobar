import React, { useState } from "react";
import HeaderContent from "../components/HeaderContent";

const EditorScreen = () => {
    const [employeeUser, setEmployeeUser] = useState("");
    const [employeePassword, setEmployeePassword] = useState("");

    const handleRequest = (e) => {
        e.preventDefault();

        alert(
            "Acceso temporal solicitado. (Implementación real pendiente)"
        );
    };

    return (
        <>
            <HeaderContent name={"Modo Editor"} />

            <section className="content">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-md-8 offset-md-2">

                            <div className="card card-warning">

                                <div className="card-header">
                                    <h3 className="card-title">
                                        Solicitar Acceso Temporal
                                    </h3>
                                </div>

                                <div className="card-body">

                                    <div className="alert alert-warning">
                                        <strong>Administrador:</strong>
                                        {" "}
                                        No estás haciendo bien tu rol.
                                        Solicito realizar cambios en tu módulo.
                                    </div>

                                    <form onSubmit={handleRequest}>

                                        <div className="form-group">
                                            <label>
                                                Usuario del encargado
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={employeeUser}
                                                onChange={(e) =>
                                                    setEmployeeUser(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Ingrese usuario"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>
                                                Contraseña del encargado
                                            </label>

                                            <input
                                                type="password"
                                                className="form-control"
                                                value={employeePassword}
                                                onChange={(e) =>
                                                    setEmployeePassword(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Ingrese contraseña"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-warning"
                                        >
                                            Solicitar Acceso por 5 minutos
                                        </button>

                                    </form>

                                </div>

                            </div>

                            <div className="card">

                                <div className="card-header">
                                    <h3 className="card-title">
                                        Estado del Modo Editor
                                    </h3>
                                </div>

                                <div className="card-body">

                                    <p>
                                        El acceso temporal permitirá editar
                                        módulos de otros responsables
                                        únicamente durante 5 minutos.
                                    </p>

                                    <p>
                                        Esta funcionalidad busca evitar
                                        modificaciones arbitrarias y promover
                                        la coordinación entre administrador
                                        y encargado del módulo.
                                    </p>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default EditorScreen;