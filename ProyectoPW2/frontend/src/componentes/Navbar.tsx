import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Navbar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/tienda" className="navbar-brand texto-acento">GameStore</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/explore">Explorar</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/categories">Categorías</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/plataformas">Plataforma</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/offers">Ofertas especiales</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/mejor-valorados">Mejor Valorados</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/masvendi">Mas vendidos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/configuracion">Configuración</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/adminpag">Admin</Link></li>
          </ul>

          {/* Buscador */}
          <input type="text" className="form-control form-control-sm me-3" placeholder="Buscar juego" style={{ maxWidth: '160px' }} />

          {/* Mostrar nombre de usuario con menú de cerrar sesión */}
          {userName && (
            <div className="dropdown me-3">
              <span
                className="navbar-text texto-acento dropdown-toggle"
                style={{ cursor: 'pointer' }}
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded={showMenu ? "true" : "false"}
                onClick={() => setShowMenu(!showMenu)}
              >
                <i className="bi bi-person-circle me-1"></i>
                {userName}
              </span>
              <ul
                className={`dropdown-menu dropdown-menu-end${showMenu ? " show" : ""} bg-dark text-light`}
                aria-labelledby="userDropdown"
                style={{ minWidth: 150, backgroundColor: "#2d2d30" }}
              >
                <li>
                  <button className="dropdown-item text-light" style={{ backgroundColor: "#2d2d30" }} onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Botón carrito */}
          <button className="btn btn-outline-light me-3" onClick={() => navigate('/cart')}>
            <i className="bi bi-cart"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}