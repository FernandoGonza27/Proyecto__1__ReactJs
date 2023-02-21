
import "./cardsStyle.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

    const WebsiteCard = ({cart,handleChoice}) => {
    const navigate = useNavigate();

    const handleNavigate = () =>{
      navigate(`/products/${cart.products}`)
      //en este apartado debemos enviar los productos
    }

    const handleDelete = () =>{
      handleChoice(cart);
    }
    return (
      <>      
      <div
        className="card"
        key={cart.id}
        //</>onClick={handleClick}
      >
        <div className="card__body">
          <div className="card__title">
            <h4>Id the Cart :{cart.id}</h4>
            <button 
            onClick={handleDelete} 
            >              
              <FontAwesomeIcon                           
              icon={faSkullCrossbones}
              spin
              size="lg"
              >Delete
              </FontAwesomeIcon>
            </button>
          </div>
          <p>Total payable is {cart.total}$</p>
          <a href={"cart.url"} target="_blank" rel="noopener noreferrer">
            Go to the products
          </a>
        </div>
      </div>
      
      </>
    );
}

export default WebsiteCard;
