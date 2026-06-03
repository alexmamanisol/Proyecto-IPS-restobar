import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { Loader, Message, Logo } from "@restobar/ui";

const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, error, loading } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push("/");
        }
    }, [history, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <div
            className="row justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "#cad5df" }}
        >
            <div className="login-box">
                <div className="card">
                    <div className="card-header ">
                        <div className="login-logo">
                            <b>Cocina</b>
                            <div className="text-center">
                                <Logo
                                    className="profile-user-img img-fluid img-circle"
                                    alt="User profile picture"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">
                            Inicia sesión para acceder a la cocina
                        </p>
                        {loading && <Loader variable={loading} />}
                        {error && <Message message={error} color={"danger"} />}
                        <form onSubmit={submitHandler}>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-end">
                                <div className="col-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                    >
                                        Ingresar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
