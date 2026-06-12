import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardScreen from "./screens/DashboardScreen";
import PagosScreen from "./screens/PagosScreen";
import FacturasScreen from "./screens/FacturasScreen";
import GastosScreen from "./screens/GastosScreen";
import EstadisticasScreen from "./screens/EstadisticasScreen";

const App = () => {
    return (
        <Router>
            <div className="wrapper">
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars"></i></a>
                        </li>
                    </ul>
                </nav>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <a href="/" className="brand-link">
                        <span className="brand-text font-weight-light">Caja - Restobar</span>
                    </a>
                    <div className="sidebar">
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview">
                                <li className="nav-item">
                                    <a href="/" className="nav-link">
                                        <i className="nav-icon fas fa-tachometer-alt"></i>
                                        <p>Dashboard</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/pagos" className="nav-link">
                                        <i className="nav-icon fas fa-dollar-sign"></i>
                                        <p>Pagos</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/facturas" className="nav-link">
                                        <i className="nav-icon fas fa-receipt"></i>
                                        <p>Facturas</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/gastos" className="nav-link">
                                        <i className="nav-icon fas fa-shopping-cart"></i>
                                        <p>Gastos</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/estadisticas" className="nav-link">
                                        <i className="nav-icon fas fa-chart-bar"></i>
                                        <p>Estadísticas</p>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
                <div className="content-wrapper">
                    <Switch>
                        <Route exact path="/" component={DashboardScreen} />
                        <Route path="/pagos" component={PagosScreen} />
                        <Route path="/facturas" component={FacturasScreen} />
                        <Route path="/gastos" component={GastosScreen} />
                        <Route path="/estadisticas" component={EstadisticasScreen} />
                    </Switch>
                </div>
                <footer className="main-footer">
                    <strong>Restobar - Módulo de Caja</strong>
                </footer>
            </div>
        </Router>
    );
};

export default App;