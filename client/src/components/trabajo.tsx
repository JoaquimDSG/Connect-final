import react from 'react'
import Link from 'next/link';

const Trabajo = () => {
    return (
       <form className="cuadroTrabajo"> 
            <div className = "izquierdaTrabajo"> 
                <Link href="first"> <button className="atrasTrabajo" type="submit"></button> </Link>
            </div>
            <div className = "derechaTrabajo">
                <div className = "superiorTrabajo">
                    <div className = "superior-izquierda-Trabajo">
                        <button className="t1" type="submit"></button>
                    </div>
                    <div  className = "superior-derecha-Trabajo">
                        <button className="t2" type="submit"></button>
                    </div>
                </div>
                <div className = "inferiorTrabajo">
                    <div className = "inferior-izquierda-Trabajo">
                        <button className="t3" type="submit"></button>
                    </div>
                    <div className = "inferior-derecha-Trabajo">
                        <button className="t4" type="submit"></button>
                    </div>
                </div>
            </div>
        </form>   
    );
};
export default Trabajo