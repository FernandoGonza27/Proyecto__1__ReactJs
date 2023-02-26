
import axios from "axios";
import './products.scss'
import Close from "../buttons/buttonClose";

import { useEffect,useState } from "react";
//import { useLocation } from "react-router-dom";

import Product from "./product";
const Products = ({products,handleCloseProducts}) => {
    const [data, setData] = useState(false);	
	
	//const location = useLocation();
	//const products =location.state.products;
	//console.log(products);
	//hook useEffect
	useEffect(() => {
		axios
			.get("https://dummyjson.com/products")
			.then(function (response) {
								
				setData(response.data.products);
			})
			.catch(function (error) {
				
				console.log(error);
			});
	}, []);

	const handelAdd  =() =>{

	}
	const handleDelete  =() =>{
		
	}

	const handleClose = () =>{
		handleCloseProducts();
	}

	return (
										
				<div className='container'>
					<div  className='container__products'>
					
						{products.map((item) => (
							//<li key={index}>{item.title}</li>										
							<Product product={item} bought={true} />
						))}
						<div className="container__close">
							<Close close={handleClose} />
						</div>
					</div>
					<div  className='container__products'>
					
					</div>
				</div>			
			
		
	);
}

export default Products;

/*
	
			<button onClick={handleNavigate}>Back the cardts</button>
			<div className="list__cart__products">
				<ul>				
					{data.map((item) => (
							//<li key={index}>{item.title}</li>										
							<Product product={item} bought={false} />
					))}

				</ul>

			</div>
			
			<div>
				<button onClick={handelAdd}>Add to the cart</button>
				<button onClick={handleDelete}>Delete to de cart</button>
			</div>		
*/
