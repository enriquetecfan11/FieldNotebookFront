import React, { useEffect, useRef } from 'react';
import MapContainer from './MapContainer';

function CardParcelas({ parcelas, id }) {
   // Verificar si parcelas es undefined o null
  if (!parcelas) {
    return <div>No se encontraron parcelas.</div>;
  }

  // Filtrar la lista de parcelas por el ID
  const parcela = parcelas.find(parcela => parcela.id === id);

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
          Datos de la Parcela {parcela.id}
        </h5>
        <p className="mb-3 text-sm font-normal leading-snug text-neutral-600 dark:text-neutral-300 dark:text-white">
          <ul>
            <li>Nº SigPac: {parcela.nsigpac}</li>
            <li>Codigo Provincia: {parcela.cprovincia}</li>
            <li>Termino Municipal: {parcela.terminomunicipal}</li>
            <li>Uso SIGPAC: {parcela.usosigpac}</li>
            <li>Codigo Agregado: {parcela.cagregado}</li>
            <li>Nº Poligono: {parcela.npoligono}</li>
            <li>Nº Recinto: {parcela.nrecinto}</li>
            <li>Zona: {parcela.zona}</li>
            <li>Superficie SIGPAC: {parcela.superficiesigpac}</li>
          </ul>
        </p>
      </div>
    </div>
  );
}

export default CardParcelas;
