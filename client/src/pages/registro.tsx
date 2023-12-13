import { FormEvent, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

const App: React.FC = () => {
    const [mail, setMail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [edad, setEdad] = useState(0);
    const [pais, setPais] = useState("");
    const [genero, setGenero] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar que todos los campos estén completos
        //if (!mail || !contraseña || !nombre || !apellido || !edad || !pais || !genero) {
        //    setError("No se completaron todos los campos");
        //    return;
        //}

        // Validar campos individualmente
        if (!mail) {
        setError("Por favor, ingresa tu correo electrónico");
        return;
            }

        if (!contraseña) {
        setError("Por favor, ingresa tu contraseña");
        return;
            }

        if (!nombre) {
        setError("Por favor, ingresa tu nombre");
        return;
            }

        if (!apellido) {
            setError("Por favor, ingresa tu apellido");
            return;
            }

        if (!edad) {
            setError("Por favor, ingresa tu edad");
            return;
            }

        if (!pais) {
            setError("Por favor, ingresa tu pais");
            return;
            }

        if (!genero) {
            setError("Por favor, ingresa tu genero");
            return;
            }

        try {
            const response = await fetch('http://localhost:3000/api/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: mail,
                    password: contraseña,
                    nombre: nombre,
                    apellido: apellido,
                    edad: (edad),
                    Pais: pais,
                    Genero: genero,
                    Hobbie: 'Ninguno',
                    Trabajo: 'Ninguno',
                    Localidad: '',
                    Direccion: '',
                    Preferencias_laborales: 'Ninguna',
                    Experiencia_Laboral: 0,
                    Preferencia_distancia: 5,
                    Que_necesitaria: '',
                    Empresa: false
                }),
            });

            const data = await response.json();

            // Manejar la respuesta, redireccionar o mostrar un mensaje al usuario
            console.log(data);
            router.push('/');
        } catch (error) {
            console.error('Error al enviar la solicitud de registro:', error);
        }
    };

    return (
        <div className="cuadroRegister">
            <div className="superiorRegister">
                <Link href="/">
                    <button className="atrasRegister" type="submit"></button>
                </Link>
            </div>
            <div className="inferiorRegister">
                <form className="formRegister" onSubmit={handleSubmit}>
                    <div className="mail">
                        <input className="input2" type="input" placeholder="Mail" onChange={(e) => setMail(e.target.value)} />
                    </div>
                    <div className="contraseña">
                        <input className="input2" type="input" placeholder="Contraseña" onChange={(e) => setContraseña(e.target.value)} />
                    </div>
                    <div className="nombre">
                        <input className="input2" type="input" placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="apellido">
                        <input className="input2" type="input" placeholder="Apellido" onChange={(e) => setApellido(e.target.value)} />
                    </div>
                    <div className="edad">
                        <input className="input2" type="input" placeholder="Edad" onChange={(e) => setEdad(parseInt(e.target.value, 10))} />
                    </div>
                    <div className="pais">
                        <input className="input2" type="input" placeholder="Pais" onChange={(e) => setPais(e.target.value)} />
                    </div>
                    <div className="genero">
                        <input className="input2" type="input" placeholder="Genero" onChange={(e) => setGenero(e.target.value)} />
                    </div>
                    <button className="input__submit" type="submit">Registrar</button>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}

export default App;
