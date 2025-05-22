import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PaginaPrincipal from './paginas/pagina_principal.tsx';
import Explore from './paginas/explore.tsx';
import GameDetail from './paginas/gameDetail.tsx';
import Cart from './paginas/cart.tsx';
import Login from './paginas/login';
import Registro from './paginas/Registro';
import EnviarCodigo from './paginas/EnviarCodigo';
import NuevaContra from './paginas/NuevaContra';
import Catalogo from './paginas/pagina_principal';
import MejorValorados from "./paginas/mejorValorados";
import DetalleJuego from "./paginas/detalleJuego";
import { CarritoProvider } from './context/CarritoContext.tsx';
import AdminNoticias from './paginas/AdminNoticias';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/forgot" element={<EnviarCodigo />} />
          <Route path="/resetPassword" element={<NuevaContra />} />
          <Route path="/catalog" element={<Catalogo />} />  
          <Route path="/mejor-valorados" element={<MejorValorados />} />
          <Route path="/detalle/:id" element={<DetalleJuego />} />
          <Route path="/admin/noticias" element={<AdminNoticias />} />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  </StrictMode>
);