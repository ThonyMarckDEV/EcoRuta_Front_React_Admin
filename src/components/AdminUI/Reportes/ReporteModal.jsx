import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

function ReporteModal({ reporte, closeModal }) {
  const [coordinates, setCoordinates] = useState(null); // Estado para las coordenadas del reporte
  const [userLocation, setUserLocation] = useState(null); // Estado para la ubicación del usuario

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  // Usamos useEffect para cargar las coordenadas del reporte y la ubicación del usuario
  useEffect(() => {
    if (reporte.latitude && reporte.longitude) {
      console.log('Latitud:', reporte.latitude);
      console.log('Longitud:', reporte.longitude);
      setCoordinates({
        lat: reporte.latitude,
        lng: reporte.longitude,
      });
    }

    // Obtener la ubicación del usuario utilizando la geolocalización del navegador
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, [reporte]);

  // Asegúrate de que las coordenadas estén disponibles antes de intentar renderizar el mapa
  if (!coordinates || !userLocation) {
    return null; // O mostrar un loader si es necesario
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal} // Cierra el modal al hacer clic en el fondo
    >
      <div
        className="bg-white p-8 rounded-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2"
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
        <div className="mb-4" style={{ height: '400px', width: '100%' }}>
          <LoadScript googleMapsApiKey="AIzaSyCYaNAZ2nK7AWeZ8oukyGwuucAdmK3M5XY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={coordinates}
              zoom={13}
            >
              {/* Marcador del reporte */}
              <Marker position={coordinates} />

              {/* Marcador de la ubicación del usuario */}
              <Marker position={userLocation} label="Tu Ubicación" />

              {/* InfoWindow para el reporte */}
              <InfoWindow position={coordinates}>
                <div>{reporte.description}</div>
              </InfoWindow>
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
