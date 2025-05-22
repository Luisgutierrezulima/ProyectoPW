import React, { useState } from 'react';
import type { Noticia } from '../types/Noticia';


export default function AdminNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [modoEdicion, setModoEdicion] = useState<null | number>(null);

  const agregarNoticia = () => {
    const nueva: Noticia = {
      id: Date.now(),
      titulo,
      contenido,
      fecha: new Date().toISOString().split('T')[0],
    };
    setNoticias([...noticias, nueva]);
    setTitulo('');
    setContenido('');
  };

  const eliminarNoticia = (id: number) => {
    setNoticias(noticias.filter((n) => n.id !== id));
  };

  const guardarEdicion = () => {
    setNoticias(noticias.map((n) =>
      n.id === modoEdicion ? { ...n, titulo, contenido } : n
    ));
    setModoEdicion(null);
    setTitulo('');
    setContenido('');
  };

  const comenzarEdicion = (noticia: Noticia) => {
    setModoEdicion(noticia.id);
    setTitulo(noticia.titulo);
    setContenido(noticia.contenido);
  };

  return (
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
  );
}
