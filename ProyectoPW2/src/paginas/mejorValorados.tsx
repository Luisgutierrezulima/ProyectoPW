import React from "react";
import '../paginas/style.css';
import { useNavigate } from "react-router-dom";
import { useJuegos } from "../context/GameContext";
import CardJuego from "../componentes/CardJuego";
import Navbar from "../componentes/Navbar";

export default function MejorValorados() {
  const { juegos } = useJuegos();
  const navigate = useNavigate();

  // Filtrar los juegos con 5 estrellas
  const mejorValorados = juegos.filter(j => j.estrellas >= 4);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="text-2xl font-bold mb-4 text-white">🎮 Juegos Mejor Valorados</h1>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {mejorValorados.map((juego) => (
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