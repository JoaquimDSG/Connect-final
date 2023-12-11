//import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import EditarRegistros from './api/EditarRegistros';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';

//export const getServerSideProps = async (context) => {
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  // Obtén el parámetro de la URL (en este caso, el correo electrónico)
  const { email } = context.query;

  if (!email) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  // Asegúrate de que 'email' esté definido antes de pasarlo como props
  return {
    props: { email: email ? email.toString() : null },
//    props: { email: email as string },
  };
};

interface EmpleadosProps {
  email: string;
}

const EditarPerfil: React.FC<EmpleadosProps> = ({ email }) => {
  return (
        <form className="cuadro"> 
        <Link href={{ pathname: 'first', query: { email } }}><button className="atrasPerfil" type="submit"></button> </Link>
             <div className = "superior">
                     <label className= "info"> Modificación del perfil </label>
                     <EditarRegistros email={email}/>
             </div>
             <div className = "inferior">
                 <div className = "inferior-derecha">
                  {/*<Link href={{ pathname: 'first', query: { email } }}><button className="SILike" type="submit"></button></Link>*/}
                 </div>
             </div>
         </form>   
     );

 //             {/* Pasa la variable 'email' a la próxima página */}
 //             <Link href={{ pathname: 'empleados', query: { email } }}><button className="BUsuario" type="submit"></button> </Link>
        
};

// Esta función se ejecuta en el servidor, proporciona las props a la página
//export const getServerSideProps: GetServerSideProps<EmpleadosProps> = async (context) => {
  // Obtén el parámetro de la URL (en este caso, el correo electrónico)
//  const { email } = context.query;

  // Devuelve las props, que incluyen el correo electrónico
//  return {
//    props: { email: email as string },
//  };
//};

export default EditarPerfil;
