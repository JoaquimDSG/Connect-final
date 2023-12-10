/*
import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { FormEvent, useState } from "react";
import Link from 'next/link';
import Perfil from '@/components/perfil';

const First = () => {
    
    return (
        <>
 
            <div>
                <Perfil></Perfil>
            </div>

        </>
    );
    
}

export default First;
*/

/*
// Import necessary modules
import React, { useEffect, useState } from "react";
import Perfil from '@/components/perfil';

const First = () => {
    const [users, setUsers] = useState([]);

    // Fetch user data from the backend when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users"); // Assuming your API endpoint is /api/users
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <div>
                <Perfil users={users}></Perfil>
            </div>
        </>
    );
};

export default First;
*/

// Import necessary modules
import React from "react";

// Define prop types for the Perfil component
interface PerfilProps {
    users: any[]; // Update this type based on your actual user data structure
}

// Perfil component
const Perfil: React.FC<PerfilProps> = ({ users }) => {
    // Your Perfil component logic here
    return (
        <div>
            {/* Render user data here */}
            {users.map((user) => (
                <div key={user.id}>{/* Render user details */}</div>
            ))}
        </div>
    );
};

export default Perfil;

