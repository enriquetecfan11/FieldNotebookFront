import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import util from '../../utils/util';

const Personal = () => {
  const [personas, setPersonas] = useState([]);
  const [filtroCarnet, setFiltroCarnet] = useState('');

  useEffect(() => {
    // Realizar la solicitud GET al cargar la página
    fetch(util.getPersonal())
      .then(response => response.json())
      .then(data => {
        setPersonas(data);

        const filtroCarnet = data.filter(persona => !persona.carnetfito).length;
        setFiltroCarnet(filtroCarnet);
      })
      .catch(error => {
        console.error('Error al obtener los datos del personal:', error);
      });
  }, []);

  const personasFiltradas = personas.filter(persona => {
    if (filtroCarnet === '') {
      return persona;
    } else if (filtroCarnet === 'true') {
      return persona.carnetfito;
    } else {
      return !persona.carnetfito;
    }
  })
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270 overflow-auto">
        <Breadcrumb pageName="Personal" />

        <div className="flex justify-center mb-5 mt-5">
          <div className="w-full">
            <Link to="/anadirpersonal" className="btn btn-primary font-bold mb-2 mr-5 text-center dark:text-white">Pincha aqui para añadir personal</Link>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-2 text-center dark:text-white">Filtrado de tabla</h2>
        <div className="flex justify-center mt-2">
          <select value={filtroCarnet} onChange={e => setFiltroCarnet(e.target.value)}
            className="font-bold mb-2 mr-5 text-center dark:bg-[#1A222C] dark:text-white"
          >
            <option value="">Filtar por carnet fitosanitario</option>
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>


        {/* Tabla Personal */}
        <div className="">
          <table id="tabla-personas" className="w-full text-sm text-left text-gray-500 dark:text-gray-400 lg:">
            <thead className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-separate border border-slate-500'>
              <tr>
                <th className='px-6 py-3 border-slate-500'>Nombre</th>
                <th className='px-6 py-3 border-slate-500'>NIF</th>
                <th className='px-6 py-3 border-slate-500'>Número de Inscripción</th>
                <th className='px-6 py-3 border-slate-500'>Carnet Fitosanitario</th>
                <th className='px-6 py-3 border-slate-500'>Cualificado</th>
                <th className='px-6 py-3 border-slate-500'>Fumigación</th>
                <th className='px-6 py-3 border-slate-500'>Piloto</th>
              </tr>
            </thead>
            <tbody className=''>
              {personasFiltradas.map((persona, index) => (
                <tr className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-separate border border-slate-500' key={index}>
                  <td className='px-6 py-4 border-slate-500'>{persona.nombre}</td>
                  <td className='px-6 py-4 border-slate-500'>{persona.nif}</td>
                  <td className='px-6 py-4 border-slate-500'>{persona.ninscripcion}</td>
                  <td className='px-6 py-4 border-slate-500'>{persona.carnetfito ? 'Sí' : 'No'}</td>
                  <td className='px-6 py-4 border-slate-500'>{persona.cualificado ? 'Sí' : 'No'}</td>
                  <td className='px-6 py-4 border-slate-500'>{persona.fumigacion ? 'Sí' : 'No'}</td>
                  <td className='px-6 py-4 border-slate-500'>{persona.piloto ? 'Sí' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout >
  );
};

export default Personal;
