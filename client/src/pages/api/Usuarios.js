// pages/api/users.js
import prisma from "@prisma/client"; // Update the path to your Prisma client

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const users = await prisma.Usuarios.findMany(); // Assuming you have a 'user' model
            res.status(200).json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}