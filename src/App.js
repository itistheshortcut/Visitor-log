import React, { Component } from "react";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
//import "./App.css";

class App extends Component {
  state;
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
