const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto en producción

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
    const { nombre, apellido, email, password, edad, Hobbie, Trabajo, Localidad, Direccion, Pais, Preferencias_laborale, Genero, Experiencia_Laboral, Preferencia_distancia, Que_necesitaria, Preferencias_Experiencia, Empresa } = req.body;
  
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
          Preferencias_laborale,
          Genero,
          Experiencia_Laboral,
          Preferencia_distancia,
          Que_necesitaria,
          Preferencias_Experiencia,
          Empresa
        },
      });
  
      res.json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
      console.error('Error en el registro de usuarios:', error);
      res.status(500).json({ error: 'Error en el registro de usuarios' });
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
