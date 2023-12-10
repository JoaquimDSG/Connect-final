
import react from 'react'

const InputField = () => {
    return (
    <form action="?action=save" name="myform" method="post">
        <input type="input" placeholder="Nombre" className="input__box"/>
        <button className="input__submit" type="submit"> Ir </button>
    </form>
    );
};

export default InputField