import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Calendar from './Components/Calendar.js';
import CreateAccount from './Components/CreateAccount.js';
import VerifySlack from './Components/VerifySlack.js';
import About from './Pages/About.js';

function App() {
    
    return (
        <Router>
        <div className="App">
        <Switch>
        <Route path="/" component={Calendar} exact/>
        <Route path="/verify/slack" component={VerifySlack}/>
        <Route path="/account/register" component={CreateAccount}/>
        <Route path="/about" component={About}/>
        </Switch>
        </div>
        </Router>
        
        );
    }
    
    export default App;
    