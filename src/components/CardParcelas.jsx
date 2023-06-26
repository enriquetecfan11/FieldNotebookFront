import React, { useEffect, useRef } from 'react';
import MapContainer from './MapContainer';



function CardParcelas() {

  return (
    <div className="border grid grid-cols-1 gap-2 justify-between">
      <div className="relative overflow-hidden rounded-t-lg">
        <MapContainer />
      </div>
      <div className="p-6">
        <h5
          className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          Datos de la Parcela
        </h5>
        <p className="mb-3 text-sm font-normal leading-snug text-neutral-600 dark:text-neutral-300">
          <ul>
            <li>Nº SigPac:</li>
            <li>Codigo Provincia</li>
            <li>Termino Municipal</li>
            <li>Uso SIGPAC</li>
            <li>Codigo Agregado</li>
            <li>Nº Poligono</li>
            <li>Nº Recinto</li>
            <li>Zona</li>
            <li>Superficie SIGPAC</li>
          </ul>
        </p>
      </div>
    </div>
  )
};

export default CardParcelas;