import React, { useState } from 'react';

type ModalPagoProps = {
  mostrar: boolean;
  onCerrar: () => void;
  onProcesar: () => void;
};

const ModalPago: React.FC<ModalPagoProps> = ({ mostrar, onCerrar, onProcesar }) => {
  const [numero, setNumero] = useState('');
  const [fecha, setFecha] = useState('');
  const [cvv, setCvv] = useState('');
  const [procesando, setProcesando] = useState(false);

  if (!mostrar) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcesando(true);
    setTimeout(() => {
      setProcesando(false);
      onProcesar();
    }, 1200); // Simula procesamiento
  };

  return (
    <div className="modal d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title">Pago con tarjeta</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onCerrar}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Número de tarjeta</label>
                <input
                  type="text"
                  className="form-control"
                  value={numero}
                  onChange={e => setNumero(e.target.value)}
                  required
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha de expiración</label>
                <input
                  type="text"
                  className="form-control"
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
                  required
                  placeholder="MM/AA"
                  maxLength={5}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">CVV</label>
                <input
                  type="password"
                  className="form-control"
                  value={cvv}
                  onChange={e => setCvv(e.target.value)}
                  required
                  maxLength={4}
                  placeholder="123"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCerrar} disabled={procesando}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-success" disabled={procesando}>
                {procesando ? 'Procesando...' : 'Pagar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalPago;