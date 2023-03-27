 import "./cartProducts.scss"
 import { updateWebsite } from "../../../firebase/api";
 
 const Card = ({
	cartId,
    cartProducts,
    setCartProducts,
	total,
	settotal,
    countProducts,
    setCountProducts,
	userId
 }) =>{
    const collectionname1= "Carts";
    const onDeleteProduct = product => {
		const results = cartProducts.filter(
			item => item.id !== product.id
		);

		settotal(total - product.price * product.quantity);
		setCountProducts(countProducts - product.quantity);
		setCartProducts(results);
		saveProduct();
	};

    const onCleanCart = async()  => {
		setCartProducts([]);
		settotal(0);
		setCountProducts(0)
		const updatedcart = {
            discount: 0,
            products: [],
            total: 0,
            totalQuantity:0,
            userId: userId
        };
		 console.log(updatedcart);
         await updateWebsite(collectionname1,cartId, updatedcart);
	};
	const saveProduct =async ()=>{
        
        ///Formar el objeto cart con los estados del cart        
        console.log("pass");
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
	
    return(
        <>
            <div className="container-cart-products">
					{cartProducts.length ? (
						<>
							<div className='row-product'>
								{cartProducts.map(product => (
									<div className='cart-product' key={product.id}>
										<div className='info-cart-product'>
											<span className='cantidad-producto-carrito'>
												{product.quantity}
											</span>
											<p className='titulo-producto-carrito'>
												{product.name}
											</p>
											<span className='precio-producto-carrito'>
												${product.price}
											</span>
										</div>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='icon-close'
											onClick={() => onDeleteProduct(product)}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</div>
								))}
							</div>

							<div className='cart-total'>
								<h3>Total:</h3>
								<span className='total-pagar'>${total}</span>
							</div>

							<button className='btn-clear-all' onClick={onCleanCart}>
								Vaciar Carrito
							</button>
						</>
					) : (
						<p className='cart-empty'>El carrito está vacío</p>
					)}
				</div>

        </>
    );
 }

 export default Card;
