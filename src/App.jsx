import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Calendario from './pages/Calendario';
import Actividades from './pages/Actividades';

// Sistema
import Personal from './pages/Sistema/Personal';
import Maquinaria from './pages/Sistema/Maquinaria';
import Productos from './pages/Sistema/Productos';
import Fitosanitarios from './pages/Sistema/Fitosanitarios';
import Parcelas from './pages/Sistema/Parcelas';

// Formularios
import AñadirActividades from './pages/AñadirActividades';
import AñadirPersonal from './pages/Sistema/Formularios/AñadirPersonal';
import AñadirMaquinaria from './pages/Sistema/Formularios/AñadirMaquinaria';
import AñadirProductos from './pages/Sistema/Formularios/AñadirProductos';
import AñadirFitosanitarios from './pages/Sistema/Formularios/AñadirFitosanitarios';
import AñadirParcela from './pages/Sistema/Formularios/AñadirParcelas'


function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
    navigate('/actividades');
  };

  return loading ? (
    <p className="text-center text-danger">LA APLICACIÓN NO HA SIDO CARGADA</p>
  ) : (
    <>
      <Routes>
        {authenticated ? (
          <>
            <Route path="/actividades" element={<Actividades />} />
            <Route path="/calendar" element={<Calendario />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/maquinaria" element={<Maquinaria />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/fitosanitarios" element={<Fitosanitarios />} />
            <Route path="/anadiractividades" element={<AñadirActividades />} />
            <Route path="/anadirpersonal" element={<AñadirPersonal />} />
            <Route path="/anadirmaquinaria" element={<AñadirMaquinaria />} />
            <Route path="/anadirproductos" element={<AñadirProductos />} />
            <Route path="/anadirfitosanitarios" element={<AñadirFitosanitarios />} />
            <Route path="/parcelas" element={<Parcelas />} />
            <Route path='/anadirparcela' element={<AñadirParcela />} />
          </>
        ) : (
          <Route
            path="/"
            element={<LoginPage handleLogin={handleLogin} setAuthenticated={setAuthenticated} />}
          />
        )}
      </Routes>
    </>
  );
}

export default App;
