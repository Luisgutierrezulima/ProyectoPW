import { useState } from 'react';
import Navbar from '../componentes/Navbar';
import CardJuego from '../componentes/CardJuego';
import { useNavigate } from 'react-router-dom';
import { useJuegos } from '../context/GameContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function AdminCatalogo() {
  const [filtroOferta, setFiltroOferta] = useState(false);
  const [categoria, setCategoria] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const navigate = useNavigate();
  const { juegos } = useJuegos();

  // Filtros locales sobre los juegos traídos del backend
  const juegosFiltrados = juegos.filter(j => {
    if (filtroOferta && !j.oferta) return false;
    if (categoria && j.categoria !== categoria) return false;
    if (plataforma && j.plataforma !== plataforma) return false;
    if (precioMin && j.precio < Number(precioMin)) return false;
    if (precioMax && j.precio > Number(precioMax)) return false;
    return true;
  });

  return (
    <div className="fondo-oscuro">
      <Navbar />

      <div className="container mt-5">
        <h3 className="texto-acento mb-3">Catálogo de Juegos</h3>

        {/* Formulario de filtros */}
        <form className="bg-dark p-4 rounded text-white mb-4" onSubmit={e => e.preventDefault()}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="categoria" className="form-label">Categoría</label>
              <select
                className="form-select"
                id="categoria"
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="Acción">Acción</option>
                <option value="Aventura">Aventura</option>
                <option value="Estrategia">Estrategia</option>
                <option value="RPG">RPG</option>
                <option value="Deportes">Deportes</option>
                <option value="Simulación">Simulación</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Terror">Terror</option>
                <option value="Mundo Abierto">Mundo Abierto</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="plataforma" className="form-label">Plataforma</label>
              <select
                className="form-select"
                id="plataforma"
                value={plataforma}
                onChange={e => setPlataforma(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="PlayStation 4">PlayStation 4</option>
                <option value="PlayStation 5">PlayStation 5</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="Windows">Windows</option>
                <option value="macOS">macOS</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="precioMin" className="form-label">Precio mínimo</label>
              <input
                type="number"
                className="form-control"
                id="precioMin"
                value={precioMin}
                onChange={e => setPrecioMin(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="precioMax" className="form-label">Precio máximo</label>
              <input
                type="number"
                className="form-control"
                id="precioMax"
                value={precioMax}
                onChange={e => setPrecioMax(e.target.value)}
              />
            </div>
          </div>

          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="filtroOferta"
              checked={filtroOferta}
              onChange={() => setFiltroOferta(!filtroOferta)}
            />
            <label className="form-check-label" htmlFor="filtroOferta">
              Solo ofertas
            </label>
          </div>
        </form>

        <div className="row row-cols-1 row-cols-md-5 g-4 mt-3">
          {juegosFiltrados.map((juego) => (
            <div className="col" key={juego.id}>
              <CardJuego
                nombre={juego.titulo}
                imagen={juego.imagen}
                precio={juego.precio}
                onDetalles={() => navigate(`/detalle/${juego.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}