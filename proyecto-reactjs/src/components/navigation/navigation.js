import { useNavigate, NavLink } from "react-router-dom";
import "./navigation.scss"

const Navigation =() => {
    const user =localStorage.getItem('account');		
	let userName=JSON.parse(user).userName;
    const navigate = useNavigate(); 

    const handleLogout = () =>{
        navigate('/'); 
        //funcion de desconectar usuario
        //ya sea por parametro o echa aqui
    }

    return(
        <div className="navigation">
            <div className="navigation__logo">
                <img src={"/img/logo__app.png"}/>
            </div>
            <div className="navigation__menu">
                <ul>
                    <li>Welcome  {userName}</li>
                
                </ul>
            </div>
            <div className="logout">
                <div className="logout__close">
                    <button onClick={handleLogout} >Logout</button></div>                
            </div>
        </div>
    );

}

export default Navigation;