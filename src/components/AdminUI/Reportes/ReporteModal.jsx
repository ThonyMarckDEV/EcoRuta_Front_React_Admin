import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

function ReporteModal({ reporte, closeModal }) {
  const [position, setPosition] = useState(null);

  // Establecer la posición del mapa a las coordenadas del reporte
  useEffect(() => {
    if (reporte.latitude && reporte.longitude) {
      setPosition([reporte.latitude, reporte.longitude]);
    }
  }, [reporte]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-xl font-bold text-gray-600"
        >
          X
        </button>
        
        <h3 className="text-xl font-semibold mb-4">Detalles del Reporte</h3>
        
        {/* Información del reporte */}
        <div className="mb-4">
          <p><strong>Nombre:</strong> {reporte.nombre}</p>
          <p><strong>Descripción:</strong> {reporte.descripcion}</p>
        </div>

        {/* Mapa centrado en la latitud y longitud */}
        {position ? (
          <div className="w-full h-60">
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  {reporte.nombre}<br />{reporte.descripcion}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : (
          <p>No se puede mostrar el mapa, falta información de ubicación.</p>
        )}
      </div>
    </div>
  );
}

export default ReporteModal;
