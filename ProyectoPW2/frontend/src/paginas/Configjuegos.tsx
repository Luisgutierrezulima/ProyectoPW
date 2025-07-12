import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaPercent } from 'react-icons/fa';
import Navbar from '../componentes/Navbar';
import Agregarjuego from '../componentes/Agregarjuego';
import EditarJuego from '../componentes/Editarjuego';
import EliminarJuego from '../componentes/Eliminarjuego';
import AgregarDescuento from '../componentes/Agregardescuento';
import { BACKEND_URL } from '../types/api';

type Juego = {
  id: number;
  titulo: string;
  precio: number;
  oferta: boolean;
  imagen: string;
};

const Configjuegos = () => {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [loading, setLoading] = useState(true);
  const [accion, setAccion] = useState<{ tipo: string; id?: number }>({ tipo: '' });

  // Cargar juegos del backend
  const cargarJuegos = async () => {
    setLoading(true);
    const res = await fetch(`${BACKEND_URL}/api/juegos`);
    const data = await res.json();
    setJuegos(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  // Handlers para acciones
  const handleAgregar = () => setAccion({ tipo: 'agregar' });
  const handleEditar = (id: number) => setAccion({ tipo: 'editar', id });
  const handleEliminar = (id: number) => setAccion({ tipo: 'eliminar', id });
  const handleDescuento = (id: number) => setAccion({ tipo: 'descuento', id });

  // Renderiza el formulario correspondiente según la acción
  const renderFormulario = () => {
    if (accion.tipo === 'agregar')
      return <Agregarjuego onFinish={() => { setAccion({ tipo: '' }); cargarJuegos(); }} />;
    if (accion.tipo === 'editar' && accion.id)
      return <EditarJuego id={accion.id} onFinish={() => { setAccion({ tipo: '' }); cargarJuegos(); }} />;
    if (accion.tipo === 'eliminar' && accion.id)
      return <EliminarJuego id={accion.id} onFinish={() => { setAccion({ tipo: '' }); cargarJuegos(); }} />;
    if (accion.tipo === 'descuento' && accion.id)
      return <AgregarDescuento id={accion.id} onFinish={() => { setAccion({ tipo: '' }); cargarJuegos(); }} />;
    return null;
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Administración de Juegos</h2>
        <button className="btn btn-success mb-3" onClick={handleAgregar}>
          <FaPlus /> Agregar juego
        </button>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Título</th>
                <th>Precio</th>
                <th>Oferta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {juegos.map(juego => (
                <tr key={juego.id}>
                  <td>
                    <img src={juego.imagen} alt={juego.titulo} style={{ width: 60, height: 60, objectFit: 'contain' }} />
                  </td>
                  <td>{juego.titulo}</td>
                  <td>${juego.precio}</td>
                  <td>{juego.oferta ? 'Sí' : 'No'}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditar(juego.id)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-danger btn-sm me-2" onClick={() => handleEliminar(juego.id)}>
                      <FaTrash />
                    </button>
                    <button className="btn btn-warning btn-sm" onClick={() => handleDescuento(juego.id)}>
                      <FaPercent />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="mt-4">{renderFormulario()}</div>
      </div>
    </>
  );
};

export default Configjuegos;