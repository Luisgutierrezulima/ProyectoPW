import React, { useState } from 'react';
import { BACKEND_URL } from '../types/api';

type AgregarDescuentoProps = {
  id: number;
  onFinish: () => void;
};

const AgregarDescuento: React.FC<AgregarDescuentoProps> = ({ id, onFinish }) => {
  const [porcentaje, setPorcentaje] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleDescuento = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    if (!porcentaje) {
      setError('Completa el porcentaje.');
      return;
    }
    const resJuego = await fetch(`${BACKEND_URL}/api/juegos/${id}`);
    if (!resJuego.ok) {
      setError('No se encontró el juego con ese ID.');
      return;
    }
    const juego = await resJuego.json();
    const nuevoPrecio = juego.precio - (juego.precio * (parseFloat(porcentaje) / 100));
    const res = await fetch(`${BACKEND_URL}/api/juegos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...juego,
        precio: nuevoPrecio,
        oferta: true,
      }),
    });
    if (res.ok) {
      setMensaje('¡Descuento aplicado exitosamente!');
      setTimeout(() => onFinish(), 1000);
    } else {
      const data = await res.json();
      setError(data.error || 'Error al aplicar el descuento.');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Aplicar Descuento</h3>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="row g-3" onSubmit={handleDescuento}>
        <div className="col-md-4">
          <label className="form-label">% Descuento*</label>
          <input
            type="number"
            className="form-control form-control-sm"
            value={porcentaje}
            onChange={e => setPorcentaje(e.target.value)}
            min={1}
            max={100}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-success btn-sm" type="submit">
            Aplicar Descuento
          </button>
          <button className="btn btn-secondary btn-sm ms-2" type="button" onClick={onFinish}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarDescuento;