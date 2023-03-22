import axios from "axios";
import { useEffect, useState } from "react";
import WebsiteCard from "../components/Carts/WebsiteCard";
import { getAuth} from "firebase/auth";
import "../components/Carts/cardsStyle.scss";
import { getWebsites, saveWebsite,getUserCarts } from "../firebase/api";
import { collection } from "firebase/firestore";



const Carts = () => {
	//const [data, setData] = useState(false);
	const [webCarts, setwebCarts] = useState([]);	
	const auth = getAuth();
    const userId = auth.currentUser.uid;

	const getCarts =async () =>{
		let collection ="Carts";
		const querySnapshotUser = await getUserCarts(collection,userId);
		const querySnapshot = await getWebsites(collection);
		// onGetLinks((querySnapshot) => {
		console.log(querySnapshotUser);
		const docs = [];
		querySnapshot.forEach((doc) => {
		  docs.push(	{ ...doc.data(), id: doc.id });
		});
		setwebCarts(querySnapshotUser);
		console.log(webCarts)
	}

	useEffect(() => {
		getCarts();
	}, []);
	const handleChoice = (cart) => {
		const newCarts = webCarts.filter(card => card.id != cart.id);
		setwebCarts(newCarts);
	}
	const addNewCart = async() =>{		
		const initialState = {
			discount: 0,
			products: [],
			total: 0,
			totalQuantity:0,
			userId:userId
		  };
		await saveWebsite(initialState);

	}
	const helper = (
		<div className="helper">
			<h2>You have no pending carts</h2>
		</div>
	);	
	
	if (webCarts.length != 0) {
		return (
			<div>
				<div className="cart__container">
					<div className="title-carts">
						<h2> Carts of User</h2>
					</div>
					<div className="title-carts">
						<button onClick={addNewCart}> new cart</button>
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