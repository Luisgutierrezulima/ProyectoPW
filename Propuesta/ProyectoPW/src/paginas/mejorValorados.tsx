import React from "react";
import { useNavigate } from "react-router-dom";

type Juego = {
  id: string;
  titulo: string;
  descripcion: string;
  estrellas: number;
  imagen: string;
};

const juegos: Juego[] = [
  {
    id: "elden-ring",
    titulo: "Elden Ring",
    descripcion: "Un RPG de acción en mundo abierto de FromSoftware.",
    estrellas: 5,
    imagen: "/GTAV_Banner.jpg",
  },
  {
    id: "god-of-war",
    titulo: "God of War (2018)",
    descripcion: "Kratos y Atreus en una aventura mitológica nórdica.",
    estrellas: 4,
    imagen: "/GodofWar_Logo.jpg",
  },
];

const MejorValorados: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🎮 Juegos Mejor Valorados</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {juegos.map((juego) => (
          <div
            key={juego.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
            onClick={() => navigate(`/detalle/${juego.id}`)}
          >
            <img src={juego.imagen} alt={juego.titulo} className="rounded mb-2" />
            <h2 className="text-xl font-semibold">{juego.titulo}</h2>
            <p className="text-gray-600">{juego.descripcion}</p>
            <p className="text-yellow-500">{"★".repeat(juego.estrellas)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MejorValorados;
