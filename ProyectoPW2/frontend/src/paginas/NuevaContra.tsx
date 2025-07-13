import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../paginas/style.css';
import { BACKEND_URL } from '../types/api';

const NuevaContra: React.FC = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nuevaContra, setNuevaContra] = useState('');
  const [confirmarContra, setConfirmarContra] = useState('');

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (!codigo || !nuevaContra || !confirmarContra) {
      setError('Completa todos los campos.');
      return;
    }
    if (nuevaContra !== confirmarContra) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Aquí conectas con el backend
    const res = await fetch(`${BACKEND_URL}/api/recuperar-contrasena`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: codigo, // Aquí debes poner el email del usuario, no el código
        nuevaContrasena: nuevaContra
      }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      setMensaje('¡Contraseña reestablecida!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } else {
      setError(data.error || 'Error al reestablecer la contraseña.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: '100%', backgroundColor: '#1e1e1e' }}>
        <div className="text-end">
          <button onClick={() => navigate('/login')} className="btn btn-sm btn-light rounded-circle">←</button>
        </div>
        <h2 className="fw-bold mb-3 text-white">Reestablece tu contraseña</h2>
        <p className="mb-4 text-white">
          Introduce el código de uso único que se envió al correo verificado de la cuenta.
        </p>
        {mensaje && (
          <div className="alert alert-success text-center py-2" role="alert">
            {mensaje}
          </div>
        )}
        {error && (
          <div className="alert alert-danger text-center py-2" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="code" className="form-label text-light">Código:</label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="code"
              name="code"
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="newPassword" className="form-label text-light">Nueva contraseña:</label>
            <input
              type="password"
              className="form-control rounded-pill"
              id="newPassword"
              name="newPassword"
              value={nuevaContra}
              onChange={e => setNuevaContra(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 text-start">
            <label htmlFor="confirmPassword" className="form-label text-light">Confirme su nueva contraseña:</label>
            <input
              type="password"
              className="form-control rounded-pill"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmarContra}
              onChange={e => setConfirmarContra(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn rounded-pill fw-bold" style={{ backgroundColor: '#6500ff', color: 'white' }}>
              Reestablecer contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaContra;