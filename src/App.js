//import logo from './logo.svg';
//import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import AddTuto from "./composants/AddTuto";
import Tuto from "./composants/Tuto";
//import TutorialsList from "./composants/TutorialsList";


function App() {
  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/tutorials" className="navbar-brand">
        bezKoder
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
        {/*<Route path="/" element={<TutorialsList/>} />*/}
        {/*<Route path="/tutorials" element={<TutorialsList/>} />*/}
        <Route path="/" element={<AddTuto/>} />
        <Route path="/tuto/:id" element={<Tuto/>} />
      </Routes>
    </div>
  </div>
  );
}

export default App;
