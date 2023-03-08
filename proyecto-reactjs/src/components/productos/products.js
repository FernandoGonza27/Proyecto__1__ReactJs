
import axios from "axios";
import './products.scss'
import Card from "./cartProducts/cartProducts";
import List from "./listProducts/listProducts";
import { useEffect,useState } from "react";


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
			<div className="container">
	
				<div className="container__cart"  >
					<div className="container__close">							
							<button onClick={handleClose}>X</button>
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
				<div className="container__list">

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

				
			</div>						
		
	);
}

export default Products;
