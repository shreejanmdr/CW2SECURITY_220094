import { DeleteOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Image, message, Skeleton } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteFromFavoriteApi, getFavoriteByUserApi, addToCartApi } from "../../apis/Api";
import { useNavigate } from 'react-router-dom';

const BackgroundWrapper = styled.div`
  background: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
  url('https://assets-global.website-files.com/61e7be6e6f17f5346fc7ec9f/61e7be6f6f17f5a75bc7ed68_background-sign-in-tech-ui-kit-webflow-template.svg') no-repeat center center;
  background-size: cover;
  min-height: 100vh; /* Adjust as needed */
  padding: 2rem;
`;

const FavouritesContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f8f9fa; /* Background color for the container */
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const FavouriteItem = styled(motion.div)`
  display: flex;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  margin-left: 1.5rem;
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const ItemPrice = styled.p`
  font-weight: bold;
  color: #e74c3c;
  font-size: 1.1rem;
`;

const EmptyFavouritesMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

const Favourites = () => {
  const [loading, setLoading] = useState(true);
  const [favouriteItems, setFavouriteItems] = useState([]);
  const [changefav, setChangeFav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, [changefav]);

  const fetchFavorites = () => {
    getFavoriteByUserApi()
      .then((res) => {
        setFavouriteItems(res.data.favorites);
        setLoading(false);
      })
      .catch((err) => {
        message.error(err.response?.data?.message || "Something went wrong");
      });
  };

  const handleDeleteFavourite = (favouriteId) => {
    deleteFromFavoriteApi(favouriteId)
      .then(() => {
        setChangeFav(!changefav);
        message.success("Item removed from favourites");
      })
      .catch((err) => {
        message.error(err.response?.data?.message || "Something went wrong");
      });
  };

  const handleAddToCart = async (productId, productPrice) => {
    try {
      const total = 1 * productPrice; // Assuming quantity is 1

      await addToCartApi({ 
        productId: productId, 
        quantity: 1, 
        total: total 
      });

      message.success("Added to cart successfully!");
      navigate('/my_cart');
    } catch (error) {
      message.error("Failed to add to cart.");
    }
  };

  if (loading) {
    return (
      <BackgroundWrapper>
        <FavouritesContainer>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} active avatar paragraph={{ rows: 3 }} />
          ))}
        </FavouritesContainer>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <FavouritesContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>
          Favourites
        </h2>
        <AnimatePresence>
          {favouriteItems.length > 0 ? (
            favouriteItems.map((item, index) => (
              <FavouriteItem
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Image
                  width={150}
                  src={`http://localhost:5000/products/${item.productId.productImage}`}
                  alt={item.productName}
                  preview={{
                    src: `http://localhost:5000/products/${item.productId.productImage}`,
                  }}
                />
                <ItemDetails>
                  <ItemName>{item.productId.productName}</ItemName>
                  <ItemPrice>Rs. {item.productId.productPrice}</ItemPrice>
                  <p>{item.productDescription}</p>
                  <Button
                    type="primary"
                    onClick={() => handleAddToCart(item.productId._id, item.productId.productPrice)}
                    style={{ marginTop: '1rem' }}
                  >
                    Buy Now
                  </Button>
                </ItemDetails>
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteFavourite(item.productId._id)}
                >
                  Remove
                </Button>
              </FavouriteItem>
            ))
          ) : (
            <EmptyFavouritesMessage>
              <HeartOutlined style={{ fontSize: 50, marginBottom: "1rem" }} />
              <p>Your favourites list is empty. Start adding items now!</p>
            </EmptyFavouritesMessage>
          )}
        </AnimatePresence>
      </FavouritesContainer>
    </BackgroundWrapper>
  );
};

export default Favourites;
