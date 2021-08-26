import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Calendar from './pages/Calendar.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={Calendar}/>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
