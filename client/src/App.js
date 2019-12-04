import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import homepage from  './components/homepage/homepage';
import profile from  './components/profile/profile';
import './App.css';

function App() {
  return (
    <div>
        <Router>
          <div className="App">
            <Route exact path="/" component={homepage} />
            <Route exact path="/profile" component={profile} />
          </div>
        </Router>
      </div>
  );
}

export default App;
