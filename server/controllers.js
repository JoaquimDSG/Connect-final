const { Prisma, PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');

async function registro(req, res) {
    const { name, surname, email, password, edad, Localidad, Pais, Genero, Empresa } = req.body;

    const email_existe = await prisma.Usuarios.findUnique({
        where: { email }
    })
    if (email_existe) {
        return res.status(400).json({ msg: "El correo ya existe en la base de datos" });
    }
    else {
        let userId;
        const hashedPassword = bcrypt.hashSync(password, 10);

        await prisma.Usuarios.create({ data: { nombre: name, apellido: surname, email, password: hashedPassword, edad, Localidad, Pais, Genero, Empresa } })
        
        return res.status(200).json({msg: "Usuario creado con exito"});
    };
}

async function login(req, res) {
    const { email, password } = req.body;
    const user = await prisma.Usuarios
      .findUnique({
        where: {
          email,
        },
      })
      .catch((err) => {
        throw new Error(err.message);
      });
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Ese Email no esta registrado en nuestra base de datos" });
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }
    const sessionId = uuidv4();
    res.cookie("sessionId", sessionId, { httpOnly: true });
    res.cookie("userId", user.id, { httpOnly: true });
    return res.status(200).json({ msg: "Se a loggeado exitosamente" });
  }

/*
async function getUser(req,res) {
  id = req.params.id;
  user = await prisma.Usuarios.findUnique({where: {id}}).catch((err) => {
    throw new Error(err.message);
})
if (!user) return res.status(404).json({msg: "El usuario no existe"})
return res.status(200).json({user})
}
*/

async function getUser(req, res) {
  req.cookie("userId", user.id, { httpOnly: true });
    const data = await client.Usuarios.findMany({
        where: {
            id: user.id,
        },
        select: {
          nombre: true,
          apellido: true,
          edad: true,
          Hobbie: true,
          Trabajo: true,
          Localidad: true,
          Direccion: true,
          Pais: true,
          Preferencias_laborales: true,
          Genero: true,
          Experiencia_Laboral: true,
          Que_necesitaria: true,
          user_that_liked: true,
          Empresa: true, 
        },
    });

    console.log("data: \n", data);
    res.status(200).json({data: data});
}

async function Like(req, res) {
  const { id } = req.body;
  const { id: likedId } = req.params;
  // Seleccionar lista de usuarios que likearon al usuario de likedId.
  const userLiked = prisma.Usuarios.findUnique({
      where: {
        id: likedId
      },
      select: {
        users_that_liked: true
      }
  });
  // Primero fijarse si el usuario likeado existe
  if (!userLiked) return res.status(404).json({msg: "El usuario likeado no existe"});

  if (userLiked.users_that_liked.includes(likedId)) {
    // Si ya está likeado, deslikear, sacar del array
    prisma.usuarios.update({
      where: {
        id: likedId
      },
      data:
      {
        users_that_liked: {
          set: {
            ...userLiked.users_that_liked.filter(x => x != id)
          }
        }
      }
    }).catch(err => { // Checkear errores
      return res.status(500).json(err);
    }).then(_ => {
      return res.sendStatus(200);
    });
  } else {
    // Si no está likeado, añadir al array
    prisma.usuarios.update({
      where: {
        id: likedId
      },
      data: {
        users_that_liked: {
          push: id
        }
      }
    }).catch(err => { // Checkear errores
      return res.status(500).json(err);
    }).then(_ => {
      return res.sendStatus(200);
    });
  }
}





module.exports = {login, registro, getUser, Like};