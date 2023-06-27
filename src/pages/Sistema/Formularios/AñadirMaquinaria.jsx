import Breadcrumb from '../../../components/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import util from '../../../utils/util';
import { useNavigate } from 'react-router-dom';


const AñadirMaquinaria = () => {
  const navigate = useNavigate();


  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const maquinariaData = {
      marca: formData.get('marca'),
      modelo: formData.get('modelo'),
      matricula: formData.get('matricula'),
      tipo: formData.get('tipo'),
      fechacompra: formData.get('fechacompra'),
      nroma: formData.get('nroma')
    };

    console.log(maquinariaData);

    //Realizar la solicitud a la API

    fetch(util.getMaquinaria(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(maquinariaData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        navigate('/maquinaria')
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
        navigate('/maquinaria')
      });

    // window.location.reload();
    navigate('/maquinaria')
    form.reset();
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Formulario para añadir maquinaria" />
      <div className='flex flex-col gap-4 my-5'>
        <form onSubmit={handleFormSubmit}>
          <div className='relative z-0 w-full mb-6 group'>
            <input type="text" name="marca" placeholder='Añade la marca' required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] text-white"
            />
            <input type="text" name="matricula" placeholder='Introduce la matricula' required
              className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] text-white' />
            <input type="text" name="tipo" placeholder='Añade el tipo' required
              className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] text-white' />
            <input type="date" name="fechacompra" placeholder='Añade la fecha de compra' required
              className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] text-white' />
            <input type="number" name="nroma" placeholder='Añade el numero de ROMA' required
              className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] text-white' />
            <button type='submit' className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:bg-[#1A222C] text-white"> Añadir maquinaria</button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  )
}

export default AñadirMaquinaria;