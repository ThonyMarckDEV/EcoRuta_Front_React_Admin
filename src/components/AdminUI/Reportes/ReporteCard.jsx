// ReporteCard.jsx
import React, { useState } from 'react';
import ReporteModal from './ReporteModal';  // Importamos el componente modal

function ReporteCard({ reporte }) {
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={reporte.photo_url} 
        alt={`Reporte ${reporte.id}`} 
        className="w-full h-48 object-cover cursor-pointer" 
        onClick={() => setShowModal(true)} 
      />
      <div className="p-4">
        <p className="font-semibold text-lg mb-2">{reporte.description}</p>
        <p className="text-sm text-gray-500 mb-2">Fecha: {new Date(reporte.report_date).toLocaleString()}</p>
        <div className="mb-4">
          <span className={`text-sm font-semibold ${reporte.status === 'PENDIENTE' ? 'text-yellow-500' : reporte.status === 'APROBADO' ? 'text-green-500' : 'text-red-500'}`}>
            Estado: {reporte.status}
          </span>
        </div>
      </div>

      {/* Abrir modal al hacer clic */}
      {showModal && <ReporteModal reporte={reporte} closeModal={() => setShowModal(false)} />}
    </div>
  );
}

export default ReporteCard;
