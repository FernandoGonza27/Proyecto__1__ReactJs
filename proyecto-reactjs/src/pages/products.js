import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import { saveWebsite, updateWebsite, deleteWebsite, getWebsites } from './../firebase/api';

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
    const [OpenMoadal, setOpenMoadal] = useState(false)

    const handleModal = () => {
        setOpenMoadal(!OpenMoadal);
    }

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

    const Modal = (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleModal} tabindex="1">&times;</span>
                <form aria-aria-required="true">
                    <div>
                        <label aria-labelledby="Label" for="color">Color: </label>
                        <input type="text" id="color" name="color" tabindex="0"></input>
                    </div>
                    <div>
                        <label for="name">Name: </label>
                        <input type="text" id="name" name="name" tabindex="0"></input>
                    </div>
                    <div>
                        <label for="name">Price: </label>
                        <input type="number" id="price" name="price" tabindex="0"></input>
                    </div>
                    <div>
                        <label for="name">Quantity: </label>
                        <input type="number" id="quantity" name="quantity" tabindex="0"></input>
                    </div>
                    <div>
                        <input type={"submit"} name={"sumit"} tabindex="0" onClick={addNewProduct}>
                            Add New Product
                        </input>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <div>
            <h1>Mis productos</h1>
            <button onClick={handleModal}>Agregar producto</button>
            <ul>
                {webProducts.map((product) => (
                    <li key={product.id}>
                        {product.name} ({product.price})
                        <button onClick={() => onDeleteProduct(product)}>Eliminar</button>
                        <button onClick={() => updateProduct(product)}>Editar</button>
                    </li>
                ))}
            </ul>
            {OpenMoadal && Modal}
        </div>
    );
}

export default Products;