import axios from "axios";
import { useEffect,useState } from "react";
import WebsiteCard from "../components/Carts/WebsiteCard";
import Products from "../components/productos/products";



const Carts = () => {
    const [data, setData] = useState(false);
    const [webCarts, setwebCarts] = useState([]);
	//const [webProducts, setwebProducts] = useState([]);
	//const [cartSelected, setcartSelected] =useState(false);
	const [userId, setuserId] = useState(0)
    //let userId =1;

	//const user =localStorage.getItem('account');
	//const userId = JSON.parse(user);
	//console.log(user1.userId);
	const getUser= () => {
		const user =localStorage.getItem('account');
		setuserId(JSON.parse(user).userId);
	}

	useEffect(() => {  		
		axios
			.get("https://dummyjson.com/carts")
			.then(function (response) {
				// handle success				
				setData(response.data.carts);
                

			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});	
		
					   
	}, []);
	
	useEffect(() => {
		getUser();			  
		findCartOfUser();	  
	}, [userId])
	
	
	
	
	console.log(userId);
	
    const findCartOfUser = () =>{    
		const carts =[];    
		//const carts2 = data.find((cart => cart.userId === userId));
		//console.log(carts2);
		for (let index = 0; index < data.length; index++) {						
			const cart = 	data[index];
			cart.userId === userId ?  carts.push(cart) :console.log("");				
		}  
		
		setwebCarts(carts);       
		//console.log(webCarts);        
    }
	const handleChoice = (cart) =>{
		console.log(cart);
		const newCarts= webCarts.filter(card => card.id != cart.id);
		//console.log(newCarts);
		setwebCarts(newCarts);
	}
	/*
		const handleProducts = (cart) =>{
		console.log(cart);		
		setwebProducts(cart.products);
		setcartSelected(!cartSelected);
		console.log(cartSelected);
		
	}
	*/
	//const handleCloseProducts= () =>{
	//	setcartSelected(!cartSelected);
	//}

	
	//funcion de agregar el producto al cart 
	return (
		<div>
			<button onClick={findCartOfUser}>hola</button>			
			<h2>Carts of User </h2>
			<div className="card-grid">				
				{
					webCarts.map(cart => (
					<WebsiteCard 
						key={cart.id} 
						cart={cart} 
						handleChoice={handleChoice}
						//handleProducts={handleProducts}
					/>
					))
				}
				
				
			</div>
		</div>
	);
}

export default Carts;