import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { FormEvent, useState } from "react";
import Link from 'next/link';

const First = () => {
    
    return (
        <div className = "fondoTotal">
        <header className = "arribaFirst">
            <Link href="/"> <button className="atrasFirst" type="submit"></button> </Link>
            <Link href="mensajes"> <button className="Mensajes" type="submit"></button> </Link>
        </header>
        <form className= "fondoFirst">
        
            <div className="izquierda">
                <Link href="trabajos"> <button className="BTrabajo" type="submit"></button> </Link>
            </div>

            <div className="derecha">
                <Link href="empleados"> <button className="BUsuario" type="submit"></button> </Link>
            </div>  
         
        </form>
        </div>
    );
}

export default First;
