
import "./cardsStyle.scss"
import { useState } from "react";
import List from "../productos/listProducts/listProducts";
import Card from "../productos/cartProducts/cartProducts";

const WebsiteCard = ({cart,handleChoice,userId}) => {    
    const [cartProducts, setCartProducts] = useState(cart.products);
    const [total, settotal] = useState(cart.total)    
    const [cartSelected, setcartSelected] =useState(false);
    const [countProducts, setCountProducts] = useState(3)

 
    const handleCloseProducts= () =>{
		  setcartSelected(!cartSelected);
	  }
    const handleDelete = () =>{
      handleChoice(cart);
    }

    const userCart =(
      <div
        className="card"
        key={cart.id}        
      >
        <div className="card__body">
          <div className="card__title">
            <h4>Id the Cart :{cart.id}</h4>           
            <button onClick={handleDelete}>X</button>
          </div>
          <p>Total of quantity is{countProducts}</p>    
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

    const viewDataCart=(
      <div>
        <button onClick={handleCloseProducts}>Close</button>
        <section>
          <Card
              cartId={cart.id}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              total={total}
              settotal={settotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts}
              userId={userId}
            />
        </section>      
        <section>
          <List							
                cartId={cart.id}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                total={total}
                settotal={settotal}
                countProducts={countProducts}
                setCountProducts={setCartProducts}
                userId={userId}
          />
        </section>
      </div>
    );
    return (
      <>            
        {cartSelected ? viewDataCart  : userCart}
      </>
    );
}

export default WebsiteCard;
