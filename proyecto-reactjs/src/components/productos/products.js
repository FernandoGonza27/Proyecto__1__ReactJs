
import axios from "axios";
import './products.scss'
import Card from "./cartProducts/cartProducts";
import List from "./listProducts/listProducts";
import { useEffect, useState } from "react";
import { getWebsites } from "../../firebase/api";

const Products = ({
	cartId,
	cartProducts,
	setCartProducts,
	total,
	settotal,
	handleCloseProducts,
	countProducts,
	setCountProducts,
	userId

}) => {
	const [data, setData] = useState(false);
	const getProducts =async () =>{
		let collection ="Products"
		const querySnapshot = await getWebsites(collection);
		// onGetLinks((querySnapshot) => {
		const docs = [];
		querySnapshot.forEach((doc) => {
		  docs.push({ ...doc.data(), id: doc.id });
		});
		setData(docs);

	}

	useEffect(() => {
		getProducts();
	}, []);

	const handleClose = () => {
		handleCloseProducts();
	}

	return (
		<div>
			<div className="close">
				<button onClick={handleClose}>Close</button>
			</div>
			<div className="container">

				<div className="container__cart"  >
					<Card
						cartId={cartId}
						cartProducts={cartProducts}
						setCartProducts={setCartProducts}
						total={total}
						settotal={settotal}
						countProducts={countProducts}
						setCountProducts={setCountProducts}
						userId={userId}
					/>
				</div>
				<div className="container__list">

					{
						data ? <List
							dataProducts={data}
							cartId={cartId}
							cartProducts={cartProducts}
							setCartProducts={setCartProducts}
							total={total}
							settotal={settotal}
							countProducts={countProducts}
							setCountProducts={setCartProducts}
							userId={userId}
						/> : <p>Loading.....</p>
					}
				</div>


			</div>
		</div>

	);
}

export default Products;
