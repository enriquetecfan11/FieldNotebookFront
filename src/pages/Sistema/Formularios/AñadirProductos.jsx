import Breadcrumb from '../../../components/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import util from '../../../utils/util';
import { useNavigate } from 'react-router-dom';


const AñadirProductos = () => {
  const naivgate = useNavigate();

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
    fetch(util.getProductos(), {
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
      {/* Form to add personal to the API  */}
      <Breadcrumb pageName="Formulario para añadir productos" />
      <div className='flex flex-col gap-4 my-5'>
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
    </DefaultLayout>
  )
}

export default AñadirProductos;