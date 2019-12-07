import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import homepage from  './components/homepage/homepage';
import './App.css';

function App() {
  return (
    <div>
        <Router>
          <div className="App">
            <Route exact path="/" component={homepage} />
          </div>
        </Router>
      </div>
  );
}
export default App;
