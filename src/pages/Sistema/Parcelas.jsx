import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from '../../components/Breadcrumb';
import React from 'react';

import CardParcelas from "../../components/CardParcelas";

const Parcelas = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Parcelas" />
      <div className="flex flex-wrap gap-4 justify-center">
        <CardParcelas />
        <CardParcelas />
      </div>
    </DefaultLayout>
  );
};

export default Parcelas;
