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
    <div className = "fondoTotal">
      <header className = "arribaFirst">
      </header>
      <form className= "fondoFirst">
        <div className="izquierda">
            <div>
            <ConsultaRegistros email={email} />
            </div>
        </div>
        <div className="derecha">
              {/* Pasa la variable 'email' a la próxima página */}
              <Link href={{ pathname: 'empleados', query: { email } }}><button className="BUsuario" type="submit"></button> </Link>
        </div>
        </form>
    </div>       
  );
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
