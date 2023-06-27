import Breadcrumb from '../../../components/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import util from '../../../utils/util';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';



const AñadirFitosanitarios = () => {
  const [fitosanitarioslist, setfitosanitarioslist] = useState([]);
  const [parcela, setParcelas] = useState([]);
  const navigate = useNavigate();


  // Realizar la solicitud GET para cargar la lista de fitosnanitarios
  useEffect(() => {
    fetch(util.getFitosanitarios())
      .then(response => response.json())
      .then(data => {
        setfitosanitarioslist(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de los productos:', error);
      });
  }, []);


  // Realizar la solicitud GET para cargar la lista de parcelas
  useEffect(() => {
    fetch(util.getParcelas())
      .then(response => response.json())
      .then(data => {
        setParcelas(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de las parcelas:', error);
      });
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fitosanitario = {
      nombre: formData.get('nombre'),
      cantidad: formData.get('cantidad'),
      nparcela: formData.get('nparcela'),
      fecha: formData.get('fecha'),
      superficie: formData.get('superficie')
    };

    console.log(fitosanitario);

    //Realizar la solicitud a la API
    fetch(util.getFitosanitarios(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fitosanitario)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // alert('Se ha añadido el personal correctamente.');
        navigate('/fitosanitarios');
        event.target.reset();
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
        navigate('/fitosanitarios');
        // alert('Se produjo un error al enviar los datos. Por favor, inténtalo de nuevo.');
      });

    // window.location.reload();
    // event.target.reset();
    navigate('/fitosanitarios')
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Formulario para añadir fitosanitarios" />
      <div className='flex flex-col gap-4 my-5'>
        <h2 className='dark:bg-[#1A222C] dark:text-white'>Seleccione el fitosanitario que va ha usar</h2>
        <form onSubmit={handleFormSubmit}>
          <div className='flex flex-col gap-4'>
            <select
              name='nombre'
              id='nombre'
              className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#1A222C] dark:text-white'
              required
            >
              <option value=''>Seleccione el fitosanitario</option>
              {fitosanitarioslist.map(fitosanitario => (
                <option key={fitosanitario.id} value={fitosanitario.nombre}>
                  {fitosanitario.sustanciaactiva}
                </option>
              ))}
            </select>

            <input
              type='number'
              name='cantidad'
              id='cantidad'
              placeholder='Cantidad'
              className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#1A222C] dark:text-white'
              required
            />

            <label htmlFor="Parcelas" className='text-black dark:bg-[#1A222C] dark:text-white'>Seleccione la parcela que va ha usar</label>
            <select
              name="nparcela"
              id="nparcela"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] dark:text-white">
              {parcela.map((parcela) => (
                <option key={parcela.id} value={parcela.id}>
                  ID Parcela {parcela.id} -- Nº SigPac {parcela.nsigpac}
                </option>
              ))}
            </select>

            <input
              type='date'
              name='fecha'
              id='fecha'
              placeholder='Fecha'
              className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#1A222C] dark:text-white'
              required
            />

            <input
              type='number'
              name='superficie'
              id='superficie'
              placeholder='Superficie tratada'
              className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#1A222C] dark:text-white'
              required
            />

            <button type='submit' className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Añadir productos</button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  )
}

export default AñadirFitosanitarios