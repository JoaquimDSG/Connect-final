import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { FormEvent, useState } from "react";
import Link from 'next/link';
import Trabajo from '@/components/trabajo';

const First = () => {

    return (
        <>

        <div> 
            <Trabajo></Trabajo>
        </div>

        </>
    );

}

export default First;