import React, { useEffect, useState } from "react";
import CartProduct from "../components/CartCard";
import {
  Divider,
  Typography,
  Container,
  Grid,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { getCartByIdApi, deleteProductFromCartApi, createOrderApi } from "../apis/Api";
import Navbar from "../components/Hearder";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const fetchCartItems = async () => {
    try {
      if (!userId) {
        throw new Error("User ID not found.");
      }

      const response = await getCartByIdApi(userId);
      setCartItems(response.data.cart.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  const changeQuantity = (newQuantity, index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    // Recalculate total price when quantity changes
    calculateTotalPrice(updatedCart);
  };

  const removeItem = async (index) => {
    try {
      if (!userId) {
        throw new Error("User ID not found.");
      }

      const productId = cartItems[index].product._id;
      await deleteProductFromCartApi(userId, productId);
      const updatedCart = [...cartItems];
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
      // Recalculate total price when item is removed
      calculateTotalPrice(updatedCart);
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const calculateTotalPrice = (cart) => {
    const totalPrice = cart.reduce((total, item) => {
      if (selectedProducts.includes(item.product._id)) {
        return total + item.product.productPrice * item.quantity;
      }
      return total;
    }, 0);
    return totalPrice.toFixed(2);
  };

  const calculateDiscountPrice = (totalPrice) => {
    const discount = totalPrice * 0.2; // 20% discount
    return (totalPrice - discount).toFixed(2);
  };

  const calculateTotalAmount = (cart) => {
    const totalPrice = parseFloat(calculateTotalPrice(cart));
    return calculateDiscountPrice(totalPrice);
  };

  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleProceedToCheckout = async () => {
    const selectedCartItems = cartItems.filter((item) =>
      selectedProducts.includes(item.product._id)
    );

    const order = {
      userId: userId,
      products: selectedCartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      })),
      totalAmount: calculateTotalAmount(selectedCartItems),
    };

    try {
      const res = await createOrderApi(order);
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        // Fetch the cart items again after the order is created
        fetchCartItems();
      }
    } catch (err) {
      console.log(err);
      toast.error("Internal Server Error!");
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Navbar />
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom style={{ fontWeight: "bold" }}>
          Your Cart
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper>
              {cartItems.map((item, index) => (
                <CartProduct
                  key={index}
                  product={item}
                  quantity={item.quantity}
                  changeQuantity={(newQuantity) => changeQuantity(newQuantity, index)}
                  removeItem={() => removeItem(index)}
                  handleCheckboxChange={() => handleCheckboxChange(item.product._id)}
                />
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom style={{ fontWeight: "bold" }}>
                Cart Summary
              </Typography>
              <Divider />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Total Price: <span style={{ fontWeight: "normal" }}>Rs.{calculateTotalPrice(cartItems)}</span>
                </Typography>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Discounted Price: <span style={{ fontWeight: "normal" }}>Rs.{calculateDiscountPrice(parseFloat(calculateTotalPrice(cartItems)))}</span>
                </Typography>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Total Amount: <span style={{ fontWeight: "normal" }}>Rs.{calculateTotalAmount(cartItems)}</span>
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Cart;
