
import './App.css';
import Home from './pages/home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from './pages/error';
//import Products from './components/products/products';
import Carts from './pages/carts';
import Products from './pages/products';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <Error/>,
    children:[
      {
        path:"/carts",
        element :<Carts/>
      },
      {
        path:"/products",
        element :<Products/>
      },
    ]
  },
]);

function App() {
  return (    
    <RouterProvider router={router} />
    
  );
}

export default App;