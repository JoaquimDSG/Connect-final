// pages/api/buscar-usuarios.js

import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método no permitido
  }

  const { campo, valor } = req.body;

  try {
    const usuarios = await prisma.usuarios.findMany({
      where: {
        [campo]: {
          contains: valor, // Puedes ajustar esto según tus necesidades de búsqueda
        },
      },
    });

    res.status(200).json({ usuarios });
  } catch (error) {
    console.error('Error al buscar usuarios:', error);
    res.status(500).json({ error: 'Error al buscar usuarios' });
  }
}
