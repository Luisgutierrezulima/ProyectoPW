import React, { createContext, useContext, useEffect, useState } from "react";
import { BACKEND_URL } from '../types/api';

export type Reseña = {
  id: number;
  texto: string;
  estrellas: number;
  usuario: string;
};

export type JuegoDetalle = {
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
};

type GameContextType = {
  juegos: JuegoDetalle[];
  cargarJuegos: () => Promise<void>;
};

const GameContext = createContext<GameContextType>({
  juegos: [],
  cargarJuegos: async () => {},
});

export const useJuegos = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [juegos, setJuegos] = useState<JuegoDetalle[]>([]);

  // Cargar juegos desde el backend
  const cargarJuegos = async () => {
    const res = await fetch(`${BACKEND_URL}/api/juegos`);
    const data = await res.json();
    setJuegos(data);
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  return (
    <GameContext.Provider value={{ juegos, cargarJuegos }}>
      {children}
    </GameContext.Provider>
  );
};