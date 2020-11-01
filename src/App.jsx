import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Planets from './pages/Planets';
import Planet from './pages/Planet';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="planets" />
        <Route exact path="/planets">
          <Planets />
        </Route>
        <Route path="/planets/:planetId">
          <Planet />
        </Route>
        <Redirect from="*" to="planets" />
      </Switch>
    </Router>
  );
}
export default App;
