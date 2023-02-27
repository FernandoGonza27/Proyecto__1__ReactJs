import { Outlet, useLocation} from "react-router-dom";
import Navigation from "../components/navigation/navigation";
import Login from "../components/Login/Login";




 const Home = () =>{
    let location = useLocation();
    let userName = "Rokie Balvoa";
    return(
        <>            
        { location.pathname === "/" ? (
            //area del login 
            <>     
              <Login></Login>       
            </> 
          ) : (                              
            <>
              <Navigation userName={userName}></Navigation>
              <Outlet></Outlet>
              
            </>                     
          )        
        }    
        </>     
    );

 }

 export default Home;