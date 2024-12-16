import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/generic/Sidebar';
import ReporteCard from '../../components/AdminUI/Reportes/ReporteCard';
import API_BASE_URL from '../../js/urlHelper';
import LoadingScreen from '../../components/home/LoadingScreen';

function Reportes() {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los reportes desde la API
  const fetchReports = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}api/v1/reports/listAll`);
      const data = await response.json();

      if (data.code === 200) {
        setReportes(data.data);
      } else {
        console.error('Error al obtener los reportes:', data.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6">¡Bienvenido al Panel de Reportes!</h2>

        {/* Mostrar el LoadingScreen mientras los reportes se están cargando */}
        {loading && <LoadingScreen />}

        {/* Contenedor de los reportes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reportes.map((reporte) => (
            <ReporteCard key={reporte.id} reporte={reporte} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reportes;
