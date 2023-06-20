import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';

const Productos = () => {
  const [productosAgricolas, setProductosAgricolas] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET al cargar la página
    fetch('http://localhost:5000/productos')
      .then(response => response.json())
      .then(data => {
        setProductosAgricolas(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de los productos:', error);
      });
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const producto = {
      nombre: formData.get('nombre'),
      tipo: formData.get('tipo'),
      cantidad: formData.get('cantidad')
    };

    console.log(producto);

    //Realizar la solicitud a la API
    fetch('http://localhost:5000/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error al enviar los datos:', error);
        // alert('Se produjo un error al enviar los datos. Por favor, inténtalo de nuevo.');
      });

    window.location.reload();
    event.target.reset();
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Productos" />
        {/* Here are the maquinaria list */}
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
        {/* Form to add personal to the API  */}

        <div className='flex flex-col gap-4 my-5'>
          <h2>Añade la maquinaria de la explotación</h2>
          <form onSubmit={handleFormSubmit}>
            <div className='relative z-0 w-full mb-6 group'>
              <input type="text" name="nombre" placeholder='Añade el nombre del producto' required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2"
              />
              <input type="text" name="tipo" placeholder='Añade el tipo de producto' required
                className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2' />
              <input type="text" name="cantidad" placeholder='Añade la cantidad (introduce tambien la unidad de medida)' required
                className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2' />
              <button type='submit' className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Añadir productos</button>
            </div>
          </form>
        </div>

      </div>
    </DefaultLayout>
  );
};

export default Productos;
