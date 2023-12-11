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