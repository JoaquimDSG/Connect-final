// Importa los módulos necesarios
import Image from 'next/image';
import React, { FormEvent, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';

// Define la interfaz para los datos del usuario
interface UserData {
  id: number;
  email: string;
  // Otros campos según tu modelo de datos
}

const App: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar que ambos campos estén completos
    if (!email || !password) {
      setError('Por favor, ingresa tanto el correo electrónico como la contraseña.');
      return;
    }

    try {
      // Realiza la autenticación del usuario con el backend
      const response = await fetch("http://localhost:3000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Si la autenticación es exitosa, redirige a la página "first.tsx"
        router.push({
            pathname: '/first',
            query: { email },
          });
      } else {
        // Maneja el caso en que la autenticación falla
        setError('Error de autenticación');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setError('Error al realizar la solicitud');
    }
  };

  return (
    <div className="App">
      <div className="justify-center items-center pt-36 flex flex-col">
        <span className="font-bold font-poppins text-2x1">Connect</span>
        <form action="?action=save" name="myform" method="post" onSubmit={handleSubmit}>
          <div className="input1">
            <input className="input__box" type="email" placeholder="Correo Electrónico" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input2">
            <input type="password" placeholder="Contraseña" className="input__box" onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div>
            <button className="input__submit" type="submit">Continuar</button>
          </div>

          <div>
            <Link href="/registro">
              <button className="input__submit" type="submit">Registro</button>
            </Link>
          </div>

          <div> <img className="logo" src="isologo.png" alt="" /></div>
        </form>
      </div>
    </div>
  );
}

export default App;