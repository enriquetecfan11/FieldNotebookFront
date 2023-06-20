import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const Personal = () => {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET al cargar la página
    fetch('http://localhost:5000/personal')
      .then(response => response.json())
      .then(data => {
        setPersonas(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos del personal:', error);
      });
  }, []);


  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const personalData = {
      nombre: formData.get('nombre'),
      nif: formData.get('nif'),
      ninscripcion: formData.get('inscripcion'),
      carnetfito: formData.get('basico') === 'true',
      cualificado: formData.get('cualificado') === 'true',
      fumigacion: formData.get('fumigacion') === 'true',
      piloto: formData.get('piloto') === 'true'
    };

    console.log(personalData);

    //Realizar la solicitud a la API

    fetch('http://localhost:5000/personal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(personalData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // alert('Se ha añadido el personal correctamente.');
        // window.location.reload();
        // form.reset();
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
        // alert('Se produjo un error al enviar los datos. Por favor, inténtalo de nuevo.');
      });

    window.location.reload();
    // form.reset();
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270 overflow-auto">
        <Breadcrumb pageName="Personal" />

        {/* Tabla Personal */}
        <div className="">
          <table id="tabla-personas" className="w-full text-sm text-left text-gray-500 dark:text-gray-400 lg:">
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-separate border border-slate-500'>
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
              {personas.map((persona, index) => (
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

        <div className='flex flex-col gap-4 my-5'>
          <h2>Añade el personal de la explotación</h2>
          <form onSubmit={handleFormSubmit}>
            <div className='flex flex-col relative z-0 w-full mb-6 group'>
              <input type="text" name="nombre" placeholder='Añade el nombre' required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2"
              />
              <input type="text" name="nif" placeholder='Añade el NIF' required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2"
              />
              <input type="text" name="inscripcion" placeholder='Añade el Número de Inscripción' required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2" />

              <h3 className='my-3'>Si la persona tiene el carnet fitosanitario rellena el siguiente formulario</h3>
              <div className="flex flex-col my-3s">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-5">
                    <h4 className=''>Carnet Básico</h4>
                    <div className="flex flex-row gap-4">
                      <input type="radio" name="basico" id="basico-yes" value="true" />
                      <label htmlFor="basico-yes">Sí</label>
                      <input type="radio" name="basico" id="basico-no" value="false" />
                      <label htmlFor="basico-no">No</label>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='my-3'>
                    <h4>Seleccione el tipo de carnet</h4>
                    <div className='flex flex-col gap-4'>
                      <h4>Cualificado</h4>
                      <div className="flex flex-row gap-4">
                        <input type="radio" name="cualificado" id="cualificado-yes" value="true" />
                        <label htmlFor="cualificado-yes">Sí</label>
                        <input type="radio" name="cualificado" id="cualificado-no" value="false" />
                        <label htmlFor="cualificado-no">No</label>
                      </div>
                      <h4>Fumigación</h4>
                      <div className="flex flex-row gap-4">
                        <input type="radio" name="fumigacion" id="fumigacion-yes" value="true" />
                        <label htmlFor="fumigacion-yes">Sí</label>
                        <input type="radio" name="fumigacion" id="fumigacion-no" value="false" />
                        <label htmlFor="fumigacion-no">No</label>
                      </div>
                      <h4>Piloto</h4>
                      <div className="flex flex-row gap-4">
                        <input type="radio" name="piloto" id="piloto-yes" value="true" />
                        <label htmlFor="piloto-yes">Sí</label>
                        <input type="radio" name="piloto" id="piloto-no" value="false" />
                        <label htmlFor="piloto-no">No</label>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <button type='submit' className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Añadir personal</button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Personal;
