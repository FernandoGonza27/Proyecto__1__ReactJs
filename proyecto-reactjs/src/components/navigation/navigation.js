import { useNavigate, NavLink,useLocation } from "react-router-dom";
import "./navigation.scss"
import { getAuth, signOut} from "firebase/auth";

const Navigation =() => {
    let location = useLocation();
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
            
            <div className="navigation__menu">
                <img src={"/img/logo__app2.png"}/>
                <ul>
                    <li>Welcome {user.displayName}</li>
                
                </ul>
            </div>
            <div className="logout">
                <div className="logout__close">                    
                    { location.pathname === "/products" ? (                    
                            <button onClick={()=>navigate('/carts')} >Carts</button>         
                    ) : (                              
                            <button onClick={()=>navigate('/products')} >Products</button>                                  
                    )        
                    }  
                    <button onClick={handleLogout} >Logout</button>                      
                </div>                                                 
            </div>                            
        </div>
    );

}

export default Navigation;