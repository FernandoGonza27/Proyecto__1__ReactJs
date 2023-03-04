import "./product.scss"
import { useState } from "react";
const Product = ({product,bought}) =>{
    const [buy, setbuy] = useState(false)
    

    const buttonAdd =(        
        <button>Add</button>
    );
    const handleDelete = () =>  {
      setbuy(!buy);
    }  
    const buttonDelete =(        
        <button onClick={handleDelete}>Delete</button>
        
    );
   
    return (
        <>      
      <div
        className="product"
        key={product.id}
        //</>onClick={handleClick}
      >
        <div className="product__body">
          <div className="product__title">
            <h4>{product.title}</h4>
            <img          
            src={product.thumbnail}
            //onClick={handleClick}
            alt="cover"
            />
          </div>
          <a               
              target="_blank" 
              rel="noopener noreferrer"
              
          >
            <p>{product.description}</p>
          </a>
          <p>Price:{product.price}$</p>
          {
             buy ?  buttonAdd:buttonDelete
          }
          
        </div>
      </div>
      
      </>


    );

}

export default Product;