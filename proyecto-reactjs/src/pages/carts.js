import axios from "axios";
import { useEffect,useState } from "react";
import WebsiteCard from "../components/Carts/WebsiteCard";


const Carts = () => {
    const [data, setData] = useState(false);
    const [webCarts, setwebCarts] = useState([]);
    let userId =56;
	//hook useEffect

    
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
		findCartOfUser();		
	}, [userId])
	


    const findCartOfUser = () =>{    
		const carts =[];    
		for (let index = 0; index < data.length; index++) {			
			//selectCardForUser(data[index]);
			const cart = 	data[index];
			cart.userId === userId ?  carts.push(cart) :console.log("");				
		}  
		
		setwebCarts(carts);       
		console.log(webCarts);        
    }
	const handleChoice = (cart) =>{
		console.log(cart);
		const newCarts= webCarts.filter(card => card.id != cart.id);
		console.log(newCarts);
		setwebCarts(newCarts);
	}
	return (
		<div>
			<button onClick={findCartOfUser}>hola</button>			
			<h2>Carts of User </h2>
			<div className="card-grid">				
				{
					webCarts.map(cart => (
					<WebsiteCard key={cart.id} cart={cart} handleChoice={handleChoice}/>
					))
				}
			</div>
		</div>
	);
}

export default Carts;