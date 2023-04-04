import { useState } from "react";

const AddProductModal = ({ onSave }) => {

    const initialState = {
        color: "",
        image: "",
        name: "",
        price: 0,
        quantity: 0
    };

  const [product, setProduct] = useState(initialState);

  const handleInputChange = ({ target: { name, value } }) =>
    setProduct({ ...product, [name]: value });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(product);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Color:
            <input
              type="text"
              name="color"
              value={product.color}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Image:
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
