
import "./WebsiteCard.scss"
import { useState } from "react";
import List from "../productos/listProducts/listProducts";
import Card from "../productos/cartProducts/cartProducts";
import { updateWebsite } from "../../firebase/api";

const WebsiteCard = ({cart,state,setState,handleChoice,userId}) => {    
    const [cartProducts, setCartProducts] = useState(cart.products);
    const [total, settotal] = useState(cart.total)    
    const [cartSelected, setcartSelected] =useState(false);
    const [countProducts, setCountProducts] = useState(0)
    const collectionname1= "Carts";
 
    const handleCloseProducts= () =>{      
		  setcartSelected(!cartSelected);
      saveProduct();
      setState("");
	  }
    const handleChoiceProducts= () =>{      
		  setcartSelected(!cartSelected);
      setState("__close");
	  }
    const handleDelete = () =>{
      handleChoice(cart);
    }
    const saveProduct =async ()=>{                 
      const updatedcart = {
          discount: 0,
          products: cartProducts,
          total: total,
          totalQuantity:countProducts,
          userId: userId
      };      
       await updateWebsite(collectionname1,cart.id, updatedcart);
    }

    

    const userCart =(
      <div
        className={"card"+state}
        key={cart.id}   
      
      >        
        <div className="card__body">
          <div className="card__title">
            <h4>Id the Cart :{cart.id}</h4>           
            <button onClick={handleDelete}>X</button>
          </div>
          <div>
            <p>Total of quantity is{countProducts}</p>    
            <p>Total payable is ${total}</p>          
            <a               
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleChoiceProducts}
            >
              Go to the products
            </a>
          </div>
        </div>
      </div>
    );

    const viewDataCart=(
      <div className="box__container">        
        <div className="box__container____children"> 
          <svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='box__container__button'
                      onClick={handleCloseProducts}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
					</svg>                        
          <Card
              saveProduct={saveProduct}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              total={total}
              settotal={settotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts}
              userId={userId}
            />
        </div>              
          <List							
                saveProduct={saveProduct}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                total={total}
                settotal={settotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
                userId={userId}
          />        
      </div>
    );
    return (
      <>            
        {cartSelected ? viewDataCart  : userCart}
      </>
    );
}

export default WebsiteCard;
