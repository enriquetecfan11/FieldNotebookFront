import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import util from '../../utils/util';

const Maquinaria = () => {
  const [maquinaria, setMaquinaria] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET al cargar la página
    fetch(util.getMaquinaria())
      .then(response => response.json())
      .then(data => {
        const sortedMaquinaria = data.sort((a, b) => new Date(b.fechacompra) - new Date(a.fechacompra));
        // Limitar a 10 maquinas
        setMaquinaria(sortedMaquinaria.slice(0, 10));
      })
      .catch(error => {
        console.error('Error al obtener los datos de la maquinaria:', error);
      });
  }, []);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Maquinaria" />
        <div className="flex flex-col gap-4">
          <div className="flex justify-center mb-5 mt-5">
            <div className="w-full">
              <p>Lista de las ultimas 10 maquinas añadidas</p>
              <Link to="/anadirmaquinaria" className="btn btn-primary font-bold mb-2 mr-5 text-center">Haz clic aquí para añadir maquinaria</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <table id="tabla-personas" className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-separate border border-slate-500'>
                <tr>
                  <th className='px-6 py-3'>ID</th>
                  <th className='px-6 py-3'>Marca</th>
                  <th className='px-6 py-3'>Matricula</th>
                  <th className='px-6 py-3'>Tipo</th>
                  <th className='px-6 py-3'>Fecha de Compra</th>
                  <th className='px-6 py-3'>Nº de ROMA</th>
                </tr>
              </thead>
              <tbody>
                {maquinaria.map(item => (
                  <tr className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-separate border border-slate-500' key={item.id}>
                    <td className='px-6 py-3'>{item.id}</td>
                    <td className='px-6 py-3'>{item.marca}</td>
                    <td className='px-6 py-3'>{item.matricula}</td>
                    <td className='px-6 py-3'>{item.tipo}</td>
                    <td className='px-6 py-3'>{item.fechacompra}</td>
                    <td className='px-6 py-3'>{item.nroma}</td>
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

export default Maquinaria;
