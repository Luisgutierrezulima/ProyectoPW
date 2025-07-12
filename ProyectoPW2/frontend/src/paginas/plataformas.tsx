import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componentes/Navbar';

const Platforms: React.FC = () => {
  const navigate = useNavigate();

  const platforms = [
    { name: 'PlayStation 4', path: '/plataforma/ps4' },
    { name: 'PlayStation 5', path: '/plataforma/ps5' },
    { name: 'Xbox', path: '/plataforma/xbox' },
    { name: 'Windows', path: '/plataforma/windows' },
    { name: 'macOS', path: '/plataforma/macos' }
  ];

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-center mb-4 text-white">Plataformas Disponibles</h2>
        <div className="row">
          {platforms.map((plat, idx) => (
            <div className="col-md-4 mb-4 d-flex justify-content-center" key={idx}>
              <button
                className="btn btn-primary w-100"
                style={{ maxWidth: '250px' }}
                onClick={() => navigate(plat.path)}
              >
                {plat.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Platforms;