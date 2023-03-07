
import './App.css';
import Home from './pages/home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from './pages/error';
//import Products from './components/products/products';
import Carts from './pages/carts';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <Error/>,
    children:[
      {
        path:"/carts",
        element :<Carts/>
      }
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />

  );
}

export default App;