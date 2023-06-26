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
        setMaquinaria(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la maquinaria:', error);
      });
  }, []);


  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Maquinaria" />
        {/* Here are the maquinaria list */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-center mb-5 mt-5">
            <div className="w-full">
              <Link to="/anadirmaquinaria" className="btn btn-primary font-bold mb-2 mr-5 text-center">Pincha aqui para añadir maquinaria</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <table id="tabla-personas" className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-separate border border-slate-500'>
                <tr>
                  <th className='px-6 py-3'>Marca</th>
                  <th className='px-6 py-3'>Matricula</th>
                  <th className='px-6 py-3'>Tipo</th>
                  <th className='px-6 py-3'>Fecha de Compra</th>
                  <th className='px-6 py-3'>Nº de ROMA</th>
                </tr>
              </thead>
              <tbody className=''>
                {maquinaria.map((maquina, index) => (
                  <tr className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-separate border border-slate-500' key={index}>
                    <td className='px-6 py-4'>{maquina.marca}</td>
                    <td className='px-6 py-4'>{maquina.matricula}</td>
                    <td className='px-6 py-4'>{maquina.tipo}</td>
                    <td className='px-6 py-4'>{maquina.fechacompra}</td>
                    <td className='px-6 py-4'>{maquina.nroma}</td>
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
