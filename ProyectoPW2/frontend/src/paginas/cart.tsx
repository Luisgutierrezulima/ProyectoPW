import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../paginas/style.css';


import Navbar from '../componentes/Navbar';
import { useCarrito } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { carrito, aumentarCantidad, disminuirCantidad, eliminarJuego } = useCarrito();
  const navigate = useNavigate();

  const totalPagar = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <>
      <Navbar />

      <div className="container mt-4 text-white">
        <h3 className="texto-acento mb-4">Tu Carrito</h3>

        {carrito.length === 0 ? (
          <p>No hay juegos en el carrito.</p>
        ) : (
          <div className="row g-4">
            {/* Lista de juegos */}
            <div className="col-md-8">
              {carrito.map((juego) => (
                <div
                  key={juego.id}
                  className="card bg-dark-2 mb-3 d-flex flex-row align-items-center"
                >
                  <img
                    src={juego.imagen}
                    alt={juego.nombre}
                    style={{ width: 120, height: 120, objectFit: 'contain' }}
                    className="m-3"
                  />
                  <div className="card-body flex-grow-1">
                    <h5 className="card-title text-light">{juego.nombre}</h5>
                    <p className="text-light">Precio unitario: ${juego.precio}</p>

                    {/* Controles cantidad */}
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-acento btn-sm"
                        onClick={() => disminuirCantidad(juego.id)}
                      >
                        -
                      </button>
                      <span className="text-light">{juego.cantidad}</span>
                      <button
                        className="btn btn-acento btn-sm"
                        onClick={() => aumentarCantidad(juego.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Precio total */}
                  <div className="m-3 text-light fw-bold" style={{ minWidth: 100 }}>
                    ${juego.precio * juego.cantidad}
                  </div>

                  {/* Botón eliminar */}
                  <button
                    className="btn btn-outline-danger me-3"
                    onClick={() => eliminarJuego(juego.id)}
                    aria-label={`Eliminar ${juego.nombre} del carrito`}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              ))}
            </div>

            {/* Resumen de compra */}
            <div className="col-md-4 bg-dark-2 p-4 rounded">
              <h5 className="texto-acento">Resumen</h5>
              <hr className="border-light" />
              <p className="text-light">Total a pagar:</p>
              <h4 className="text-light">${totalPagar}</h4>
              <button className="btn btn-acento w-100 mt-3" onClick={() => navigate('/pago')}> Finalizar Compra </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}