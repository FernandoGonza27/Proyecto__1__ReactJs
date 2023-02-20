
import axios from "axios";
import { useEffect,useState } from "react";

import Spiner from "../components/loading/spiner";
const Products = () => {
    const [data, setData] = useState(false);

	//hook useEffect
	useEffect(() => {
		//libreria externa, se instala: npm i axios.
		// pueden ver documentacion en: https://www.npmjs.com/package/axios
		axios
			.get("https://dummyjson.com/products")
			.then(function (response) {
				// handle success
				console.log(response.data.products);
				setData(response.data.products);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	}, []);

	return (
		<div>
			Products
						
		</div>
	);
}

export default Products;