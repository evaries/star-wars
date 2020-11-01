import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Planets from './pages/Planets';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="planets" />
        <Route exact path="/planets">
          <Planets />
        </Route>
        <Redirect from="*" to="planets" />
      </Switch>
    </Router>
  );
}
export default App;
