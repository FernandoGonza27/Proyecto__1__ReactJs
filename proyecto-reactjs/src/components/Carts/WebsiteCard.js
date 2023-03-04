
import "./cardsStyle.scss"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Close from "../buttons/buttonClose";
import Products from "../productos/products";

    const WebsiteCard = ({cart,handleChoice}) => {
    const navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState(cart.products);
    const [total, settotal] = useState(cart.total)
    const [id, setId] = useState(cart.id)
    const [cartSelected, setcartSelected] =useState(false);
    const [countProducts, setCountProducts] = useState(cart.totalQuantity)

 
    const handleCloseProducts= () =>{
		  setcartSelected(!cartSelected);
	  }
    const handleDelete = () =>{
      handleChoice(cart);
    }
    return (
      <>      
      <div
        className="card"
        key={id}
        //</>onClick={handleClick}
      >
        <div className="card__body">
          <div className="card__title">
            <h4>Id the Cart :{id}</h4>
           
            <button 
            onClick={handleDelete} 
            >              
               <Close close={handleDelete}/>
            </button>
          </div>
          <p>Quantity of products:{countProducts}</p>          
          <p>Total payable is ${total}</p>          
          <a               
              target="_blank" 
              rel="noopener noreferrer"
              onClick={()=> setcartSelected(!cartSelected)}
          >
            Go to the products
          </a>
          {
					cartSelected ?  <Products
					 cartProducts={cartProducts}
           setCartProducts={setCartProducts}
           total={total}
           settotal={settotal}
					 handleCloseProducts={handleCloseProducts}
           countProducts ={countProducts}
           setCountProducts ={setCountProducts}
           />  : ""
				  }
        </div>
      </div>
      
      </>
    );
}

export default WebsiteCard;
