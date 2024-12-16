import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../js/urlHelper';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import LoadingScreen from '../components/home/LoadingScreen'; // Importa el componente LoadingScreen
import ecorutalogo from '../img/ECORUTALOGO.jpeg';
import { motion } from "framer-motion";  // Importamos Framer Motion

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para controlar la carga
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Mostrar la pantalla de carga

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: email,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
       // localStorage.setItem('jwt', result.token);
        window.location.href = '/adminUI'; // Redirigir a la página principal
      } else {
        setError(result.error || 'Hubo un error al iniciar sesión.');
      }
    } catch (error) {
      setError('Error en la conexión con el servidor.');
      console.error('Error al intentar iniciar sesión:', error);
    } finally {
      setLoading(false); // Ocultar la pantalla de carga después de completar la solicitud
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 shadow-xl">
      <div className="bg-white p-8 sm:p-10 rounded-lg w-full max-w-4xl shadow-lg flex sm:flex-row flex-col items-center">
        
        <div className="w-full sm:w-1/2 h-full">
          <img
            src={ecorutalogo} 
            alt="Login Image"
          />
        </div>
    
        <div className="w-full sm:w-1/2 h-full flex flex-col justify-center">
          {loading && <LoadingScreen />}
    
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Iniciar sesión</h2>
    
          <form onSubmit={handleLogin}>
            {/* Input de correo */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Correo electrónico</label>
              <motion.input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Escribe tu correo"
                required
                className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                whileFocus={{ borderColor: "#34d399" }}
              />
            </div>
    
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Contraseña
              </label>
              <div className="relative">
                <motion.input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Escribe tu contraseña"
                  required
                  className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16 appearance-none transition-all duration-300"
                  whileFocus={{ borderColor: "#34d399" }} // Animación de color verde al hacer foco
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-[60%] right-4 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  {showPassword ? <AiFillEyeInvisible size={28} /> : <AiFillEye size={28} />}
                </button>
              </div>
            </div>
    
            {/* Botón de iniciar sesión */}
            <motion.button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              whileHover={{ scale: 1.05 }} // Escala el botón al hacer hover
            >
              Iniciar sesión
            </motion.button>
          </form>
    
          {/* Mostrar error */}
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
