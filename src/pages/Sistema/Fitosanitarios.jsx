import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import util from '../../utils/util';

const Fitosanitarios = () => {
  const [fitosanitarios, setfitosanitarios] = useState([]);

  // Realizar la solicitud GET al cargar la lista
  useEffect(() => {
    fetch(util.getFitosanitariosList())
      .then(response => response.json())
      .then(data => {
        setfitosanitarios(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de los productos:', error);
      });
  }, []);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Productos Fitosanitarios" />
        <div className="flex flex-col gap-4">
          <div className="flex justify-center mb-5 mt-5">
            <div className="w-full">
              <Link to="/anadirfitosanitarios" className="btn btn-primary font-bold mb-2 mr-5 text-center">Pincha aqui para añadir los productos fitosanitarios usados</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <table id="tabla-personas" className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-separate border border-slate-500'>
                <tr>
                  <th className='px-6 py-3'>Nombre</th>
                  <th className='px-6 py-3'>Cantidad</th>
                  <th className='px-6 py-3'>Nº De Parcela </th>
                  <th className='px-6 py-3'>Fecha</th>
                  <th className='px-6 py-3'>Superficie tratada</th>
                </tr>
              </thead>
              <tbody className=''>
                {fitosanitarios.map((fitosanitario, index) => (
                  <tr className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-separate border border-slate-500' key={index}>
                    <td className='px-6 py-4'>{fitosanitario.nombre}</td>
                    <td className='px-6 py-4'>{fitosanitario.cantidad}</td>
                    <td className='px-6 py-4'>{fitosanitario.nparcela}</td>
                    <td className='px-6 py-4'>{fitosanitario.fecha.split('T')[0]}</td>
                    <td className='px-6 py-4'>{fitosanitario.superficie}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Fitosanitarios;
