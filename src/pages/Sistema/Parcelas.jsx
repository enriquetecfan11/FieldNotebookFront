import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from '../../components/Breadcrumb';
import React from 'react';
import util from '../../utils/util';
import CardParcelas from "../../components/CardParcelas";
import { Link } from "react-router-dom";

const Parcelas = () => {
  const [parcelas, setParcelas] = React.useState([]);

  React.useEffect(() => {
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
      <p className="mt-1 mb-4 text-neutral-600 dark:text-neutral-300 dark:text-white">Listado de parcelas</p>
      <Link to="/anadirparcela" className="btn btn-primary font-bold mb-2 mr-5 text-center dark:text-white">Haz clic aquí para una parcela</Link>
      <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 xl:grid-cols-3">
        {parcelas.map(parcela => (
          <CardParcelas key={parcela.id} parcelas={parcelas} id={parcela.id} />
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Parcelas;
