import { Skeleton, message } from "antd";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserOrdersApi } from "../../apis/Api";


const BackgroundWrapper = styled.div`
  background: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    url('https://assets-global.website-files.com/61e7be6e6f17f5346fc7ec9f/61e7be6f6f17f5a75bc7ed68_background-sign-in-tech-ui-kit-webflow-template.svg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  padding: 2rem;
`;

const PageContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const Header = styled.h2`
  color: #0d47a1;
  font-size: 2.2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
`;

const OrderCard = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  padding: 1.5rem;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const OrderId = styled.h3`
  color: #0d47a1;
  font-size: 1.4rem;
  margin: 0;
  font-weight: 600;
`;

const Status = styled.span`
  background-color: ${(props) => {
    switch (props.status) {
      case "dispatched":
        return "#4caf50";
      case "pending":
        return "#ff9800";
      case "cancelled":
        return "#f44336";
      default:
        return "#2196f3";
    }
  }};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const OrderInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const InfoItem = styled.p`
  margin: 0;
  color: #424242;
  font-size: 1rem;
  font-weight: 500;
`;

const ItemsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Item = styled.li`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.8rem;
  border: 1px solid #e0e0e0;
  font-size: 0.95rem;
`;

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserOrdersApi()
      .then((res) => {
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to fetch orders");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <BackgroundWrapper>
        <PageContainer>
          <Header>Your Orders</Header>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} active avatar paragraph={{ rows: 4 }} />
          ))}
        </PageContainer>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <PageContainer>
        <Header>Your Orders</Header>
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OrderHeader>
              <OrderId>Order ID: {order._id}</OrderId>
              <Status status={order.status}>{order.status}</Status>
            </OrderHeader>
            <OrderInfo>
              <InfoItem>
                <strong>Total:</strong> Rs. {order.total}
              </InfoItem>
              <InfoItem>
                <strong>Address:</strong> {order.address}
              </InfoItem>
              <InfoItem>
                <strong>Payment:</strong> {order.paymentType}
              </InfoItem>
              <InfoItem>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </InfoItem>
            </OrderInfo>
            <h4>Items:</h4>
            <ItemsList>
              {order.carts.map((item) => (
                <Item key={item._id}>
                  <p>
                    <strong>Product:</strong>{" "}
                    {item.productId
                      ? item.productId.productName
                      : "Unknown Product"}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Total:</strong> Rs. {item.total}
                  </p>
                  <p>
                    <strong>Status:</strong> {item.status}
                  </p>
                </Item>
              ))}
            </ItemsList>
          </OrderCard>
        ))}
      </PageContainer>
    </BackgroundWrapper>
  );
};

export default OrderList;
