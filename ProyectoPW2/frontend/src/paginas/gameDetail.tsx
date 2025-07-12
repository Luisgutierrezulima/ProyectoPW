import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../componentes/Navbar';
import { useCarrito } from '../context/CarritoContext';
import { BACKEND_URL } from '../types/api';

interface Reseña {
  id: number;
  texto: string;
  estrellas: number;
  usuario: string;
}

interface JuegoDetalle {
  id: number;
  titulo: string;
  descripcion: string;
  estrellas: number;
  imagen: string;
  trailer: string;
  precio: number;
  oferta?: boolean;
  plataforma: string;
  categoria: string;
  resenas?: Reseña[];
}

export default function GameDetail() {
  const { id } = useParams();
  const [juego, setJuego] = useState<JuegoDetalle | null>(null);
  const [resenas, setResenas] = useState<Reseña[]>([]);
  const [puedeResenar, setPuedeResenar] = useState(false);
  const [texto, setTexto] = useState('');
  const [estrellas, setEstrellas] = useState(5);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userId = localStorage.getItem('userId');
  const { agregarJuego } = useCarrito();

  // Cargar detalles del juego
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/juegos/${id}`)
      .then(res => res.json())
      .then(data => {
        setJuego(data);
        setResenas(data.resenas || []);
      });
  }, [id]);

  // Consultar si el usuario puede dejar reseña
  useEffect(() => {
    if (!userId || !id) return;
    fetch(`${BACKEND_URL}/api/juegos/${id}/puede-resenar?userId=${userId}`)
      .then(res => res.json())
      .then(data => setPuedeResenar(data.puedeResenar));
  }, [id, userId]);

  const handleAgregarResena = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!texto.trim()) {
      setError('La reseña no puede estar vacía.');
      return;
    }
    const res = await fetch(`${BACKEND_URL}/api/juegos/${id}/resena`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, texto, estrellas }),
    });
    if (res.ok) {
      setTexto('');
      setEstrellas(5);
      setSuccess('¡Reseña agregada!');
      // Recargar reseñas
      const nuevas = await fetch(`${BACKEND_URL}/api/juegos/${id}/resenas`).then(r => r.json());
      setResenas(nuevas);
    } else {
      setError('No puedes dejar una reseña para este juego.');
    }
  };

  const handleComprar = () => {
    if (!juego) return;
    agregarJuego({
      id: juego.id,
      nombre: juego.titulo,
      imagen: juego.imagen,
      precio: juego.precio,
      cantidad: 1,
    });
  };

  if (!juego) return <div className="text-white">Cargando...</div>;

  return (
    <>
      <Navbar />
      <div className="container mt-4 text-white">
        <h1 className="text-3xl font-bold mb-2">{juego.titulo}</h1>
        <p className="mb-4 text-gray-300">{juego.descripcion}</p>
        <p className="text-warning text-lg mb-4">{"★".repeat(juego.estrellas)}</p>

        <h2 className="text-xl font-semibold mb-2">Imágenes</h2>
        <div className="d-flex flex-wrap gap-4 justify-content-center mb-4">
          <img src={juego.imagen} alt={juego.titulo} className="w-48 rounded shadow" />
        </div>

        <h2 className="text-xl font-semibold mb-2">Tráiler</h2>
        <div className="d-flex justify-content-center">
          <div className="ratio ratio-16x9 mb-4" style={{ maxWidth: 700 }}>
            <iframe
              src={juego.trailer}
              title="Tráiler"
              allowFullScreen
              style={{ width: "100%", height: "100%" }}
            ></iframe>
          </div>
        </div>

        {/* Botón de comprar */}
        <div className="d-flex justify-content-center mb-4">
          <button
            className="btn btn-acento btn-lg"
            onClick={handleComprar}
          >
            Comprar
          </button>
        </div>

        {/* Área de reseñas */}
        <h2 className="text-xl font-semibold mb-2">Reseñas</h2>
        <ul className="list-group mb-4">
          {resenas.length === 0 && <li className="list-group-item bg-dark-2 text-light">Sin reseñas aún.</li>}
          {resenas.map((r) => (
            <li key={r.id} className="list-group-item bg-dark-2 text-light">
              <span className="text-warning">{"★".repeat(r.estrellas)}</span> {r.texto}
              <span className="ms-2 text-secondary">{r.usuario}</span>
            </li>
          ))}
        </ul>

        {/* Formulario de reseña */}
        <div className="mb-4">
          <form onSubmit={handleAgregarResena}>
            <div className="mb-2">
              <label className="form-label">Tu reseña:</label>
              <textarea
                className="form-control"
                value={texto}
                onChange={e => setTexto(e.target.value)}
                disabled={!puedeResenar}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Estrellas:</label>
              <select
                className="form-select"
                value={estrellas}
                onChange={e => setEstrellas(Number(e.target.value))}
                disabled={!puedeResenar}
              >
                {[5, 4, 3, 2, 1].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-acento" disabled={!puedeResenar}>
              Agregar reseña
            </button>
            {!puedeResenar && (
              <div className="text-danger mt-2">
                Solo puedes dejar una reseña si compraste este juego.
              </div>
            )}
            {error && <div className="text-danger mt-2">{error}</div>}
            {success && <div className="text-success mt-2">{success}</div>}
          </form>
        </div>
      </div>
    </>
  );
}