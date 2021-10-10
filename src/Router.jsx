import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home, SpeechRecognition, News } from "./Template/index";

const Router = () => {
  return (
    <Switch>
      <Route expact path="/recognition" component={SpeechRecognition} />
      <Route expact path="/news" component={News} />
      <Route expact path="/" component={Home} />
    </Switch>
  );
};

export default Router;
