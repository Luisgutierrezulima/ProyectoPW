import React, { useState } from 'react';

const AgregarDescuento = () => {
  const [id, setId] = useState('');
  const [porcentaje, setPorcentaje] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleDescuento = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    if (!id || !porcentaje) {
      setError('Completa todos los campos.');
      return;
    }
    const resJuego = await fetch(`http://localhost:3001/api/juegos/${id}`);
    if (!resJuego.ok) {
      setError('No se encontró el juego con ese ID.');
      return;
    }
    const juego = await resJuego.json();
    const nuevoPrecio = juego.precio - (juego.precio * (parseFloat(porcentaje) / 100));
    const res = await fetch(`http://localhost:3001/api/juegos/${id}`, {
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
      setId('');
      setPorcentaje('');
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
          <label className="form-label">ID del juego*</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={id}
            onChange={e => setId(e.target.value)}
          />
        </div>
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
        </div>
      </form>
    </div>
  );
};

export default AgregarDescuento;