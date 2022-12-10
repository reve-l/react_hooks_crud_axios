//import logo from './logo.svg';
//import './App.css';
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import AddTuto from "./composants/AddTuto2";
import Tuto from "./composants/Tuto2";
import TutoList from "./composants/TutoList";


function App() {
  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/tutorials" className="navbar-brand">
        Koder
      </a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/tutorials"} className="nav-link">
            Tutorials
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/add"} className="nav-link">
            Add
          </Link>
        </li>
      </div>
    </nav>

    <div className="container mt-3">
      <Routes>
        {<Route path="/" element={<TutoList/>} />}
        {<Route path="/tutorials" element={<TutoList/>} />}
        <Route path="/add" element={<AddTuto/>} />
        <Route path="/tuto/:id" element={<Tuto/>} />
      </Routes>
    </div>
  </div>
  );
}

export default App;
