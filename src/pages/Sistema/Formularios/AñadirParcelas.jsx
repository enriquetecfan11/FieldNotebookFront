import Breadcrumb from '../../../components/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import util from '../../../utils/util';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const AñadirParcela = () => {
  const navigate = useNavigate();

  // Get parcelas from util.parcelasSigPac()
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

    const parcelaData = {
      parcela: formData.get('parcela')
    };

    console.log(parcelaData);
    navigate('/parcelas')
    form.reset();
  }

  return (
    <DefaultLayout>
      <h1>Añadir Parcela</h1>
      <form onSubmit={handleFormSubmit}>
        <div className='relative z-0 w-full mb-6 group'>
          <select
            name="parcela"
            id="parcela"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] text-white"
          >
            <option value="">Selecciona una parcela por su ID</option>
            {parcelas.map((parcela) => (
              <option key={parcela.id} value={parcela.id}>
                dn_oid: {parcela.dn_oid}
              </option>
            ))}
          </select>
          <button type='submit' className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:bg-[#1A222C] text-white"> Añadir Parcela</button>
        </div>
      </form>
    </DefaultLayout>
  )
}

export default AñadirParcela;