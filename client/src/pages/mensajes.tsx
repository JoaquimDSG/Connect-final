import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { FormEvent, useState } from "react";
import Link from 'next/link';

const First = () => {
    
    return (
        <form className = "cuadroMensajes">
            <header className = "superiorMensajes">
                <Link href="first"> <button className="atrasMensajes" type="submit"></button> </Link>
            </header>
            <div className = "inferiorMensajes">
                <div className="persona1">
                    <button className="m1" type="submit"></button>            
                    <label className="ml1">Ejemplo </label>
                </div> 
                <div className="persona2">
                    <button className="m2" type="submit"></button>
                    <label className="ml2">Ejemplo </label>
                </div>
                <div className="persona3">
                    <button className="m3" type="submit"></button>
                    <label className="ml3">Ejemplo </label>
                </div>
                <div className="persona4">
                    <button className="m4" type="submit"></button>
                    <label className="ml4">Ejemplo </label>
                </div>
                <div className="persona5">
                    <button className="m5" type="submit"></button>
                    <label className="ml5">Ejemplo </label>
                </div>
            </div>
        </form>
    );
}

export default First;