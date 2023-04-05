import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import { saveWebsite, updateWebsite, deleteWebsite, getWebsites } from './../firebase/api';
import "./Carts/product.scss"

const initialState = {
    color: "",
    image: "",
    name: "",
    price: 0,
    quantity: 1
};


const Products = () => {
    const [productIdEdit, setproductIdEdit] = useState("")
    const [product, setProduct] = useState(initialState);
    const [productEdict, setProductEdict] = useState(initialState);
    const [webProducts, setwebProducts] = useState([]);
    const collection = "Products";
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const handleAddProduct = () => {
        setShowModal(true);
    };

    const handleSaveProduct = async () => {
        await saveWebsite(product, collection);
        setShowModal(false);
        getProducts();
    };
    const handleModal = () => {
        setShowModal(!showModal);
    };

    const handleInputChange = ({ target: { name, value } }) =>
        setProduct({ ...product, [name]: value });
     

    const handleInputChangeEdit = ({ target: { name, value } }) =>
        setProductEdict({ ...productEdict, [name]: value });

    const getProducts = async () => {
        const querySnapshot = await getWebsites(collection);
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
        });
        setwebProducts(docs);
    }

    const onDeleteProduct = async (product) => {
        await deleteWebsite(product.id, collection);
        getProducts();
    }
    const updateProduct = async () => {
        ///Formar el objeto cart con los estados del cart        
        console.log(productEdict);        
        await updateWebsite(collection,productIdEdit,productEdict);
        getProducts();
        
    }

    useEffect(() => {
        getProducts();
    }, [])

    const handleSubmitEdit = (event) => {
        event.preventDefault();                
        
        updateProduct();
        setShowModalEdit(!showModalEdit)
        
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            handleSaveProduct();
        }
    };


    const validateForm = () => {
        const { name, price} = product;
        if (!name || !price ) {
            alert('Por favor complete todos los campos obligatorios.');
            return false;
        }
        return true;
    };

    const editProduct =(product) =>{ 
        console.log(product);
        setShowModalEdit(!showModalEdit);
        setProductEdict(product);
        setproductIdEdit(product.id);
        
    }
    const Modal = () => {
        return (
            <div className="modal">
                <div className="modal__content">
                    <h2>Add new product</h2>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Detalles del Producto</legend>
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" id="name" name="name" value={product.name} onChange={handleInputChange} required maxLength="50" />
                            <label htmlFor="price">Precio:</label>
                            <input type="number" id="price" name="price" value={product.price} onChange={handleInputChange} required min="0" step="5" />                            
                        </fieldset>
                        <fieldset>
                            <legend>Otros Detalles</legend>
                            <label htmlFor="image">Imagen:</label>
                            <input type="text" id="image" name="image" value={product.image} onChange={handleInputChange} maxLength="200" />
                            <label htmlFor="color">Color:</label>
                            <input type="text" id="color" name="color" value={product.color} onChange={handleInputChange} maxLength="20" />
                        </fieldset>
                        <div className="modal__buttons">
                            <button className="button button--primary"  type="submit">Guardar</button>
                            <button className="button" type="button" onClick={handleModal}>Cancelar</button>

                        </div>
                    </form>
                </div>
            </div>
        );
    };
    const ModalEdit = () => {        
        return (
            <div className="modal">
                <div className="modal__content">
                    <h2>Edit product</h2>
                    <form onSubmit={handleSubmitEdit}>
                        <fieldset>
                            <legend>Detalles del Producto</legend>
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" id="name" name="name" value={productEdict.name} onChange={handleInputChangeEdit}  />
                            <label htmlFor="price">Precio:</label>
                            <input type="number" id="price" name="price" value={productEdict.price} onChange={handleInputChangeEdit} />                            
                        </fieldset>
                        <fieldset>
                            <legend>Otros Detalles</legend>
                            <label htmlFor="image">Imagen:</label>
                            <input type="text" id="image" name="image" value={productEdict.image} onChange={handleInputChangeEdit} />
                            <label htmlFor="color">Color:</label>
                            <input type="text" id="color" name="color" value={productEdict.color} onChange={handleInputChangeEdit}/>
                        </fieldset>
                        <div className="modal__buttons">
                            <button className="button button--primary"  type="submit">Guardar</button>
                            <button className="button" type="button" onClick={() => setShowModalEdit(!showModalEdit)}>Cancelar</button>

                        </div>
                    </form>
                </div>
            </div>
        );
    };


    return (
        <div className="container">
            <div className="header_products">                
                <h1>Mis Productos</h1>
                <button className="buttonADD" onClick={handleAddProduct}>Add new product</button>
            </div>
            <div className="container__grid__products">            
            {webProducts ?
                webProducts.map(product => (
                    <div className="product" key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <div className="card__container">
                            <h2>{product.name}</h2>
                            <p>${product.price}</p>
                            <button className="button" onClick={() => onDeleteProduct(product)}>Delete</button>
                            <button className="button"  onClick={() => editProduct(product)} >Edit</button>
                        </div>

                    </div>
                ))
                : <p>Loading.....</p>}
            {showModal && <Modal />}
            {showModalEdit && <ModalEdit/>}
        </div>
        </div>
        
    );

}

export default Products;