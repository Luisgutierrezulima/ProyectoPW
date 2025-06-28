import React, { useState, useEffect } from 'react';
import '../paginas/style.css';
import Navbar from '../componentes/Navbar';

const Configuracion = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pais, setPais] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId');

  // Cargar datos actuales del usuario
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:3001/api/perfil/${userId}`)
      .then(res => res.json())
      .then(data => {
        setNombre(data.nombre || '');
        setEmail(data.email || '');
        // Si tienes país en tu modelo, descomenta:
        // setPais(data.pais || '');
      });
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    if (!userId) {
      setError('No hay usuario autenticado.');
      return;
    }
    const res = await fetch(`http://localhost:3001/api/perfil/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre,
        email,
        password: password || undefined,
        pais: pais || undefined,
      }),
    });
    if (res.ok) {
      setMensaje('¡Datos actualizados!');
      setPassword('');
    } else {
      const data = await res.json();
      setError(data.error || 'Error al actualizar datos.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1>Configuración de Cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className="col-md-3">
            <label className="form-label">Cambiar nombre</label>
            <input
              type="text"
              className="form-control mb-3"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Nombre"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Cambiar correo electrónico</label>
            <input
              type="email"
              className="form-control mb-3"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Correo"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Cambiar contraseña</label>
            <input
              type="password"
              className="form-control mb-3"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="*****"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Cambiar país</label>
            <input
              type="text"
              className="form-control mb-3"
              value={pais}
              onChange={e => setPais(e.target.value)}
              placeholder="País"
            />
          </div>
          <button className="btn btn-success">Guardar Cambios</button>
        </form>
        {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </>
  );
};

export default Configuracion;