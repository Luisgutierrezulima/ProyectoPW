import React, { createContext, useContext, useState, useEffect } from 'react';

export interface JuegoCarrito {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
}

interface CarritoContextType {
  carrito: JuegoCarrito[];
  agregarJuego: (juego: Omit<JuegoCarrito, 'cantidad'>) => Promise<void>;
  eliminarJuego: (id: number) => Promise<void>;
  aumentarCantidad: (id: number) => Promise<void>;
  disminuirCantidad: (id: number) => Promise<void>;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }: { children: React.ReactNode }) => {
  const [carrito, setCarrito] = useState<JuegoCarrito[]>([]);
  // Reemplazar esto por lógica real de autenticación
  const userId = localStorage.getItem('userId') || 'demoUser';

  // Cargar carrito al iniciar
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:3001/api/carrito?userId=${userId}`)
      .then(res => res.json())
      .then(setCarrito);
  }, [userId]);

  // Función para refrescar el carrito después de cada operación
  const actualizarCarrito = async () => {
    const res = await fetch(`http://localhost:3001/api/carrito?userId=${userId}`);
    setCarrito(await res.json());
  };

  const agregarJuego = async (juego: Omit<JuegoCarrito, 'cantidad'>) => {
    await fetch('http://localhost:3001/api/carrito/agregar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, juego }),
    });
    await actualizarCarrito();
  };

  const eliminarJuego = async (id: number) => {
    await fetch('http://localhost:3001/api/carrito/eliminar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, juegoId: id }),
    });
    await actualizarCarrito();
  };

  const aumentarCantidad = async (id: number) => {
    await fetch('http://localhost:3001/api/carrito/aumentar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, juegoId: id }),
    });
    await actualizarCarrito();
  };

  const disminuirCantidad = async (id: number) => {
    await fetch('http://localhost:3001/api/carrito/disminuir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, juegoId: id }),
    });
    await actualizarCarrito();
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarJuego, eliminarJuego, aumentarCantidad, disminuirCantidad }}
    >
      {children}
    </CarritoContext.Provider>
  );
};