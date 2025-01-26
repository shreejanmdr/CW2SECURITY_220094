import {
  CreditCardOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Image, Input, message, Radio, Skeleton } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import KhaltiCheckout from "khalti-checkout-web";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CountUp } from "use-count-up";
import {
  createOrderApi,
  deleteCartApi,
  getAllCartApi,
  updateCartApi,
  updateCartStatusApi,
} from "../../apis/Api";

// Styled components
const BackgroundWrapper = styled.div`
  background: linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    url('https://assets-global.website-files.com/61e7be6e6f17f5346fc7ec9f/61e7be6f6f17f5a75bc7ed68_background-sign-in-tech-ui-kit-webflow-template.svg')
      no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  padding: 3rem;
`;

const CartContainer = styled(motion.div)`
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  background: #f7f8fa;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const BillSection = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  width: 400px;
  margin-right: 2rem;
  position: sticky;
  top: 2rem;
  height: fit-content;

  @media (max-width: 1100px) {
    width: 100%;
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #333;
  }
`;

const BillItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  font-size: 1rem;
  color: #2c3e50;
`;

const TotalAmount = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #f1faee;
  display: flex;
  justify-content: space-between;
  color: #34495e;
`;

const CartItemsSection = styled.div`
  flex: 2;

  @media (max-width: 1100px) {
    margin-right: 0;
    margin-bottom: 2rem;
  }
`;

const CartItem = styled(motion.div)`
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 1rem;
  border-radius: 15px;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  color: #34495e;
  font-weight: 600;
`;

const ItemPrice = styled.p`
  font-weight: 600;
  color: #e74c3c;
  font-size: 1rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  button {
    margin: 0 6px;
    background: #3498db;
    border-radius: 10px;
    color: #fff;
    border: none;
    padding: 0.4rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2980b9;
    }
  }

  input {
    width: 50px;
    text-align: center;
    margin: 0 8px;
    padding: 0.5rem;
    border-radius: 10px;
    border: 1px solid #dcdcdc;
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  font-size: 1.1rem;
  margin-top: 2rem;
  color: #7f8c8d;

  svg {
    font-size: 45px;
    margin-bottom: 1rem;
  }
`;

