import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Popup from "./popup_component.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";


class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/login/" component={Login} />
                        <Route path="/register/" component={Register} />
                        <Route component={Popup} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default AppRouter;