// BuscarUsuarios.js

import React, { useState } from 'react';

const BuscarUsuarios = () => {

  const handleBuscar = async () => {
    try {
      const response = await fetch('/api/buscar-usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ campo: campoSeleccionado, valor: valorBusqueda }),
      });

      const data = await response.json();

      // Verificar si existen datos antes de acceder a las propiedades
      if (data && data.usuarios) {
        // Acceder a las propiedades sin errores
        setResultados(data.usuarios);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
};

export default BuscarUsuarios;
