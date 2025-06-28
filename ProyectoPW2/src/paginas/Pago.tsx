import React, { useState } from 'react';
import Navbar from '../componentes/Navbar';
import { useCarrito } from '../context/CarritoContext';

export default function Pago() {
  const { carrito } = useCarrito();
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');
  const [claves, setClaves] = useState<string[]>([]);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError('Por favor ingresa un correo válido.');
      return;
    }
    setError('');

    const userId = localStorage.getItem('userId');

    // Llama al backend para procesar el pago y enviar las claves
    const res = await fetch('http://localhost:3001/api/pago', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, carrito, email }),
    });

    if (res.ok) {
      const data = await res.json();
      setClaves(data.claves || []);
      setEnviado(true);
      // Aquí podrías limpiar el carrito si lo deseas
    } else {
      setError('Error al procesar el pago. Intenta nuevamente.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 text-white">
        <h2 className="mb-4 texto-acento">Pago</h2>
        <div className="bg-dark-2 p-4 rounded">
          {carrito.length === 0 ? (
            <p>No hay artículos en el carrito.</p>
          ) : enviado ? (
            <div className="alert alert-success">
              ¡Pago realizado con éxito! Las claves serán enviadas a <b>{email}</b>.
              {claves.length > 0 && (
                <ul className="mt-3">
                  {claves.map((clave, idx) => (
                    <li key={idx}>{clave}</li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h5 className="mb-3">Resumen de tu compra</h5>
              <ul className="list-group mb-3">
                {carrito.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item bg-dark-2 d-flex justify-content-between align-items-center text-white"
                  >
                    <span>
                      {item.nombre} <span className="text-secondary">x{item.cantidad}</span>
                    </span>
                    <span>${item.precio * item.cantidad}</span>
                  </li>
                ))}
                <li className="list-group-item bg-dark-2 d-flex justify-content-between align-items-center text-white fw-bold">
                  Total
                  <span>${total}</span>
                </li>
              </ul>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo electrónico para recibir las claves:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <div className="text-danger mt-2">{error}</div>}
              </div>
              <button type="submit" className="btn btn-acento w-100">
                Pagar y recibir claves
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}