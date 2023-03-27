import { async } from "@firebase/util";
import { useEffect } from "react";

const initialState = {
    url: "",
    name: "",
    description: "",
  };


const Products = () =>{
    const [product, setProduct] = useState(initialState);
    const [webProducts,setwebProducts] = useState([]);
    const collection = "Products";

     useEffect(() => {
        getProducts;
        
     }, [])
     
    const handleInputChange = ({ target: { name, value } }) =>
        setProduct({ ...product, [name]: value });

     const getProducts =async () =>{						
		const querySnapshot = await getWebsites(collection);					
        const docs = [];
        querySnapshot.forEach((doc) => {
        docs.push(	{ ...doc.data(), id: doc.id });
        });					
		setwebProducts(docs);			
	}

    const onDeleteProduct= async(product) =>{
        await deleteWebsite(product.id,collection);
    }
    const updateProduct =async (updatedProduct,productId)=>{
        ///Formar el objeto cart con los estados del cart        
		 console.log(updatedProduct);
         await updateWebsite(collection,productId, updaupdatedProducttedcart);
    }
    const addNewProduct = async() =>{				
		await saveWebsite(product,collection);
		getCarts();

	}


    return(
        <div>

        </div>
    );
}

export default Products;