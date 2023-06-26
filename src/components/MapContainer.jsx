import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';

function MapContainer({ Coord_X, Coord_Y }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const centerCoordinates = fromLonLat([Coord_X, Coord_Y]);

    // Capa base de Google Hybrid con opacidad de 0.5 (semi-transparente)
    const googleLayer = new TileLayer({
      source: new XYZ({
        url: 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      }),
      opacity: 0.5, // Establece la opacidad a 0.5
    });

    // Capa de GeoJSON => http://localhost:5000/Axarquia200.geojson
    const geojsonLayer = new VectorLayer({
      source: new VectorSource({
        url: 'http://localhost:5000/map2.geojson',
        format: new GeoJSON(),
        featureProjection: 'EPSG:3857',
      }),
    });

    // Configuración del mapa
    const map = new Map({
      target: mapContainerRef.current,
      layers: [googleLayer, geojsonLayer], // Cambia el orden de las capas si quieres que la capa de Google aparezca por encima
      view: new View({
        center: centerCoordinates, // Utiliza las coordenadas x e y proporcionadas
        zoom: 17,
      }),
    });

    // Limpia el mapa y los eventos asociados al desmontar el componente
    return () => {
      map.setTarget(null);
    };
  }, [Coord_X, Coord_Y]);

  return (
    <div className="w-[450px] h-[300px]">
      <div ref={mapContainerRef} className="w-full h-full" style={{ pointerEvents: 'none' }} />
    </div>
  );
}

export default MapContainer;
