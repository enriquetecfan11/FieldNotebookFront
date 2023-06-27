import Breadcrumb from '../../../components/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import util from '../../../utils/util';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const AñadirParcela = () => {
  const navigate = useNavigate();
  const [parcelas, setParcelas] = React.useState([]);

  React.useEffect(() => {
    fetch(util.parcelasSigPac())
      .then((response) => response.json())
      .then((data) => {
        setParcelas(data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de las parcelas:', error);
      });
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const nombre = formData.get('nombre');
    const plantacion = formData.get('plantacion');
    const parcela = formData.get('parcela');
    
    const parcelaInfo = {
      nombre,
      plantacion,
      id: parcela.split(',')[0],
      uso_sigpac: parcela.split(',')[1],
      municipio: parcela.split(',')[2],
      provincia: parcela.split(',')[3],
      poligono: parcela.split(',')[4],
      Coord_X: parcela.split(',')[5],
      Coord_Y: parcela.split(',')[6]
      // coordenadas: parcela,
    };

    console.log(parcelaInfo);

    //Realizar la solicitud a la API

    fetch(util.getParcelas(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parcelaInfo)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        navigate('/parcelas')
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
        navigate('/parcelas')
      });

    // window.location.reload();
    navigate('/parcelas')
    form.reset();   
  };





  return (
    <DefaultLayout>
      <Breadcrumb pageName="Formulario para añadir parcelas" />
      <form onSubmit={handleFormSubmit}>
        <div className='relative z-0 w-full mb-6 group'>

          <input
            type="text"
            name="nombre"
            placeholder='Añade el nombre de la parcela'
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] dark:text-white"
          />

          <input
            type="text"
            name="plantacion"
            placeholder='Añade la plantación que tiene la parcela'
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] dark:text-white"
          />

          <select
            name="parcela"
            id="parcela"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] dark:text-white"
          >
            <option value="">Selecciona una parcela por su ID</option>
            {parcelas.map((parcela) => (
              <option key={parcela.id} value={`${parcela.id},${parcela.uso_sigpac},${parcela.municipio},${parcela.provincia},${parcela.poligono},${parcela.Coord_X},${parcela.Coord_Y}`}>
              Parcela ID BDD {parcela.id} // {parcela.dn_oid}{parcela.provincia}{parcela.municipio}{parcela.municipio}{parcela.zona}A0{parcela.parcela} // Uso Parcela {parcela.uso_sigpac}
              </option>
            ))}
          </select>


          <button type='submit' className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:bg-[#1A222C] dark:text-white">Añadir Parcela</button>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default AñadirParcela;
