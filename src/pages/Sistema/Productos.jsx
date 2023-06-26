import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import util from '../../utils/util';

const Productos = () => {
  const [productosAgricolas, setProductosAgricolas] = useState([]);

  useEffect(() => {
    fetch(util.getProductos())
      .then(response => response.json())
      .then(data => {
        setProductosAgricolas(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de los productos:', error);
      });
  }, []);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Productos" />
        <div className="flex flex-col gap-4">
          <div className="flex justify-center mb-5 mt-5">
            <div className="w-full">
              <Link to="/anadirproductos" className="btn btn-primary font-bold mb-2 mr-5 text-center">Pincha aqui para añadir productos</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <table id="tabla-personas" className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-separate border border-slate-500'>
                <tr>
                  <th className='px-6 py-3'>Nombre</th>
                  <th className='px-6 py-3'>Tipo</th>
                  <th className='px-6 py-3'>Cantidad</th>
                </tr>
              </thead>
              <tbody className=''>
                {productosAgricolas.map((producto, index) => (
                  <tr className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-separate border border-slate-500' key={index}>
                    <td className='px-6 py-4'>{producto.nombre}</td>
                    <td className='px-6 py-4'>{producto.tipo}</td>
                    <td className='px-6 py-4'>{producto.cantidad}</td>
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

export default Productos;
