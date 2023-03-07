
const List =({dataProducts,
    cartProducts,
    setCartProducts,
	total,
	settotal,
    countProducts,
    setCountProducts
}) =>{

    const convertProduct =(product) =>{
        const cardProduct ={
            "id": product.id,
            "title": product.title,
            "price": product.price,
            "quantity": 1,
            //"total": 100,
            //"discountPercentage": 12.05,
            //"discountedPrice": 88
        };

        return cardProduct;
    }
    
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
        <div>
            {dataProducts.map(product =>(
                <div key={product.id}>
                    <figure>
                        <img src={product.thumbnail} alt={product.title}/>
                    </figure>
                    <div>
                        <h2>{product.title}</h2>
                        <p>${product.price}</p>
                        <button onClick={() => onAddProduct(convertProduct(product))} >
                            Add to de Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );



}

export default List;