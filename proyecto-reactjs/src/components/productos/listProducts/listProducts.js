import "./listProducts.scss"
const List =({dataProducts,
    cartProducts,
    setCartProducts,
	total,
	settotal,
    countProducts,
    setCountProducts
}) =>{

    
    
    const onAddProduct = product => {                
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
		setCountProducts(countProducts + product.quantity);
		setCartProducts([...cartProducts, product]);
        
	};
    return(
        <div className="grid-container">
            {dataProducts.map(product =>(
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
            ))}
        </div>
    );



}

export default List;