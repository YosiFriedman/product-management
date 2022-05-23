import './App.css';
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import Home from './Screens/Home'
import NavBar from './Components/NavBar'
import EditProduct from './Components/EditProduct'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
    <ToastContainer/>
      <NavBar/>
      <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route  path='/edit/:id' element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  
    </>
  );
}

export default App;
