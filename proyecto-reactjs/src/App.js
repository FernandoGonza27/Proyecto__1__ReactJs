
import './App.css';
import Home from './pages/home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Contacts from './pages/contacts';
import Error from './pages/error';
import Products from './pages/products';
import Carts from './pages/carts';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <Error/>,
    children:[
      {
        path:"/contact",
        element :<Contacts/>
      },
      {
        path:"/products",
        element :<Products/>
      },
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