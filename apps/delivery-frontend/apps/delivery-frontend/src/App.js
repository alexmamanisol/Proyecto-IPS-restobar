import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import OrderViewScreen from "./screens/OrderViewScreen";

const App = () => {
    return (
        <Router>
            <Header />
            <Sidebar />
            <div className="content-wrapper">
                <Switch>
                    <Route exact path="/" component={HomeScreen} />
                    <Route exact path="/delivery" component={DeliveryScreen} />
                    <Route exact path="/order/:id/view" component={OrderViewScreen} />
                    <Route render={() => <h1 style={{padding:"2rem"}}>Ruta no encontrada</h1>} />
                </Switch>
            </div>
            <Footer />
        </Router>
    );
};

export default App;