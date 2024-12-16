import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../js/firebase'; // Asegúrate de importar tu instancia de auth de Firebase

function AdminUI() {
  const handleLogout = async () => {
    try {
      await signOut(auth);  // Desloguea al usuario
      // Aquí puedes redirigir a la página de inicio de sesión o realizar alguna acción
      window.location.href = '/'; // Redirige a la página de inicio
      console.log("Usuario deslogueado");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">¡Bienvenido!</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default AdminUI;
