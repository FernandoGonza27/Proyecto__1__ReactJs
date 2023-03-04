
import axios from "axios";
import './products.scss'
import Close from "../buttons/buttonClose";
import Card from "./cartProducts";
import List from "./listProducts";
import { useEffect,useState } from "react";
//import { useLocation } from "react-router-dom";

const Products = ({
	cartProducts,
    setCartProducts,
	total,
	settotal,
	handleCloseProducts,
	countProducts,
	setCountProducts

}) => {
    const [data, setData] = useState(false);	
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
	

	const handleClose = () =>{
		handleCloseProducts();
	}

	return (										
				<div className='container'>
	
					<div  className='container__products'>
					<div className="container__close">
							<Close close={handleClose} />
					</div>
					<Card
						cartProducts={cartProducts}
						setCartProducts={setCartProducts}
						total={total}
						settotal={settotal}	
						countProducts ={countProducts}
           				setCountProducts ={setCountProducts}																			
					/>
					
															
					</div>
					{
						data ? <List
						dataProducts={data}
						cartProducts={cartProducts}
						setCartProducts={setCartProducts}
						total={total}
						settotal={settotal}
						countProducts ={countProducts}
           				setCountProducts ={setCartProducts}				
						/> :<p>Loading.....</p>
					}	

				
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
