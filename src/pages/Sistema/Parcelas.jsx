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
      <Breadcrumb pageName="Parcelas"/>
      <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 xl:grid-cols-3">
        {parcelas.map(parcela => (
          <CardParcelas key={parcela.id} parcelas={parcelas} id={parcela.id} />
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Parcelas;
