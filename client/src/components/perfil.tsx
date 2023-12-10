
import react, { useEffect, useState } from 'react'
import Link from 'next/link';


const Perfil = () => {
    const [data, setData] = useState("");
    
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await fetch("http://localhost:3000/user/");
            const resData = await res.json();
            setData(resData.users);
            return resData;
          } catch (error) {
            throw error;
          }
        };
        fetchUsers();
      }, []);
    return (
       <form className="cuadro"> 
       <Link href="first"> <button className="atrasPerfil" type="submit"></button> </Link>
            <div className = "superior"> 
                <div className = "superior-izquierda">
                    <label className= "info"> Info del estudiante </label>
                </div>
                <div  className = "superior-derecha">
                    <label className= "aptitudes"> Aptitudes </label>
                </div>
            </div>
            <div className = "inferior">
                <div className = "inferior-izquierda">
                    <button className="NOLike" type="submit"></button>
                </div>
                <div className = "inferior-derecha">
                    <button className="SILike" type="submit"></button>
                </div>
            </div>
        </form>   
    );
};
export default Perfil