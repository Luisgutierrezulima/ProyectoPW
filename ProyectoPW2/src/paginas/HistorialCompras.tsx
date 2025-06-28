import React, { useEffect, useState } from 'react';
import Navbar from '../componentes/Navbar';

type DetalleCompra = {
  id: number;
  juego: {
    titulo: string;
    imagen: string;
    precio: number;
  };
  cantidad: number;
  clave: string;
};

type Compra = {
  id: number;
  fecha: string;
  detalles: DetalleCompra[];
};

export default function HistorialCompras() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:3001/api/compras/${userId}`)
      .then(res => res.json())
      .then(data => {
        setCompras(data);
        setLoading(false);
      });
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="container mt-5 text-white">
        <h2>Historial de Compras</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : compras.length === 0 ? (
          <p>No tienes compras registradas.</p>
        ) : (
          compras.map((compra) => (
            <div key={compra.id} className="mb-4 border-bottom pb-3">
              <h5>Compra #{compra.id} - {new Date(compra.fecha).toLocaleDateString()}</h5>
              <ul className="list-group">
                {compra.detalles.map((detalle) => (
                  <li key={detalle.id} className="list-group-item bg-dark text-white d-flex align-items-center">
                    <img src={detalle.juego.imagen} alt={detalle.juego.titulo} style={{ width: 60, height: 60, objectFit: 'contain', marginRight: 16 }} />
                    <div className="flex-grow-1">
                      <strong>{detalle.juego.titulo}</strong> <br />
                      Cantidad: {detalle.cantidad} <br />
                      Clave: <span className="text-success">{detalle.clave}</span>
                    </div>
                    <div>
                      <span className="fw-bold">${detalle.juego.precio}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </>
  );
}