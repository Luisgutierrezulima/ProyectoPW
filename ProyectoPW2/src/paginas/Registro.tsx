import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../paginas/style.css';

const Registro: React.FC = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nombre = (e.target as any).username.value;
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    const res = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      setMensaje('¡Usuario registrado exitosamente!');
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setError(data.error || 'Error al registrar');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: 500, width: '100%', backgroundColor: '#1e1e1e' }}>
        <div className="text-end w-100 mb-3">
          <button onClick={() => navigate('/login')} className="btn btn-sm btn-light rounded-circle">←</button>
        </div>
        <h2 className="text-center mb-3 fw-bold text-white">Crear cuenta</h2>
        {mensaje && <div className="alert alert-success text-center py-2" role="alert">{mensaje}</div>}
        {error && <div className="alert alert-danger text-center py-2" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">Correo:</label>
            <input type="email" className="form-control rounded-pill" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">Contraseña:</label>
            <input type="password" className="form-control rounded-pill" id="password" required />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-light">Usuario:</label>
            <input type="text" className="form-control rounded-pill" id="username" required />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn rounded-pill fw-bold" style={{ backgroundColor: '#6500ff', color: 'white' }}>
              Continuar →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;