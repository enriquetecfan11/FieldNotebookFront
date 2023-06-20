import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Calendario from './pages/Calendario';
import Actvidades from './pages/Actividades';

import Personal from './pages/Sistema/Personal';
import Maquinaria from './pages/Sistema/Maquinaria';
import Productos from './pages/Sistema/Productos';
import Fitosanitarios from './pages/Sistema/Fitosanitarios';
import AñadirActividades from './pages/AñadirActividades';


function App() {
  const [loading, setLoading] = useState<boolean>(true);

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

  return loading ? (
    <p className=" text-center text-danger">LA APLIACIÓN NO HA SIDO CARGADA</p>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Actvidades />} />
        <Route path="/calendar" element={<Calendario />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/maquinaria" element={<Maquinaria />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/fitosanitarios' element={<Fitosanitarios />} />
        <Route path='/actividades' element={<Actvidades />} />
        <Route path='/addactividades' element={<AñadirActividades />} />
      </Routes>
    </>
  );
}

export default App;
