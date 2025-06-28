import React, { useState } from 'react';

const Agregarjuego = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estrellas, setEstrellas] = useState(0);
  const [imagen, setImagen] = useState('');
  const [trailer, setTrailer] = useState('');
  const [precio, setPrecio] = useState('');
  const [oferta, setOferta] = useState(false);
  const [plataforma, setPlataforma] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (!titulo || !descripcion || !imagen || !trailer || !precio || !plataforma || !categoria) {
      setError('Completa todos los campos obligatorios.');
      return;
    }

    const res = await fetch('http://localhost:3001/api/juegos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo,
        descripcion,
        estrellas,
        imagen,
        trailer,
        precio: parseFloat(precio),
        oferta,
        plataforma,
        categoria,
      }),
    });

    if (res.ok) {
      setMensaje('¡Juego agregado exitosamente!');
      setTitulo('');
      setDescripcion('');
      setEstrellas(0);
      setImagen('');
      setTrailer('');
      setPrecio('');
      setOferta(false);
      setPlataforma('');
      setCategoria('');
    } else {
      const data = await res.json();
      setError(data.error || 'Error al agregar el juego.');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Agregar Juego</h3>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Título*</label>
          <input type="text" className="form-control form-control-sm" value={titulo} onChange={e => setTitulo(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Estrellas</label>
          <input type="number" className="form-control form-control-sm" value={estrellas} onChange={e => setEstrellas(Number(e.target.value))} min={0} max={5} />
        </div>
        <div className="col-md-6">
          <label className="form-label">URL Imagen*</label>
          <input type="text" className="form-control form-control-sm" value={imagen} onChange={e => setImagen(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Trailer*</label>
          <input type="text" className="form-control form-control-sm" value={trailer} onChange={e => setTrailer(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Precio ($)*</label>
          <input type="number" className="form-control form-control-sm" value={precio} onChange={e => setPrecio(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Oferta</label>
          <input type="checkbox" className="form-check-input ms-2" checked={oferta} onChange={e => setOferta(e.target.checked)} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Plataforma*</label>
          <input type="text" className="form-control form-control-sm" value={plataforma} onChange={e => setPlataforma(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Categoría*</label>
          <input type="text" className="form-control form-control-sm" value={categoria} onChange={e => setCategoria(e.target.value)} />
        </div>
        <div className="col-md-12">
          <label className="form-label">Descripción*</label>
          <textarea className="form-control form-control-sm" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        </div>
        <div className="col-auto">
          <button className="btn btn-success btn-sm" type="submit">Añadir</button>
        </div>
      </form>
    </div>
  );
};

export default Agregarjuego;