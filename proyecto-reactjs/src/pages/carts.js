import axios from "axios";
import { useEffect,useState } from "react";
import WebsiteCard from "../components/Carts/WebsiteCard";




const Carts = () => {
    //const [data, setData] = useState(false);
    const [webCarts, setwebCarts] = useState([]);
	const user =localStorage.getItem('account');		
	let userId=JSON.parse(user).userId;

	useEffect(() => {  		
		axios
			.get(`https://dummyjson.com/carts/user/${userId}`)
			.then(function (response) {			
				setwebCarts(response.data.carts);
                

			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});	
		
					   
	}, []);
	const handleChoice = (cart) =>{
		const newCarts= webCarts.filter(card => card.id != cart.id);		
		setwebCarts(newCarts);
	}
	const helper =(
		<div className="helper">
			<h2>You have no pending carts</h2>
		</div>
	);
	
	
	console.log(webCarts.length);
	console.log(webCarts);
	if(webCarts.length != 0){
		return (
			<div >					
				<h2>Carts of User </h2>			
				<div className="card-grid">	
				
					
							
					{	
						webCarts ? 					
							webCarts.map(cart => (
								<WebsiteCard 
									key={cart.id} 
									cart={cart} 
									handleChoice={handleChoice}						
								/>
								
							))
						
						:<p>Loading....</p>
						
					}								
				</div>
			</div>
		);
	}else{
		 return helper;
		
	}
	
}

export default Carts;