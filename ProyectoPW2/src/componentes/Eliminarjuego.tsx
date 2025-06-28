import React, { useState } from 'react';

const EliminarJuego = () => {
  const [id, setId] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleEliminar = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    if (!id) {
      setError('Ingresa el ID del juego a eliminar.');
      return;
    }
    const res = await fetch(`http://localhost:3001/api/juegos/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setMensaje('¡Juego eliminado exitosamente!');
      setId('');
    } else {
      const data = await res.json();
      setError(data.error || 'Error al eliminar el juego.');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Eliminar Juego</h3>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="row g-3" onSubmit={handleEliminar}>
        <div className="col-md-4">
          <label className="form-label">ID del juego*</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={id}
            onChange={e => setId(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-danger btn-sm" type="submit">
            Eliminar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EliminarJuego;