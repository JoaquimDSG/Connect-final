//import Like from './controllers';

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');  // Importa el middleware cors

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto en producción

//const buscarEmpleadores = require('./api/buscar-empleadores');

require('dotenv').config();

// Middleware para permitir solicitudes desde el frontend
const corsOptions = {
  origin: 'http://localhost:3001',  // Ajusta la URL según tu frontend
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Endpoint para la autenticación
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por correo electrónico
    const usuario = await prisma.usuarios.findUnique({
      where: { email },
    });

    // Verificar la contraseña
    if (usuario && await bcrypt.compare(password, usuario.password)) {
      // Generar token de autenticación
      const token = jwt.sign({ userId: usuario.id }, SECRET_KEY, { expiresIn: '1h' });

      res.json({ token });
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).json({ error: 'Error en la autenticación' });
  }
});

// Endpoint para consultar registros por dirección de correo electrónico
app.get('/api/consultar-registros/:email', async (req, res) => {
const { email } = req.params;
//  console.log('Parámetro de correo electrónico:', email);

  try {
    const registros = await prisma.usuarios.findMany({
      where: {
        email: email,
      },
    });
    res.json(registros);
  } catch (error) {
    console.error('Error al consultar registros por email:', error);
    res.status(500).json({ error: 'Error al consultar registros por email' });
  }
});

// Endpoint para nuevos registros
app.post('/api/registro', async (req, res) => {
    const { nombre, apellido, email, password, edad, Hobbie, Trabajo, Localidad, Direccion, Pais, Preferencias_laboral, Genero, Experiencia_Laboral, Preferencia_distancia, Que_necesitaria, Empresa } = req.body;
  
    try {
      // Verifica si el usuario ya existe
      const usuarioExistente = await prisma.usuarios.findUnique({
        where: { email },
      });
  
      if (usuarioExistente) {
        return res.status(400).json({ error: 'El usuario ya está registrado' });
      }
  
      // Hash de la contraseña antes de almacenarla
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crea el nuevo usuario en la base de datos
      const nuevoUsuario = await prisma.usuarios.create({
        data: {
          nombre,
          apellido,
          email,
          password: hashedPassword,
          edad,
          Hobbie,
          Trabajo,
          Localidad,
          Direccion,
          Pais,
          Preferencias_laboral,
          Genero,
          Experiencia_Laboral,
          Preferencia_distancia,
          Que_necesitaria,
          Empresa
        },
      });
  
      res.json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
      console.error('Error en el registro de usuarios:', error);
      res.status(500).json({ error: 'Error en el registro de usuarios' });
    }
  });

// Endpoint para dar Like as usuario
app.post('/api/like/:email', async (req, res) => {
  const { email } = req.params;
  }
);

// Endpoint para modificar registros
app.post('/api/modificar-registro', async (req, res) => {
  const { email, nuevoNombre, nuevaPassword, nuevoApellido, nuevaEdad, nuevoHobbie, nuevoTrabajo, nuevaLocalidad, nuevaDireccion, nuevoPais, nuevasPreferencias_laborales, nuevoGenero, nuevaExperiencia_Laboral, nuevaPreferencia_distancia, nuevaQue_necesitaria, nuevaEmpresa } = req.body;
    
  // Hash de la contraseña antes de almacenarla
  const hashedPassword = await bcrypt.hash(nuevaPassword, 10);

  try {
    // Realizar la actualización en la base de datos
    await prisma.usuarios.update({
      where: { email },
      data: {
        nombre: nuevoNombre,
        password: hashedPassword,
        apellido: nuevoApellido,
        edad: nuevaEdad,
        Hobbie: nuevoHobbie,
        Trabajo: nuevoTrabajo,
        Localidad: nuevaLocalidad,
        Direccion: nuevaDireccion,
        Pais: nuevoPais,
        Preferencias_laborales: nuevasPreferencias_laborales,
        Genero: nuevoGenero,
        Experiencia_Laboral: nuevaExperiencia_Laboral,
        Preferencia_distancia: nuevaPreferencia_distancia,
        Que_necesitaria: nuevaQue_necesitaria,
        Empresa: nuevaEmpresa
      },
    });

  //    res.redirect(302, `/empleados?email=${encodeURIComponent(email)}`);
  //    res.redirect(`/empleados?email=${encodeURIComponent(updatedUser.email)}`);
  res.redirect('/empleados?email=$', {email});
  } catch (error) {
    console.error('Error al modificar el registro:', error);
    res.status(500).send('Error al modificar el registro');
  }
});


app.post('/api/buscar-usuarios', async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método no permitido
  }

  const { campo, valor } = req.body;

  try {
    let condition = {};

    // Verificar si el valor es un número
    if (!isNaN(valor)) {
      condition = {
        [campo]: parseInt(valor), // Convertir a número
      };
    } else {
      condition = {
        [campo]: {
          contains: valor, // Búsqueda de texto
        },
      };
    }

    const usuarios = await prisma.usuarios.findMany({
      where: condition,
    });

    res.status(200).json({ usuarios });
  } catch (error) {
    console.error('Error al buscar usuarios:', error);
    res.status(500).json({ error: 'Error al buscar usuarios' });
  }
}),

{/*app.post('/api/filtrar-usuarios', async (req, res) => {
  try {
    const { nombre, genero, edad, Experiencia_Laboral } = req.body;

    const usuariosFiltrados = await prisma.usuarios.findMany({
      where: {
        nombre: { contains: nombre || '' },
        genero: { contains: genero || '' },
        edad: { equals: edad || 0 },
        Experiencia_Laboral: { gte: Experiencia_Laboral || 0 },
      },
    });

    res.json(usuariosFiltrados);
  } catch (error) {
    console.error('Error al filtrar usuarios:', error);
    res.status(500).json({ error: 'Error al filtrar usuarios' });
  }
});*/}

app.post('/api/buscar-empleadores-criterios', async (req, res) => {
  try {
    const { email } = req.body;

    // Obtén el usuario actual
    const usuario = await prisma.usuarios.findUnique({
      where: {
        email,
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Busca empleadores que cumplan con los criterios
    const empleadores = await prisma.empleador.findMany({
      where: {
        Preferencias_Experiencia: { lte: usuario.Experiencia_Laboral },
        Preferencia_distancia: { lte: usuario.Preferencia_distancia },
      },
    });

    res.json({ empleadores });
  } catch (error) {
    console.error('Error al buscar empleadores con criterios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error('Error en la aplicación:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
