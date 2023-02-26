
import axios from "axios";
import './products.scss'

import { useEffect,useState } from "react";
//import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Products = ( products) => {
    const [data, setData] = useState(false);	
	const navigate = useNavigate();
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
	//falta la funcion de mostrar los productos que no son del cart 
	//ademas filtar los productos que ya estan el card para que no aparezcan
	const showProducts   =() =>{
		
	}
	const handleNavigate = () =>{
		navigate('/carts')
	  }

	return (
			
			<div>
				
				<p>hola</p>
				
				<div className='modal'>
					<div  className='modal__content'>
					
						<p>EN 30 SEGUNDOS SE APAGARA TU PC </p>
						<span className='close'>&times;</span>
					</div>
				</div>			
			</div>
		
	);
}

export default Products;

/*
	
			<button onClick={handleNavigate}>Back the cardts</button>
			<div className="list__cart__products">
				<ul>				
					{products.map((item, index) => (
						<li key={index}>{item.title}</li>										
					))}

				</ul>

			</div>
			
			<div>
				<button onClick={handelAdd}>Add to the cart</button>
				<button onClick={handleDelete}>Delete to de cart</button>
			</div>		
*/
