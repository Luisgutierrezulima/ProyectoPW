import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../paginas/style.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userName', data.nombre);
      localStorage.setItem('userEmail', data.email);
      navigate('/');
    } else {
      setError(data.error || 'Error de autenticación');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: '100%', backgroundColor: '#1e1e1e' }}>
        <h2 className="text-center mb-4 text-white">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">Correo Electrónico</label>
            <input type="email" className="form-control rounded-pill" id="email" name="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">Contraseña</label>
            <input type="password" className="form-control rounded-pill" id="password" name="password" required />
          </div>
          {error && <div className="text-danger mb-2">{error}</div>}
          <div className="d-grid gap-2">
            <button type="submit" className="btn" style={{ backgroundColor: '#6500ff', color: 'white' }}>
              Iniciar Sesión
            </button>
            <button type="button" onClick={() => navigate('/register')} className="btn btn-outline-light">
              Registrarme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;