const MyCart = () => {
  const [address, setAddress] = useState("KTM");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(50);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [change, setChange] = useState(false);

  const handleQuantityChange = (value, cart) => {
    if (value < 1) return;

    const updatedCartItems = cartItems.map((item) =>
      item._id === cart._id
        ? {
            ...item,
            quantity: value,
            total: item.productId.productPrice * value,
          }
        : item
    );
    setCartItems(updatedCartItems);

    const data = {
      quantity: value,
      total: cart.productId.productPrice * value,
    };

    updateCartApi(cart._id, data)
      .then(() => {
        message.success("Cart updated successfully");
      })
      .catch((err) => {
        message.error(err.response?.data?.message || "Something went wrong");
      });
  };

  const handleDeleteCartItem = (cartId) => {
    deleteCartApi(cartId)
      .then(() => {
        setCartItems(cartItems.filter((item) => item._id !== cartId));
        message.success("Item deleted successfully");
      })
      .catch((err) => {
        message.error(err.response?.data?.message || "Something went wrong");
      });
  };

  useEffect(() => {
    getAllCartApi()
      .then((res) => {
        setCartItems(res.data.carts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [change]);

  // Recalculate subtotal and total whenever cartItems, deliveryCharge, or change state changes
  useEffect(() => {
    const calculatedSubTotal = cartItems.reduce(
      (acc, cart) => acc + cart.total,
      0
    );
    setSubTotal(calculatedSubTotal);
    setTotal(calculatedSubTotal + deliveryCharge);
  }, [cartItems, deliveryCharge]);

  const khaltiConfig = {
    publicKey: "test_public_key_eaf361c680444863a8a466865dd11fea",
    //publicKey: "public_key_47e55edd8b884438971765e84a6e1ec2",
    productIdentity: "1234567890",
    productName: "Cart Items",
    productUrl: "http://localhost:3000/cart",
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
    eventHandler: {
      onSuccess(payload) {
        console.log(payload);
        handlePayment();
        message.success("Payment successful");
      },
      onError(error) {
        console.log(error);
        message.error("Payment failed");
      },
      onClose() {
        console.log("widget is closing");
      },
    },
  };

  const handleKhaltiPayment = () => {
    if (!address.trim()) {
      message.error("Please enter your address");
      return;
    }
    const checkout = new KhaltiCheckout(khaltiConfig);
    checkout.show({ amount: total * 100 }); // Khalti expects amount in paisa
  };

  const handlePayment = () => {
    const data = {
      address,
      carts: cartItems,
      totalAmount: total,
      paymentType: paymentMethod,
    };
    createOrderApi(data)
      .then(() => {
        updateCartStatusApi({ status: "ordered" }).then(() => {
          setChange(!change);
        });
        message.success("Order placed successfully");
      })
      .catch((err) => {
        message.error(err.response?.data?.message || "Something went wrong");
      });
  };

  const handleBuyNow = () => {
    if (!address.trim()) {
      message.error("Please enter your address");
      return;
    }
    if (!paymentMethod) {
      message.error("Please select a payment method");
      return;
    }
    if (paymentMethod === "Khalti") {
      handleKhaltiPayment();
    } else {
      message.info("Cash on Delivery selected");
      handlePayment();
    }
  };

  if (loading) {
    return (
      <BackgroundWrapper>
        <CartContainer>
          <BillSection>
            <Skeleton active paragraph={{ rows: 4 }} />
          </BillSection>
          <CartItemsSection>
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} active avatar paragraph={{ rows: 3 }} />
            ))}
          </CartItemsSection>
        </CartContainer>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <CartContainer>
        <BillSection>
          <h3>Billing Details</h3>
          <BillItem>
            <span>Subtotal:</span>
            <span>Rs. <CountUp isCounting end={subTotal} duration={0.5} /></span>
          </BillItem>
          <BillItem>
            <span>Delivery:</span>
            <span>Rs. <CountUp isCounting end={deliveryCharge} duration={0.5} /></span>
          </BillItem>
          <TotalAmount>
            <span>Total:</span>
            <span>Rs. <CountUp isCounting end={total} duration={0.5} /></span>
          </TotalAmount>

          <Input
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          />

          <Radio.Group
            onChange={(e) => setPaymentMethod(e.target.value)}
            value={paymentMethod}
            style={{ marginBottom: "1rem" }}
          >
            <Radio value="Cash On Delivery">
              <CreditCardOutlined /> Cash On Delivery
            </Radio>
            <Radio value="Khalti">
              <CreditCardOutlined /> Khalti
            </Radio>
          </Radio.Group>

          <Button type="primary" block onClick={handleBuyNow}>
            Buy Now
          </Button>
        </BillSection>

        <CartItemsSection>
          {cartItems.length ? (
            <AnimatePresence>
              {cartItems.map((cart) => (
                <CartItem
                  key={cart._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Image
                    width={120}
                    src={`http://localhost:5000/products/${cart.productId.productImage}`}
                    alt={cart.productName}
                    preview={{
                      src: `http://localhost:5000/products/${cart.productId.productImage}`,
                    }}
                  />
                  <ItemDetails>
                    <ItemName>{cart.productId.productName}</ItemName>
                    <ItemPrice>
                      Rs. {cart.productId.productPrice} x {cart.quantity} = Rs.{" "}
                      {cart.total}
                    </ItemPrice>
                    <QuantityControl>
                      <Button
                        icon={<MinusOutlined />}
                        onClick={() =>
                          handleQuantityChange(cart.quantity - 1, cart)
                        }
                      />
                      <Input
                        type="number"
                        value={cart.quantity}
                        min={1}
                        onChange={(e) =>
                          handleQuantityChange(Number(e.target.value), cart)
                        }
                      />
                      <Button
                        icon={<PlusOutlined />}
                        onClick={() =>
                          handleQuantityChange(cart.quantity + 1, cart)
                        }
                      />
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteCartItem(cart._id)}
                      />
                    </QuantityControl>
                  </ItemDetails>
                </CartItem>
              ))}
            </AnimatePresence>
          ) : (
            <EmptyCartMessage>
              <ShoppingCartOutlined />
              <p>Your cart is empty.</p>
            </EmptyCartMessage>
          )}
        </CartItemsSection>
      </CartContainer>
    </BackgroundWrapper>
  );
};

export default MyCart;
