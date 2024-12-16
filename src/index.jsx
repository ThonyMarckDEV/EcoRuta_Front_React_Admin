import React from 'react';
import ReactDOM from 'react-dom/client';  // Importa 'react-dom/client' para usar createRoot
import App from './App';


// Usar createRoot en lugar de render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
  