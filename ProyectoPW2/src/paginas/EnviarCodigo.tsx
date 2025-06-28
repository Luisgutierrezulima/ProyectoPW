import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../paginas/style.css';

const EnviarCodigo: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    if (!email) {
      setError('Ingresa tu correo.');
      return;
    }
    // Se simula el envío del código al correo
    setMensaje('¡Código enviado! Revisa tu correo.');
    setTimeout(() => {
      navigate('/resetPassword');
    }, 1500);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: '100%', backgroundColor: '#1e1e1e' }}>
        <div className="text-end">
          <button onClick={() => navigate('/login')} className="btn btn-sm btn-light rounded-circle">←</button>
        </div>
        <h2 className="fw-bold mb-3 text-white">Recuperar contraseña</h2>
        <p className="mb-4 text-white">
          Ingresa tu correo y te enviaremos un código para restablecer tu contraseña.
        </p>
        {mensaje && <div className="alert alert-success text-center py-2" role="alert">{mensaje}</div>}
        {error && <div className="alert alert-danger text-center py-2" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label text-light">Correo:</label>
            <input
              type="email"
              className="form-control rounded-pill"
              id="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn rounded-pill fw-bold" style={{ backgroundColor: '#6500ff', color: 'white' }}>
              Enviar código
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnviarCodigo;