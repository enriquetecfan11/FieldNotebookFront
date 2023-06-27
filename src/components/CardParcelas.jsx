import React, { useEffect, useRef } from 'react';
import MapContainer from './MapContainer';

// Función auxiliar para obtener el nombre del uso SIGPAC basado en la referencia
const getUsoSigpacNombre = (referencia) => {
  switch (referencia) {
    case 'IV':
      return 'Invernaderos y cultivos bajo plástico';
    case 'VF':
      return 'Viñedo-frutal';
    case 'TA':
      return 'Tierras arables';
    case 'VI':
      return 'Viñedo';
    case 'TH':
      return 'Huerta';
    case 'VO':
      return 'Viñedo-olivar';
    case 'CF':
      return 'Asociación cítricos-frutales';
    case 'PA':
      return 'Pasto con arbolado';
    case 'CI':
      return 'Cítricos';
    case 'PR':
      return 'Pasto arbustivo';
    case 'PS':
      return 'Pastizal';
    case 'CV':
      return 'Asociación cítricos-viñedo';
    case 'ZC':
      return 'Zona concentrada no incluida en la ortofoto';
    case 'FF':
      return 'Asociación frutales-frutales de cáscara';
    case 'ZV':
      return 'Zona censurada';
    case 'FL':
      return 'Frutos secos y olivar';
    case 'AG':
      return 'Corrientes y superficies de agua';
    case 'FS':
      return 'Frutos secos';
    case 'CA':
      return 'Viales';
    case 'FV':
      return 'Frutos secos y viñedo';
    case 'ED':
      return 'Edificaciones';
    case 'FY':
      return 'Frutales';
    case 'FO':
      return 'Forestal';
    case 'OC':
      return 'Asociación olivar-cítricos';
    case 'IM':
      return 'Improductivos';
    case 'OF':
      return 'Olivar-frutal';
    case 'ZU':
      return 'Zona urbana';
    case 'OV':
      return 'Olivar';
    case 'EP':
      return 'Elemento del paisaje';
    default:
      return '';
  }
};


// Función auxiliar para obtener el nombre de la pronvincia
const getProvinciaNombre = (referencia) => {
  switch (referencia) {
    case '01':
      return 'Alava';
    case '02':
      return 'Albacete';
    case '29':
      return 'Malaga';
  }
};

function CardParcelas({ parcelas, id }) {
  // Verificar si parcelas es undefined o null
  if (!parcelas) {
    return <div>No se encontraron parcelas.</div>;
  }

  // Filtrar la lista de parcelas por el ID
  const parcela = parcelas.find((parcela) => parcela.id === id);

  if (!parcela) {
    return <div>No se encontró la parcela con el ID proporcionado.</div>;
  }

  return (
    <div className="border grid grid-cols-1 gap-2 justify-between dark:border-[#FFFF]">
      <div className="relative overflow-hidden">
        {/* Pass to the map the coordinates x and y */}
        <MapContainer Coord_X={parcela.Coord_X} Coord_Y={parcela.Coord_Y} />
      </div>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 dark:text-white">
          Nombre Parcela: {parcela.nombre}
        </h5>
        <p className="mb-3 text-sm font-normal leading-snug text-neutral-600 dark:text-neutral-300 dark:text-white">
          <ul>
            <li>Plantacion: {parcela.plantacion}</li>
            <li> Uso SIGPAC: {getUsoSigpacNombre(parcela.uso_sigpac)} </li>
            <li>Codigo Provincia: {parcela.provincia} {getProvinciaNombre(parcela.provincia)}</li>
            <li>Termino Municipal: {parcela.municipio}</li>
            <li>Nº Poligono: {parcela.poligono}</li>
          </ul>
        </p>
      </div>
    </div>
  );
}

export default CardParcelas;
