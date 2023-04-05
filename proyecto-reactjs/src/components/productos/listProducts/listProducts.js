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
        localStorage.setItem('products', JSON.stringify(docs));
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
            return setCartProducts([...products]);
            
        }
		settotal(total + product.price * product.quantity);        
		setCountProducts(countProducts + product.quantity );        
		setCartProducts([...cartProducts, product]);                      
        console.log(countProducts);
        
        
	};

    return(
        <div className="grid-container">
            {dataProducts ? 
            dataProducts.map(product =>(
                <div className="product" key={product.id}>                    
                    <img src={product.image} alt={product.name}/>                    
                    <div className="card__container">
                        <h2>{product.name}</h2>
                        <p>${product.price}</p>
                        <button className='btn__add__card' onClick={() => onAddProduct(product)} >
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