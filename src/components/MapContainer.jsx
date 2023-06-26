import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';

function MapContainer() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const centerCoordinates = fromLonLat([-4.148884, 36.797051]);

    // Capa base de Google Hybrid
    const googleLayer = new TileLayer({
      source: new XYZ({
        url: 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      }),
    });

    // Capa de GeoJSON
    const geojsonSource = new VectorSource({
      format: new GeoJSON(),
      url: 'http://localhost:5000/map.geojson', // Reemplaza con la URL de tu archivo GeoJSON en el servidor
    });

    const geojsonLayer = new VectorLayer({
      source: geojsonSource,
    });

    // Configuración del mapa
    const map = new Map({
      target: mapContainerRef.current,
      layers: [googleLayer, geojsonLayer],
      view: new View({
        center: centerCoordinates,
        zoom: 17,
      }),
    });
  }, []);

  return (
    <div className="w-[400px] h-[300px]">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}

export default MapContainer;
