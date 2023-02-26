
import "./cardsStyle.scss"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Close from "../buttons/buttonClose";
import Products from "../productos/products";

    const WebsiteCard = ({cart,handleChoice}) => {
    const navigate = useNavigate();
    const [webProducts, setwebProducts] = useState([]);
    const [cartSelected, setcartSelected] =useState(false);

    const handleNavigate = () =>{
      let products =cart.products;
      navigate('/products',{state:{products}})
      
    }
    const handleSelect = () =>{
      //handleProducts(cart);
      console.log(cart);		
		  setwebProducts(cart.products);
		  setcartSelected(!cartSelected);
		  console.log(cartSelected);
      
    }
    const handleCloseProducts= () =>{
		  setcartSelected(!cartSelected);
	  }
    const handleDelete = () =>{
      handleChoice(cart);
    }

    const deleteProduct = (product) =>{
      console.log(product);
      const newProducts= webProducts.filter(product => product.id != product.id);
      console.log(newProducts);
      setwebProducts(newProducts);
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
               <Close close={handleDelete}/>
            </button>
          </div>
          <p>Total payable is {cart.total}$</p>
          <a               
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleSelect}
          >
            Go to the products
          </a>
          {
					cartSelected ?  <Products
					 products={webProducts} 
					 handleCloseProducts={handleCloseProducts}
					 />  : ""
				  }
        </div>
      </div>
      
      </>
    );
}

export default WebsiteCard;
