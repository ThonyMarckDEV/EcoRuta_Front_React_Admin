import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';  // Asegúrate de importar Icon de leaflet
import 'leaflet/dist/leaflet.css';

function ReporteModal({ reporte, closeModal }) {
  const [position, setPosition] = useState(null);

  // Establecer la posición del mapa a las coordenadas del reporte
  useEffect(() => {
    if (reporte.latitude && reporte.longitude) {
      setPosition([reporte.latitude, reporte.longitude]);
    }
  }, [reporte]);

  // Crear un nuevo Icono personalizado
  const customIcon = new Icon({
    iconUrl: 'img/marker.png',  // Ruta de la imagen del marcador
    iconSize: [32, 32],  // Tamaño del ícono
    iconAnchor: [16, 32],  // Punto de anclaje del ícono
    popupAnchor: [0, -32]  // Punto donde se abrirá el popup
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
        {/* Botón de cierre dentro del modal */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-xl font-bold text-gray-600"
        >
          X
        </button>
        
        <h3 className="text-xl font-semibold mb-6">Detalles del Reporte</h3>
        
        {/* Información del reporte */}
        <div className="mb-6">
          <p><strong>Descripción:</strong> {reporte.description}</p>
          <p><strong>Estado:</strong> {reporte.status}</p>
          <p><strong>Fecha de reporte:</strong> {new Date(reporte.report_date).toLocaleString()}</p>
        </div>

        {/* Mapa centrado en la latitud y longitud */}
        {position ? (
          <div className="w-full h-80"> {/* Aumentamos la altura del mapa */}
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={customIcon}>
                <Popup>
                  {reporte.description}<br />{reporte.status}
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
