// EditarRegistro.js
import React, { useState, useEffect } from 'react';

const EditarRegistro = ({ email }) => {
  const [registro, setRegistro] = useState({});
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoApellido, setNuevoApellido] = useState('');
  const [nuevaEdad, setNuevaEdad] = useState(0); // Cambia a tu tipo de dato correspondiente
  const [nuevoHobbie, setNuevoHobbie] = useState('');
  const [nuevoTrabajo, setNuevoTrabajo] = useState('');
  const [nuevaLocalidad, setNuevaLocalidad] = useState('');
  const [nuevaDireccion, setNuevaDireccion] = useState('');
  const [nuevoPais, setNuevoPais] = useState('');
  const [nuevasPreferencias_laborales, setNuevasPreferencias_laborales] = useState('');
  const [nuevoGenero, setNuevoGenero] = useState('');
  const [nuevaExperiencia_Laboral, setNuevaExperiencia_Laboral] = useState(0); // Cambia a tu tipo de dato correspondiente
  const [nuevaPreferencia_distancia, setNuevaPreferencia_distancia] = useState(0); // Cambia a tu tipo de dato correspondiente
  const [nuevaQue_necesitaria, setNuevaQue_necesitaria] = useState('');
  const [nuevaEmpresa, setNuevaEmpresa] = useState(false);

  useEffect(() => {
    // Obtener datos del usuario para prellenar el formulario
    const fetchRegistro = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/consultar-registros/${email}`);
        if (!response.ok) {
          throw new Error(`Error al obtener datos del usuario: ${response.statusText}`);
        }

        const data = await response.json();
        setRegistro(data[0]); // Suponiendo que la consulta devuelve un solo registro
        setNuevoNombre(data[0]?.nombre || ''); // Utilizando el operador de nulabilidad (nullish coalescing operator) para evitar un valor undefined
        setNuevoApellido(data[0]?.apellido || '');
        setNuevaEdad(data[0]?.edad || 0);
        setNuevoHobbie(data[0]?.Hobbie || '');
        setNuevoTrabajo(data[0]?.Trabajo || '');
        setNuevaLocalidad(data[0]?.Localidad || '');
        setNuevaDireccion(data[0]?.Direccion || '');
        setNuevoPais(data[0]?.Pais || '');
        setNuevasPreferencias_laborales(data[0]?.Preferencias_laborales || '');
        setNuevoGenero(data[0]?.Genero || '');
        setNuevaExperiencia_Laboral(data[0]?.Experiencia_Laboral || 0);
        setNuevaPreferencia_distancia(data[0]?.Preferencia_distancia || 5);
        setNuevaQue_necesitaria(data[0]?.Que_necesitaria || '');
        setNuevaEmpresa(data[0]?.Empresa || false)
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchRegistro();
  }, [email]);

  const handleEditar = async () => {
    try {
      // Realizar la solicitud de modificación al backend
      const response = await fetch('http://localhost:3000/api/modificar-registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          nuevaPassword,
          nuevoNombre,
          nuevoApellido,
          nuevaEdad,
          nuevoHobbie,
          nuevoTrabajo,
          nuevaLocalidad,
          nuevaDireccion,
          nuevoPais,
          nuevasPreferencias_laborales,
          nuevoGenero,
          nuevaExperiencia_Laboral,
          nuevaPreferencia_distancia,
          nuevaQue_necesitaria,
          nuevaEmpresa
        }),
      });

      if (response.ok) {
        console.log('Registro modificado con éxito');
      } else {
        console.error('Error al modificar el registro');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div> 
      <div>
        <p>Email: {registro.email}</p>
        <p>Password: No se puede mostrar, reingresar</p>
        {/*<p>Nombre actual: {registro.nombre}</p>
        <p>Apellido actual: {registro.apellido}</p>
        <p>Edad actual: {registro.edad}</p>
        <p>Hobbie actual: {registro.Hobbie}</p>
        <p>Trabajo actual: {registro.Trabajo}</p>
        <p>Localidad actual: {registro.Localidad}</p>
        <p>Direccion actual: {registro.Direccion}</p>
        <p>Pais actual: {registro.Pais}</p>
        <p>Preferencias laborales actuales: {registro.Preferencias_laborales}</p>
        <p>Genero actual: {registro.Genero}</p>
        <p>Experiencia Laboral actual: {registro.Experiencia_Laboral}</p>
        <p>Preferencia distancia actual: {registro.Preferencia_distancia}</p>
        <p>Que necesitaria actualmente: {registro.Que_necesitaria}</p>
        <p>Es Empresa: {registro.Empresa ? 'Activo' : 'Inactivo'}</p>*/}
      </div>
      <div>
        {/* Formulario para modificar campos */}
        <label>Nuevo Password:</label><input type="password" value={nuevaPassword} onChange={(e) => setNuevaPassword(e.target.value)}/>
        </div>
        <div>
        <label>Nuevo Nombre:</label><input type="text" value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
        </div>
        <div>
        <label>Nuevo Apellido:</label><input type="text" value={nuevoApellido} onChange={(e) => setNuevoApellido(e.target.value)} />
        </div>
        <div>
        <label>Nueva Edad:</label><input type="number" value={nuevaEdad} onChange={(e) => setNuevaEdad(parseInt(e.target.value, 10))} />
        </div>
        <div>
        <label>Nuevo Hobbie:</label><input type="text" value={nuevoHobbie} onChange={(e) => setNuevoHobbie(e.target.value)} />
        </div>
        <div>
        <label>Nuevo Trabajo:</label><input type="text" value={nuevoTrabajo} onChange={(e) => setNuevoTrabajo(e.target.value)} />
        </div>
        <div>
        <label>Nueva Localidad:</label><input type="text" value={nuevaLocalidad} onChange={(e) => setNuevaLocalidad(e.target.value)} />
        </div>
        <div>
        <label>Nueva Direccion:</label><input type="text" value={nuevaDireccion} onChange={(e) => setNuevaDireccion(e.target.value)} />
        </div>
        <div>
        <label>Nuevo Pais:</label><input type="text" value={nuevoPais} onChange={(e) => setNuevoPais(e.target.value)} />
        </div>
        <div>
        <label>Nuevas Preferencias laborales:</label><input type="text" value={nuevasPreferencias_laborales} onChange={(e) => setNuevasPreferencias_laborales(e.target.value)} />
        </div>
        <div>
        <label>Nuevo Genero:</label><input type="text" value={nuevoGenero} onChange={(e) => setNuevoGenero(e.target.value)} />
        </div>
        <div>
        <label>Nueva Experiencia Laboral:</label><input type="number" value={nuevaExperiencia_Laboral} onChange={(e) => setNuevaExperiencia_Laboral(parseInt(e.target.value, 10))} />
        </div>
        <div>
        <label>Nueva Preferencia distancia:</label><input type="number" value={nuevaPreferencia_distancia} onChange={(e) => setNuevaPreferencia_distancia(parseInt(e.target.value, 10))} />
        </div>
        <div>
        <label>Nueva Que necesitaria:</label><input type="text" value={nuevaQue_necesitaria} onChange={(e) => setNuevaQue_necesitaria(e.target.value)} />
        </div>
        <div>
        <label>Nuevo estado Empresa:</label>
        <select value={nuevaEmpresa} onChange={(e) => setNuevaEmpresa(e.target.value === 'true')}>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
        </div>
        <div>
        <button onClick={handleEditar}>Editar</button>
        </div>
      </div>
  );
};

export default EditarRegistro;
