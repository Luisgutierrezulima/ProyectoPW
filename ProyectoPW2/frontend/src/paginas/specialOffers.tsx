
import Navbar from '../componentes/Navbar';
import CardJuego from '../componentes/CardJuego';
import { useNavigate } from 'react-router-dom';
import { useJuegos } from '../context/GameContext';
import '../paginas/style.css';

export default function SpecialOffers() {
  const { juegos } = useJuegos();
  const navigate = useNavigate();

  // Filtrar solo juegos en oferta
  const ofertas = juegos.filter(j => j.oferta);

  return (
    <>
      <Navbar />
      <div className="container mt-4 text-white">
        <h3 className="texto-acento mb-3">Ofertas Especiales</h3>
        {ofertas.length === 0 ? (
          <p>No hay juegos en oferta actualmente.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {ofertas.map(juego => (
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
        )}
      </div>
    </>
  );
}