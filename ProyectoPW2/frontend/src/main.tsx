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
import Configuracion from './paginas/configuracion';
import MejorValorados from "./paginas/mejorValorados";
import DetalleJuego from "./paginas/gameDetail.tsx";
import AdminNoticias from './paginas/AdminNoticias';
import Categories from './paginas/categories';
import Plataformas from './paginas/plataformas';
import AdminPage from './paginas/adminpag';
import SpecialOffers from './paginas/specialOffers';
import { CarritoProvider } from './context/CarritoContext.tsx';
import { GameProvider } from "./context/GameContext";
import Pago from './paginas/Pago';
import AdminCatalogo from './paginas/AdmCatalogo.tsx';
import Masvendi from './paginas/masvendi.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Configjuegos from './paginas/Configjuegos.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider>
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tienda" element={<PaginaPrincipal />} />
          <Route path="/admin/configjuegos" element={<Configjuegos />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/forgot" element={<EnviarCodigo />} />
          <Route path="/resetPassword" element={<NuevaContra />} />
          <Route path="/catalog" element={<Explore />} />  
          <Route path="/mejor-valorados" element={<MejorValorados />} />
          <Route path="/detalle/:id" element={<DetalleJuego />} />
          <Route path="/admin/noticias" element={<AdminNoticias />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/plataformas" element={<Plataformas />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="/adminpag" element={<AdminPage />} />
          <Route path="/admin/catalogo" element={<AdminCatalogo />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/offers" element={<SpecialOffers />} />
          <Route path="/masvendi" element={<Masvendi />} />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
    </GameProvider>
  </StrictMode>
);
