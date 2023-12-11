import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ConsultaRegistros from './api/ConsultaRegistros';

interface EmpleadosProps {
  email: string;
}

const Empleados: React.FC<EmpleadosProps> = ({ email }) => {
  return (
        <form className="cuadro"> 
        <Link href={{ pathname: 'first', query: { email } }}> <button className="atrasPerfil" type="submit"></button> </Link>
             <div className = "superior">
                     <label className= "info"> Información del perfil </label>
                     <ConsultaRegistros email={email}/>
             </div>
             <div className = "inferior">
                 <div className = "inferior-izquierda">
                    <Link href={{ pathname: 'editar-perfil', query: { email } }}><button className="NOLike" type="submit"></button> </Link>
                 </div>
                 <div className = "inferior-derecha">
                     <button className="SILike" type="submit"></button>
                 </div>
             </div>
         </form>   
     );

 //             {/* Pasa la variable 'email' a la próxima página */}
 //             <Link href={{ pathname: 'empleados', query: { email } }}><button className="BUsuario" type="submit"></button> </Link>
        
};

// Esta función se ejecuta en el servidor, proporciona las props a la página
export const getServerSideProps: GetServerSideProps<EmpleadosProps> = async (context) => {
  // Obtén el parámetro de la URL (en este caso, el correo electrónico)
  const { email } = context.query;

  // Devuelve las props, que incluyen el correo electrónico
  return {
    props: { email: email as string },
  };
};

export default Empleados;
