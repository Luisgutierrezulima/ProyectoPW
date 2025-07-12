

interface CardJuegoProps {
  nombre: string;
  imagen: string;
  precio?: number;
  onDetalles?: () => void;
}

export default function CardJuego({ nombre, imagen, precio, onDetalles }: CardJuegoProps) {
  return (
    <div className="card bg-dark-2 h-100 text-center">
      <img src={imagen} className="card-img-top" alt={nombre} />
      <div className="card-body">
        <h5 className="card-title text-light">{nombre}</h5>
        {precio !== undefined && <p className="text-light">Precio: ${precio}</p>}
        <button className="btn btn-acento btn-sm w-100" onClick={onDetalles}>
          Detalles
        </button>
      </div>
    </div>
  );
}
