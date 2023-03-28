import "./listProducts.scss"
import { updateWebsite } from "../../../firebase/api";
import { useState,useEffect } from "react";
import { getWebsites } from "../../../firebase/api";
const List =({
    saveProduct,
    cartProducts,
    setCartProducts,
	total,
	settotal,
    countProducts,
    setCountProducts,    
    //agregar el parametro de id del cart para actualizar
}) =>{
    const [dataProducts, setDataProducts] = useState(false);
	const getProducts =async () =>{
		let collection ="Products"
		const querySnapshot = await getWebsites(collection);
		// onGetLinks((querySnapshot) => {
		const docs = [];
		querySnapshot.forEach((doc) => {
		  docs.push({ ...doc.data(), id: doc.id });
		});
		setDataProducts(docs);

	}

	useEffect(() => {
		getProducts();
	}, []);
    
    
    const onAddProduct = product => {   
        //arreglar las cantidades del producto al igaul que el guardado             
        if (cartProducts.find(item => item.id === product.id)) {
            const products = cartProducts.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            settotal(total + product.price *  product.quantity);        
            setCountProducts(countProducts + product.quantity);
            console.log(countProducts+" "+ product.quantity)
            console.log(countProducts + product.quantity)
            console.log(countProducts);
            //saveProduct();
            console.log("pass2")
            return setCartProducts([...products]);
            
        }
		settotal(total + product.price * product.quantity);        
		setCountProducts(countProducts + product.quantity );        
		setCartProducts([...cartProducts, product]);              
        //saveProduct();
        console.log(countProducts);
        console.log("pass1")
        
	};
    /*
        const saveProduct =async ()=>{
        const collectionname1= "Carts";
        ///Formar el objeto cart con los estados del cart                
        const updatedcart = {
            discount: 0,
            products: cartProducts,
            total: total,
            totalQuantity:countProducts,
            userId: userId
        };
        console.log(updatedcart);
         await updateWebsite(collectionname1,cartId, updatedcart);
    }
    */
    
    return(
        <div className="grid-container">
            {dataProducts ? 
            dataProducts.map(product =>(
                <div className="grid-item1" key={product.id}>
                    <figure>
                        <img src={product.image} alt={product.name}/>
                    </figure>
                    <div>
                        <h2>{product.name}</h2>
                        <p>${product.price}</p>
                        <button className='btn-clear-all' onClick={() => onAddProduct(product)} >
                            Add to de Cart
                        </button>
                    </div>
                </div>
            ))
			: <p>Loading.....</p>}
            
        </div>
    );



}

export default List;