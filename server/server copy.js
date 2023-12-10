// Import necessary modules
const express = require('express');
const prisma = require('@prisma/client'); // Update the path to your Prisma client

// Create an Express app
const app = express();
const port = 3000; // Update with your desired port number

// Define an API endpoint to fetch users
app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.Usuarios.findMany(); // Assuming you have a 'user' model
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
