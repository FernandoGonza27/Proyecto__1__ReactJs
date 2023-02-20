import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/navigation";



 const Home = () =>{
    return(
        <div>  
            <div></div>
            <Navigation/>
            <Outlet/>
        </div>
    );

 }

 export default Home;