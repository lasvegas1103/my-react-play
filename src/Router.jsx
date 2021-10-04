import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home, SpeechRecognition } from "./Template/index"

const Router = () => {
    return (
        <Switch>
            <Route expact path="/recognition" component={SpeechRecognition} />
            <Route expact path="/" component={Home} />
        </Switch>
    )
};

export default Router;