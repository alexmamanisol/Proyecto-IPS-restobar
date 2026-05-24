import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CocinaScreen from "./screens/CocinaScreen";
import ConfigScreen from "./screens/ConfigScreen";
import MenuStockScreen from "./screens/MenuStockScreen";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={CocinaScreen} exact />
                <Route path="/config" component={ConfigScreen} />
                <Route path="/menu" component={MenuStockScreen} />
            </Switch>
        </Router>
    );
};

export default App;
