import { NavLink } from "react-router-dom";
import "./navigation.scss"

const Navigation =() => {
    return(
        <div className="navigation">
            <div className="navigation__logo">
                <img src={"https://media.istockphoto.com/id/542551196/es/vector/historieta-la-boca-ilustraci%C3%B3n-de-la-boca.jpg?s=1024x1024&w=is&k=20&c=VGI3trcAvzu2iLbpjG7HPT7GHNUs0gOBjwa2-H2C1nA="}/>
            </div>
            <div className="navigation__menu">
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li><NavLink to="/products">Products</NavLink></li>
                    <li><NavLink to="/carts">Carts</NavLink></li>
                </ul>
            </div>
        </div>
    );

}

export default Navigation;