import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import Favourites from "./Favourites";
import { BrowserRouter } from "react-router-dom";
import { getFavoriteByUserApi, deleteFromFavoriteApi, addToCartApi } from "../../apis/Api";
import { message } from "antd";

// Mock the API functions
jest.mock("../../apis/Api");
jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  message: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("Favourites Component Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockFavorites = {
    data: {
      favorites: [
        {
          _id: "1",
          productId: {
            _id: "101",
            productName: "Product 1",
            productPrice: 1000,
            productImage: "image1.jpg",
          },
          productDescription: "Description for product 1",
        },
        {
          _id: "2",
          productId: {
            _id: "102",
            productName: "Product 2",
            productPrice: 2000,
            productImage: "image2.jpg",
          },
          productDescription: "Description for product 2",
        },
      ],
    },
  };

 


  it("should call fetchFavorites on component load", async () => {
    getFavoriteByUserApi.mockResolvedValue(mockFavorites);

    render(
      <BrowserRouter>
        <Favourites />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getFavoriteByUserApi).toHaveBeenCalledTimes(1);
    });
  });







});
