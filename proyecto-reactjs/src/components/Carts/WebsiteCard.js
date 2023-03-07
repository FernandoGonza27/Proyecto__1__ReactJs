
import "./cardsStyle.scss"
import { useState } from "react";
import Products from "../productos/products";

    const WebsiteCard = ({cart,handleChoice}) => {    
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

    const userCart =(
      <div
        className="card"
        key={id}        
      >
        <div className="card__body">
          <div className="card__title">
            <h4>Id the Cart :{id}</h4>           
            <button onClick={handleDelete}>X</button>
          </div>
          <p>Total payable is ${total}</p>          
          <a               
              target="_blank" 
              rel="noopener noreferrer"
              onClick={()=> setcartSelected(!cartSelected)}
          >
            Go to the products
          </a>
        </div>
      </div>
    );
    return (
      <>            
      {
					cartSelected ?  <Products
					 cartProducts={cartProducts}
           setCartProducts={setCartProducts}
           total={total}
           settotal={settotal}
					 handleCloseProducts={handleCloseProducts}
           countProducts ={countProducts}
           setCountProducts ={setCountProducts}
           />  : userCart
				  }
      </>
    );
}

export default WebsiteCard;
