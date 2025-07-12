import React, { createContext, useContext, useEffect, useState } from "react";

export type CarritoItem = {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
};

type CarritoContextType = {
  carrito: CarritoItem[];
  cargarCarrito: () => Promise<void>;
  agregarJuego: (item: CarritoItem) => Promise<void>;
  aumentarCantidad: (id: number) => Promise<void>;
  disminuirCantidad: (id: number) => Promise<void>;
  eliminarJuego: (id: number) => Promise<void>;
  limpiarCarrito: () => Promise<void>;
};

const CarritoContext = createContext<CarritoContextType>({
  carrito: [],
  cargarCarrito: async () => {},
  agregarJuego: async () => {},
  aumentarCantidad: async () => {},
  disminuirCantidad: async () => {},
  eliminarJuego: async () => {},
  limpiarCarrito: async () => {},
});

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const userId = localStorage.getItem('userId');

  // Cargar carrito desde el backend
  const cargarCarrito = async () => {
    if (!userId) return;
    const res = await fetch(`http://localhost:3001/api/carrito/${userId}`);
    if (res.ok) {
      setCarrito(await res.json());
    }
  };

  useEffect(() => {
    cargarCarrito();
    // eslint-disable-next-line
  }, [userId]);

  // Agregar juego al carrito
  const agregarJuego = async (item: CarritoItem) => {
    if (!userId) return;
    await fetch(`http://localhost:3001/api/carrito/${userId}/agregar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    await cargarCarrito();
  };

  // Aumentar cantidad
  const aumentarCantidad = async (id: number) => {
    if (!userId) return;
    await fetch(`http://localhost:3001/api/carrito/${userId}/aumentar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await cargarCarrito();
  };

  // Disminuir cantidad
  const disminuirCantidad = async (id: number) => {
    if (!userId) return;
    await fetch(`http://localhost:3001/api/carrito/${userId}/disminuir`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await cargarCarrito();
  };

  // Eliminar juego
  const eliminarJuego = async (id: number) => {
    if (!userId) return;
    await fetch(`http://localhost:3001/api/carrito/${userId}/eliminar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await cargarCarrito();
  };

  // Limpiar carrito
  const limpiarCarrito = async () => {
    if (!userId) return;
    await fetch(`http://localhost:3001/api/carrito/${userId}/limpiar`, {
      method: 'POST',
    });
    await cargarCarrito();
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        cargarCarrito,
        agregarJuego,
        aumentarCantidad,
        disminuirCantidad,
        eliminarJuego,
        limpiarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};