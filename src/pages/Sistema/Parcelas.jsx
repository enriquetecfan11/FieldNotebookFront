import DefaultLayout from "../../layout/DefaultLayout";
import { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { Link } from 'react-router-dom';
import util from "../../utils/util.js";
import Breadcrumb from '../../components/Breadcrumb';


const Parcelas = () => {

  return(
    <DefaultLayout>
      <Breadcrumb pageName="Parcelas" />
      <h1>Parcelas</h1>
    </DefaultLayout>
  )

}

export default Parcelas