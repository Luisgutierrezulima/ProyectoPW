import React, { createContext, useContext, useState, ReactNode } from 'react';

interface JuegoCarrito {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
}

interface CarritoContextType {
  carrito: JuegoCarrito[];
  agregarJuego: (juego: Omit<JuegoCarrito, 'cantidad'>) => void;
  eliminarJuego: (id: number) => void;
  aumentarCantidad: (id: number) => void;
  disminuirCantidad: (id: number) => void;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<JuegoCarrito[]>([]);

  const agregarJuego = (juego: Omit<JuegoCarrito, 'cantidad'>) => {
    setCarrito((prev) => {
      const existe = prev.find((j) => j.id === juego.id);
      if (existe) {
        return prev.map((j) =>
          j.id === juego.id ? { ...j, cantidad: j.cantidad + 1 } : j
        );
      } else {
        return [...prev, { ...juego, cantidad: 1 }];
      }
    });
  };

  const eliminarJuego = (id: number) => {
    setCarrito((prev) => prev.filter((j) => j.id !== id));
  };

  const aumentarCantidad = (id: number) => {
    setCarrito((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, cantidad: j.cantidad + 1 } : j
      )
    );
  };

  const disminuirCantidad = (id: number) => {
    setCarrito((prev) =>
      prev.map((j) =>
        j.id === id && j.cantidad > 1
          ? { ...j, cantidad: j.cantidad - 1 } : j
      )
    );
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarJuego, eliminarJuego, aumentarCantidad, disminuirCantidad }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
