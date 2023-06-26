import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from '../../components/Breadcrumb';
import React from 'react';
import util from '../../utils/util';
import CardParcelas from "../../components/CardParcelas";

const Parcelas = () => {
  // Fetch into getParcelaID
  const [parcelas, setParcelas] = React.useState([]);

  React.useEffect(() => {
    // Realizar la solicitud GET al cargar la página
    fetch(util.getParcelas())
      .then(response => response.json())
      .then(data => {
        setParcelas(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de las parcelas:', error);
      });
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Parcelas" />
      <div className="flex flex-row p-6 justify-center align-middle">
        <h2 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          Nº Total de Parcelas: {parcelas.length}
        </h2>
      </div>
      <div className="flex flex-row gap-4 justify-center w-[700px] h-[500px]">
        {parcelas.map((parcela, index) => (
          <div key={index}>
            <CardParcelas parcelas={parcelas} id={parcela.id} />
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Parcelas;
