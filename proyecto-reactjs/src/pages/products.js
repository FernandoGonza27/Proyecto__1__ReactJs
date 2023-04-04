import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import { saveWebsite, updateWebsite, deleteWebsite, getWebsites } from './../firebase/api';
import AddProductModal from "./modal";
import "./Carts/product.scss"

const initialState = {
    color: "",
    image: "",
    name: "",
    price: 0,
    quantity: 0
};


const Products = () => {
    const [product, setProduct] = useState(initialState);
    const [webProducts, setwebProducts] = useState([]);
    const collection = "Products";
    const [showModal, setShowModal] = useState(false);

    const handleAddProduct = () => {
        setShowModal(true);
    };

    const handleSaveProduct = async () => {
        await saveWebsite(product, collection);
        setShowModal(false);
    };
    const handleModal = () => {
        setShowModal(!showModal);
    };

    const handleInputChange = ({ target: { name, value } }) =>
        setProduct({ ...product, [name]: value });

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
    }
    const updateProduct = async (updatedProduct, productId) => {
        ///Formar el objeto cart con los estados del cart        
        console.log(updatedProduct);
        await updateWebsite(collection, productId);
    }
    const addNewProduct = async () => {
        await saveWebsite(product, collection);
    }
    useEffect(() => {
        getProducts();
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            handleSaveProduct();
        }
    };

    const validateForm = () => {
        const { name, price, quantity } = product;
        if (!name || !price || !quantity) {
            alert('Por favor complete todos los campos obligatorios.');
            return false;
        }
        return true;
    };
    const Modal = () => {
        return (
            <div className="modal">
                <div className="modal__content">
                    <h2>Agregar Nuevo Producto</h2>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Detalles del Producto</legend>
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" id="name" name="name" value={product.name} onChange={handleInputChange} required maxLength="50" />
                            <label htmlFor="price">Precio:</label>
                            <input type="number" id="price" name="price" value={product.price} onChange={handleInputChange} required min="0" step="0.01" />
                            <label htmlFor="quantity">Cantidad:</label>
                            <input type="number" id="quantity" name="quantity" value={product.quantity} onChange={handleInputChange} required min="0" step="1" />
                        </fieldset>
                        <fieldset>
                            <legend>Otros Detalles</legend>
                            <label htmlFor="image">Imagen:</label>
                            <input type="text" id="image" name="image" value={product.image} onChange={handleInputChange} maxLength="200" />
                            <label htmlFor="color">Color:</label>
                            <input type="text" id="color" name="color" value={product.color} onChange={handleInputChange} maxLength="20" />
                        </fieldset>
                        <div className="modal__buttons">
                            <button className="button button--primary" type="submit">Guardar</button>
                            <button className="button" type="button" onClick={handleModal}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };


    return (
        <div className="grid-container">

            <h1>Mis Productos</h1>
            <div className="Modal">
                <button className="buttonADD" onClick={handleAddProduct}>Add new product</button>
            </div>
            {webProducts ?
                webProducts.map(product => (
                    <div className="product" key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <div className="card__container">
                            <h2>{product.name}</h2>
                            <p>${product.price}</p>
                            <button className="button" onClick={() => onDeleteProduct(product)}>Delete</button>
                            <button className="button" onClick={() => updateProduct(product)}>Edit</button>
                        </div>

                    </div>
                ))
                : <p>Loading.....</p>}
            {showModal && <Modal />}
        </div>
    );

}

export default Products;