import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

function ReporteModal({ reporte, closeModal }) {
  const [selectedMarker, setSelectedMarker] = useState(null); // To control which InfoWindow is open

  const mapContainerStyle = {
    width: '100%',
    height: '120px', // Tamaño más pequeño para el mapa en el modal
  };

  const center = {
    lat: reporte.latitude,
    lng: reporte.longitude,
  };

  const handleMarkerClick = () => {
    setSelectedMarker(center); // Set the selected marker's position to open the InfoWindow
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
      <div
        className="bg-white p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/3"
        onClick={(e) => e.stopPropagation()} // Evita que el clic en el modal cierre el modal
      >
        <button
          className="absolute top-2 right-2 text-xl font-bold text-gray-600"
          onClick={closeModal}
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">{reporte.description}</h2>

        {/* Mapa de Google dentro del modal */}
        <div className="mb-4" style={{ height: '120px', width: '100%' }}>
          <LoadScript googleMapsApiKey="AIzaSyA6P_Wa2HJ6kPRLmJssViwfm0JsIL9KWeo">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={13}
            >
              <Marker
                position={center}
                onClick={handleMarkerClick} // Open InfoWindow on marker click
              >
                {selectedMarker && (
                  <InfoWindow position={selectedMarker}>
                    <div>{reporte.description}</div>
                  </InfoWindow>
                )}
              </Marker>
            </GoogleMap>
          </LoadScript>
        </div>

        <p className="text-sm text-gray-700">Estado: <span className="font-semibold">{reporte.status}</span></p>
        <p className="text-sm text-gray-700">Fecha de reporte: <span className="font-semibold">{new Date(reporte.report_date).toLocaleString()}</span></p>
      </div>
    </div>
  );
}

export default ReporteModal;
