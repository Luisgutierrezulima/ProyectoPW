import React, { useEffect, useState } from 'react';
import Navbar from '../componentes/Navbar';

interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
}

export default function AdminNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [modoEdicion, setModoEdicion] = useState<null | number>(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Cargar noticias del backend
  const cargarNoticias = async () => {
    const res = await fetch('http://localhost:3001/api/noticias');
    setNoticias(await res.json());
  };

  useEffect(() => {
    cargarNoticias();
  }, []);

  const agregarNoticia = async () => {
    setMensaje('');
    setError('');
    if (!titulo || !contenido) {
      setError('Completa todos los campos.');
      return;
    }
    const res = await fetch('http://localhost:3001/api/noticias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, contenido }),
    });
    if (res.ok) {
      setTitulo('');
      setContenido('');
      setMensaje('Noticia agregada.');
      cargarNoticias();
    } else {
      setError('Error al agregar noticia.');
    }
  };

  const eliminarNoticia = async (id: number) => {
    setMensaje('');
    setError('');
    const res = await fetch(`http://localhost:3001/api/noticias/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMensaje('Noticia eliminada.');
      cargarNoticias();
    } else {
      setError('Error al eliminar noticia.');
    }
  };

  const comenzarEdicion = (noticia: Noticia) => {
    setModoEdicion(noticia.id);
    setTitulo(noticia.titulo);
    setContenido(noticia.contenido);
  };

  const guardarEdicion = async () => {
    setMensaje('');
    setError('');
    if (!titulo || !contenido || !modoEdicion) {
      setError('Completa todos los campos.');
      return;
    }
    const res = await fetch(`http://localhost:3001/api/noticias/${modoEdicion}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, contenido }),
    });
    if (res.ok) {
      setModoEdicion(null);
      setTitulo('');
      setContenido('');
      setMensaje('Noticia editada.');
      cargarNoticias();
    } else {
      setError('Error al editar noticia.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 text-white">
        <h2>Administrar Noticias</h2>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Título"
            className="form-control mb-2"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <textarea
            placeholder="Contenido"
            className="form-control mb-2"
            rows={4}
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
          />
          {modoEdicion ? (
            <button className="btn btn-warning" onClick={guardarEdicion}>
              Guardar Cambios
            </button>
          ) : (
            <button className="btn btn-success" onClick={agregarNoticia}>
              Agregar Noticia
            </button>
          )}
        </div>

        {mensaje && <div className="alert alert-success">{mensaje}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <hr />

        <ul className="list-group">
          {noticias.map((n) => (
            <li key={n.id} className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center">
              <div>
                <h5>{n.titulo}</h5>
                <p>{n.contenido}</p>
                <small>{n.fecha}</small>
              </div>
              <div>
                <button className="btn btn-sm btn-primary me-2" onClick={() => comenzarEdicion(n)}>
                  Editar
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => eliminarNoticia(n.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}