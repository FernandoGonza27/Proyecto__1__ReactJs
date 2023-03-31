import { useNavigate, NavLink } from "react-router-dom";
import "./navigation.scss"
import { getAuth, signOut} from "firebase/auth";

const Navigation =() => {
    const navigate = useNavigate();     
    const user = JSON.parse(localStorage.getItem("usuario"));
    const handleLogout = async () =>{
               
        const auth = getAuth();
        await signOut(auth).then(() => {
           console.log("Sign-out successful.");
           navigate('/');  
        }).catch((error) => {
          // An error happened.
        });     
    }    
    return(
        <div className="navigation">
            <div className="navigation__logo">
                <img src={"/img/logo__app.png"}/>
            </div>
            <div className="navigation__menu">
                <ul>
                    <li>Welcome {user.displayName}</li>
                
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