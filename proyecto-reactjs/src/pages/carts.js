import axios from "axios";
import { useEffect, useState } from "react";
import WebsiteCard from "../components/Carts/WebsiteCard";
import { getAuth} from "firebase/auth";
import "../components/Carts/cardsStyle.scss";
import { getWebsites } from "../firebase/api";
import { collection } from "firebase/firestore";



const Carts = () => {
	//const [data, setData] = useState(false);
	const [webCarts, setwebCarts] = useState([]);	
	const auth = getAuth();
    const userId = auth.currentUser;

	const getCarts =async () =>{
		let collection ="Carts";
		const querySnapshot = await getWebsites(collection);
		// onGetLinks((querySnapshot) => {
		const docs = [];
		querySnapshot.forEach((doc) => {
		  docs.push({ ...doc.data(), id: doc.id });
		});
		setwebCarts(docs);

	}

	useEffect(() => {
		getCarts();
	}, []);
	const handleChoice = (cart) => {
		const newCarts = webCarts.filter(card => card.id != cart.id);
		setwebCarts(newCarts);
	}
	const helper = (
		<div className="helper">
			<h2>You have no pending carts</h2>
		</div>
	);


	console.log(webCarts.length);
	console.log(webCarts);
	if (webCarts.length != 0) {
		return (
			<div>
				<div className="cart__container">
					<div className="title-carts">
						<h2> Carts of User</h2>
					</div>
					<div className="title-carts">
						<button> new cart</button>
					</div>
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
									
								: <p>Loading....</p>

						}
					</div>
				</div>
			</div>
		);
	} else {
		return helper;

	}

}

export default Carts;