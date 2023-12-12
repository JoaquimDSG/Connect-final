import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const First: React.FC = () => {
  const router = useRouter();
  const { email } = router.query;

  return (
    <div className = "fondoTotal">
      <header className = "arribaFirst">
          <Link href="/"> <button className="atrasFirst" type="submit"></button> </Link>
          <Link href="mensajes"> <button className="Mensajes" type="submit"></button> </Link>
      </header>
      <form className= "fondoFirst">
      
          <div className="izquierda">
              <Link href={{ pathname: 'trabajos', query: { email } }}> <button className="BTrabajo" type="submit"></button> </Link>
          </div>

          <div className="derecha">
              {/* Pasa la variable 'email' a la próxima página */}
              <Link href={{ pathname: 'empleados', query: { email } }}><button className="BUsuario" type="submit"></button> </Link>
          </div>  
       
      </form>
      </div>
  );
}

export default First;
