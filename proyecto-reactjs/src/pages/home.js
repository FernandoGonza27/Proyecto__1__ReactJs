import { Outlet, useLocation} from "react-router-dom";
import Navigation from "../components/navigation/navigation";
import Login from "../components/Login/Login";






 const Home = () =>{
  
    let location = useLocation();
    
    return(
        <>            
        { location.pathname === "/" ? (
            //area del login 
            <>     
              <Login></Login>       
            </> 
          ) : (                              
            <>
              <Navigation></Navigation>  
              <Outlet></Outlet>
              
            </>                     
          )        
        }    
        </>     
    );

 }

 export default Home;