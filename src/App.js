//import logo from './logo.svg';
import './App.css';
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import AddTuto from "./composants/AddTuto";
import Tuto from "./composants/TutoModif";
import TutoList from "./composants/TutoList";
import TutoListTable from "./composants/TutoListTable";
import TutoDetails from "./composants/TutoDetails";
import ImageUpload from './composants/ImageUpload';
import ImageUploadMultiple from './composants/ImageUploadMultiple';
import Print from './composants/Print';


function App() {
  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" className="navbar-brand">
        Koder
      </a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/tutorialslist"} className="nav-link">
            Tutorials
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/add"} className="nav-link">
            Add
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/upload"} className="nav-link">
            Upload
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/uploadmultiple"} className="nav-link">
            Upload multiple
          </Link>
        </li>
      </div>
    </nav>

    <div className="container mt-3">
      <Routes>
        {<Route path="/" element={<TutoList/>} />}
        {<Route path="/tutorialslist" element={<TutoListTable/>} />}
        <Route path="/add" element={<AddTuto/>} />
        <Route path="/tuto/:id" element={<Tuto/>} />
        <Route path="/details/:id" element={<TutoDetails/>} />
        <Route path="/upload" element={<ImageUpload/>} />
        <Route path="/uploadmultiple" element={<ImageUploadMultiple/>} />
        <Route path="/pdf" element={<Print/>} />

      </Routes>
    </div>
  </div>
  );
}

export default App;
