import { Outlet, useLocation} from "react-router-dom";
import Navigation from "../components/navigation/navigation";



 const Home = () =>{
    let location = useLocation();
    let userName = "Rokie Balvoa";
    return(
        <>            
        { location.pathname === "/" ? (
            //aria del login 
            <>     
              <div>Loggin</div>        
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