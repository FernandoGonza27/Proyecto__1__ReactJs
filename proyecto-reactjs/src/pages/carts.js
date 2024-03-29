import axios from "axios";
import { useEffect, useState } from "react";
import WebsiteCard from "../components/Carts/WebsiteCard";
import { getAuth} from "firebase/auth";
import { getWebsites, saveWebsite,getUserCarts,deleteWebsite } from "../firebase/api";
import "./Carts/carts.scss"
import { collection } from "firebase/firestore";


const Carts = () => {
	//const [data, setData] = useState(false);
	const [webCarts, setwebCarts] = useState([]);	
	const [state, setState] = useState("")	
	const user = JSON.parse(localStorage.getItem("usuario"));
	let collection ="Carts;"
	const getCarts =async () =>{		
		const querySnapshotUser = await getUserCarts(collection,user.uid);		
		const querySnapshot = await getWebsites(collection);		
			/* 	onGetLinks((querySnapshot) => {
			const docs = [];
			querySnapshot.forEach((doc) => {
			docs.push(	{ ...doc.data(), id: doc.id });
			});
			*/			
		setwebCarts(querySnapshotUser);	
		console.log(webCarts.length);	
	}

	useEffect(() => {
		getCarts();
	}, []);
	const handleChoice = async(cart) => {
		const newCarts = webCarts.filter(card => card.id != cart.id);
		await deleteWebsite(cart.id,collection);
		setwebCarts(newCarts);
		getCarts();
	}
	const addNewCart = async() =>{		
		const initialState = {
			discount: 0,
			products: [],
			total: 0,
			totalQuantity:0,
			userId:user.uid
		};
		await saveWebsite(initialState,collection);
		getCarts();

	}	
		return (
			<div className="container">
				<div className={"cart__container"}>
					<div className="cart__container__header">
						<div className={"title-carts"+state}>
							<h1> Carts of User</h1>
						</div>
						<div className={"cart__container__header__button"+state}>
							<button onClick={addNewCart}> new cart</button>
						</div>
					</div>
					<div className={"wrapper__carts"+state}>						
						{
							webCarts ?
							webCarts.map(cart => (																	
								<WebsiteCard
									key={cart.id}
									cart={cart}		
									state={state}							
									setState={setState}
									handleChoice={handleChoice}
									userId={user.uid}
								/>																
							))
									
								: <p>Loading....</p>

						}
					</div>
				</div>
			</div>
		);
	

}

export default Carts;
