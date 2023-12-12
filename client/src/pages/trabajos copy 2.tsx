import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface BuscarUsuariosProps {
  email: string;
}

const BuscarUsuarios: React.FC<BuscarUsuariosProps> = ({ email }) => {
  const [campoSeleccionado, setCampoSeleccionado] = useState('nombre');
  const [valorBusqueda, setValorBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  
  const handleBuscar = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/buscar-usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ campo: campoSeleccionado, valor: valorBusqueda }),
      });

      const data = await response.json();

      if (response.ok) {
        setResultados(data.usuarios);
      } else {
        console.error('Error al buscar usuarios:', data.error);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  
  return (
    <form className="cuadro"> 
    <Link href={{ pathname: 'first', query: { email } }}> <button className="atrasPerfil" type="submit"></button> </Link>  
      <div>
      <h1>Buscar Usuarios</h1>
      <label>
        Campo de Búsqueda:
        <select value={campoSeleccionado} onChange={(e) => setCampoSeleccionado(e.target.value)}>
          <option value="nombre">Nombre</option>
          <option value="apellido">Apellido</option>
          <option value="edad">Edad</option>
          <option value="Trabajo">Trabajo</option>
          <option value="Pais">Pais</option>
          <option value="Experiencia_Laboral">Experiencia Laboral</option>
          <option value="Preferencia_distancia">Preferencia_distancia</option>
        </select>
      </label>
      <label>
        Valor de Búsqueda:
        <input type="text" value={valorBusqueda} onChange={(e) => setValorBusqueda(e.target.value)} />
      </label>
      <button onClick={handleBuscar}>Buscar</button>
      <h2>Resultados</h2>
        {resultados.map((usuario) => (
          <li key={usuario.id}>
            Nombre {usuario.nombre} {usuario.apellido} - Genero {usuario.Genero} - {usuario.edad} años - Trabajo actual {usuario.Trabajo} - Experiencia {usuario.Experiencia_Laboral} años - 
            email {usuario.email} - Hobbies {usuario.Hobbie} - Dirección {usuario.Direccion} - {usuario.Localidad} - Pais {usuario.Pais} - 
            Preferencias laborales {usuario.Preferencias_laborales} - Preferencia de Distancia {usuario.Preferencia_distancia} KM - Necesitaria {usuario.Que_necesitaria}
          </li>
        ))}
     </div>
    </form>
  );
};

// Esta función se ejecuta en el servidor, proporciona las props a la página
export const getServerSideProps: GetServerSideProps<BuscarUsuariosProps> = async (context) => {
  // Obtén el parámetro de la URL (en este caso, el correo electrónico)
  const { email } = context.query;

  // Devuelve las props, que incluyen el correo electrónico
  return {
    props: { email: email as string },
  };
};

export default BuscarUsuarios;
