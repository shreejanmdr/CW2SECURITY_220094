import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginScreen from "./pages/login/Loginpage";
import RegisterScreen from "./pages/register/Registerpage";
import UserRoutes from "./protected_routes/UserRoutes";
import AdminDashboard from "./pages/admin/admin_dashboard/AdminDashboard";
import UpdateProduct from "./pages/admin/update_product/UpdateProduct";
import AdminRoutes from "./protected_routes/AdminRoutes";
import Profile from "./pages/product/Productpage";
import Sidebar from "./components/sidebar/sidebar";
import DefaultRoutes from "./protected_routes/DefaultRoutes";

import { addToCartApi, deleteCartApi, getAllCartApi, updateCartApi } from '././apis/Api';
import React, { useEffect, useState } from "react";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import Footer from "./components/footer/Footer";
import Productpage from "./pages/product/Productpage";
import Contact from "./pages/contact/Contact";
import ViewContact from "./pages/admin/view_contact/ViewContact";
import ViewProduct from "./pages/view_product/ViewProduct";
import Favourites from "./pages/favourites/Favourites";
import OrderList from "./pages/order_list/OrderList";
import MyCart from "./pages/myCart/MyCart";


function App() {
  const [cart, setCart] = useState([]);

  //const showFooter = !["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getAllCartApi();
      setCart(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    }
  };

  // In App.js

  const addToCart = async (product) => {
    try {
      const existingItem = cart.find((item) => item.productId === product._id);
      if (existingItem) {
        await updateCartApi(existingItem._id, {
          quantity: existingItem.quantity + 1,
        });
      } else {
        await addToCartApi({
          productId: product._id,
          quantity: 1,
          total: product.productPrice, // Add the total price
        });
      }
      await fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      await updateCartApi(id, { quantity: newQuantity });
      await fetchCart();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await deleteCartApi(id);
      await fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };  
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route element={<DefaultRoutes/>}>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Route>

        {/* Admin Routes */}
        
        <Route element={<AdminRoutes />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path='/admin/update/:id' element={<UpdateProduct/>} />
          <Route path="/contactus" element={<ViewContact />} />
        </Route>
        

        {/* User Routes */}
        <Route element={<UserRoutes />}>
          <Route path="/product" element={<Productpage/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/logout" element={() => {localStorage.removeItem('user'); window.location.reload()}} />
          <Route path="/cart" element={<cart/>} />
        </Route>
        <Route path='/forgot_password' element={<ForgotPassword/>} />
        <Route path="/view_product/:id" element={<ViewProduct />}/>
        
          <Route path='/profile' element={<Profile />} />
          
          <Route path='/my_cart' element={<MyCart/>} />
      
          
          <Route path="/contactus" element={<ViewContact />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/' element={<Homepage cart={cart} addToCart={addToCart} />} />
          <Route path='/cart' element={<MyCart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
          <Route path="/favourites" element={<Favourites/>} />
          <Route path="/orderlist" element={<OrderList/>} />     
   
          
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
