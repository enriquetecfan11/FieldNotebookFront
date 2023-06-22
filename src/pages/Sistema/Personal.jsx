import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link } from 'react-router-dom';


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

        <div className="flex justify-center mb-5 mt-5">
          <div className="w-full">
            <Link to="/anadirpersonal" className="btn btn-primary font-bold mb-2 mr-5 text-center">Pincha aqui para añadir personal</Link>
          </div>
        </div>

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
      </div>
    </DefaultLayout>
  );
};

export default Personal;
