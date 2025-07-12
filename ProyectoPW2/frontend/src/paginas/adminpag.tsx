import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componentes/Navbar';

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
    <div className="container my-5">
      <h1 className="mb-4">Configuración de la página</h1>

      <section className="mb-5">
        <button
          className="btn btn-success"
          onClick={() => navigate('/admin/configjuegos')}
        >
          Configuración de Juegos
        </button>
      </section>

      <section className="mb-5">
        <button className="btn btn-success" onClick={() => navigate('/admin/catalogo')}>
          Catálogo de juegos
        </button>
      </section>
    </div>
    </>
  );
};

export default AdminPage;