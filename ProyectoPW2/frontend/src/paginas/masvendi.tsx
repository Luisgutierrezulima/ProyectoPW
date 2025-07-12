import React from "react";
import '../paginas/style.css';
import { useNavigate } from "react-router-dom";
import { useJuegos } from "../context/GameContext";
import CardJuego from "../componentes/CardJuego";
import Navbar from "../componentes/Navbar";

export default function MasVendi() {
  const { juegos } = useJuegos();
  const navigate = useNavigate();

  // Definir criterio de "más vendidos"
  // Por ejemplo, los juegos con más estrellas o los primeros N juegos
  const masVendidos = juegos
    .filter(j => j.estrellas >= 4.5) // Ajusta el criterio según tu modelo
    .slice(0, 8); // Muestra los 8 más vendidos

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="text-2xl font-bold mb-4 text-white">🔥 Más Vendidos</h1>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {masVendidos.map((juego) => (
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
    </>
  );
}