import React from "react";
import { useParams } from "react-router-dom";

type JuegoDetalle = {
  id: string;
  titulo: string;
  descripcion: string;
  estrellas: number;
  imagenes: string[];
  trailer: string;
  resenas: string[];
};

const juegos: Record<string, JuegoDetalle> = {
  "elden-ring": {
    id: "elden-ring",
    titulo: "Elden Ring",
    descripcion: "Un RPG de acción en mundo abierto creado por FromSoftware y George R. R. Martin.",
    estrellas: 5,
    imagenes: [
      "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_9f3810a9025f2fcfc57be38bb9cd64e9e13d7e7d.1920x1080.jpg",
      "https://images.cgames.de/images/gamestar/279/elden-ring-test_6196079.jpg",
    ],
    trailer: "https://www.youtube.com/embed/E3Huy2cdih0",
    resenas: [
      "Una obra maestra desafiante y hermosa.",
      "Exploración asombrosa, combate intenso.",
      "Uno de los mejores juegos de su generación.",
    ],
  },
  "god-of-war": {
    id: "god-of-war",
    titulo: "God of War (2018)",
    descripcion: "Kratos viaja con su hijo Atreus en una aventura mitológica nórdica llena de acción y emoción.",
    estrellas: 4,
    imagenes: [
      "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
      "https://i.ytimg.com/vi/K0u_kAWLJOA/maxresdefault.jpg",
    ],
    trailer: "https://www.youtube.com/embed/K0u_kAWLJOA",
    resenas: [
      "Historia poderosa y emotiva.",
      "Excelente combate y presentación visual.",
      "Kratos como nunca lo habías visto.",
    ],
  },
};

const DetalleJuego: React.FC = () => {
  const { id } = useParams();
  const juego = juegos[id || ""];

  if (!juego) {
    return <p className="p-4 text-red-500">Juego no encontrado.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{juego.titulo}</h1>
      <p className="mb-4 text-gray-700">{juego.descripcion}</p>
      <p className="text-yellow-500 text-lg mb-4">{"★".repeat(juego.estrellas)}</p>

      <h2 className="text-xl font-semibold mb-2">Imágenes</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        {juego.imagenes.map((img, idx) => (
          <img key={idx} src={img} alt="screenshot" className="w-48 rounded shadow" />
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Tráiler</h2>
      <iframe
        className="w-full max-w-2xl h-64 mb-4"
        src={juego.trailer}
        title="Tráiler"
        allowFullScreen
      ></iframe>

      <h2 className="text-xl font-semibold mb-2">Reseñas</h2>
      <ul className="list-disc list-inside text-gray-800">
        {juego.resenas.map((resena, idx) => (
          <li key={idx}>{resena}</li>
        ))}
      </ul>
    </div>
  );
};

export default DetalleJuego;
