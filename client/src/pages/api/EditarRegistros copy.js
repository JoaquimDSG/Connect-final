import React, { useState, useEffect } from 'react';


const EditarRegistros = ({ email }) => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const apiUrl = `http://localhost:3000/api/consultar-registros/${email}`;

    const fetchRegistros = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error al consultar registros: ${response.statusText}`);
        }

        const data = await response.json();
        setRegistros(data);
      } catch (error) {
        console.error(error.message);
        // Puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    };

    fetchRegistros();
  }, [email, registros]);

  return (
    <div>
     {/*<h1>Muestra de Registros</h1>*/}
      <div>
        {registros.length > 0 ? (
          registros.map((registro) => (
            <div key={registro.id}>
            <p>Nombre: {registro.nombre}</p>
            <p>Apellido: {registro.apellido}</p>
            <p>Email: {registro.email}</p>
            <p>Edad: {registro.edad}</p>
            <p>Hobbie: {registro.Hobbie || 'Ninguno'}</p>
            <p>Trabajo: {registro.Trabajo || 'Ninguno'}</p>
            <p>Localidad: {registro.Localidad}</p>
            <p>Direccion: {registro.Direccion || 'Ninguna'}</p>
            <p>Pais: {registro.Pais}</p>
            <p>Preferencias Laborales: {registro.Preferencias_laborales || 'Ninguna'}</p>
            <p>Genero: {registro.Genero}</p>
            <p>Experiencia Laboral: {registro.Experiencia_Laboral || 'Ninguna'}</p>
            <p>Preferencia Distancia: {registro.Preferencia_distancia || '8KM'}</p>
            <p>Que Necesitaría: {registro.Que_necesitaria || 'Ninguna'}</p>
            <p>Preferencias Experiencia: {registro.Preferencias_Experiencia || 'Ninguna'}</p>
            <p>Usuarios que le gustaron: {registro.user_that_liked.join(', ') || 'Ninguno'}</p>
            <p>Empresa: {registro.Empresa ? 'Sí' : 'No'}</p>
            <hr />
          </div>
        ))
        ) : (
          <p>No hay registros para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default EditarRegistros;