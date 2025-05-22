import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand texto-acento">GameStore</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/explore">Explore</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/categories">Categories</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/platform">Platform</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/offers">Special Offers</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/mejor-valorados">Mejores Valorados</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/cart">🛒 Ver Carrito</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/admin/noticias"> Noticias</Link></li>
          </ul>
          <button className="btn btn-outline-light me-2"><i className="bi bi-person-circle"></i></button>
          <button className="btn btn-outline-light"><i className="bi bi-search"></i></button>
        </div>
      </div>
    </nav>
  );
}
