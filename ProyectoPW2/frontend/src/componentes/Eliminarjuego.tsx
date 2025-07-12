import React, { useState } from 'react';
import { BACKEND_URL } from '../types/api';

type EliminarJuegoProps = {
  id: number;
  onFinish: () => void;
};

const EliminarJuego: React.FC<EliminarJuegoProps> = ({ id, onFinish }) => {
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleEliminar = async () => {
    setMensaje('');
    setError('');
    const res = await fetch(`${BACKEND_URL}/api/juegos/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setMensaje('Juego eliminado correctamente.');
      setTimeout(() => onFinish(), 1000);
    } else {
      const data = await res.json();
      setError(data.error || 'Error al eliminar el juego.');
    }
  };

  return (
    <div className="alert alert-warning mt-4">
      <h5>¿Estás seguro que deseas eliminar este juego?</h5>
      {mensaje && <div className="alert alert-success mt-2">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      <button className="btn btn-danger btn-sm me-2" onClick={handleEliminar}>
        Sí, eliminar
      </button>
      <button className="btn btn-secondary btn-sm" onClick={onFinish}>
        Cancelar
      </button>
    </div>
  );
};

export default EliminarJuego;