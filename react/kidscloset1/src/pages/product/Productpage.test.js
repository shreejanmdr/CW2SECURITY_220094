import { render, screen, waitFor } from "@testing-library/react";
import Productpage from "./Productpage";
import { getAllProducts } from "../../apis/Api";
import productMockData from "../../__mock__/productMockData";
import { BrowserRouter } from "react-router-dom"; // Importing BrowserRouter
import "@testing-library/jest-dom";


// mock the api.js
jest.mock("../../apis/Api.js");
// test case
describe("Testing Productpage", () => {
  // clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });
  // test1
  it("should render Productpage", async () => {
    const mock_data = productMockData;
    
    getAllProducts.mockResolvedValue({
      data: {
        products:mock_data,
      },
    });

// Rendering the component with BrowserRouter
//   render(
//     <BrowserRouter>
//       <Productpage />
//     </BrowserRouter>
//   );

    render(<Productpage />);

    //    configured
     await waitFor(() => {
      mock_data.forEach((product) => {
        expect(screen.getByText(product.productName)).toBeInTheDocument();
      });
    });
  });
});




// const request = require('supertest');
// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const productModel = require('../models/productModel');
// const productController = require('../controllers/productController');
// const app = express();

// // Middleware setup
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../public')));

// // Routes setup
// app.post('/products', productController.createProduct);
// app.get('/products', productController.getAllProducts);
// app.get('/products/:id', productController.getSingleProduct);
// app.delete('/products/:id', productController.deleteProduct);
// app.put('/products/:id', productController.updateProduct);
// app.get('/products/pagination', productController.paginationProducts);
// app.get('/products/search', productController.searchProducts);

// // Mock file system and product model
// jest.mock('fs');
// jest.mock('../models/productModel');

// // Test suite
// describe('Product Controller', () => {
//   // Test createProduct
//   describe('POST /products', () => {
//     it('should create a new product', async () => {
//       const mockProduct = {
//         productName: 'Test Product',
//         productPrice: 100,
//         productCategory: 'Test Category',
//         productDescription: 'Test Description',
//         productImage: 'test.jpg',
//       };

//       const req = {
//         body: {
//           productName: 'Test Product',
//           productPrice: 100,
//           productCategory: 'Test Category',
//           productDescription: 'Test Description',
//         },
//         files: {
//           productImage: {
//             name: 'test.jpg',
//             mv: jest.fn().mockResolvedValue(true),
//           },
//         },
//       };

//       const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       };

//       productModel.prototype.save = jest.fn().mockResolvedValue(mockProduct);

//       await productController.createProduct(req, res);

//       expect(res.status).toHaveBeenCalledWith(201);
//       expect(res.json).toHaveBeenCalledWith({
//         success: true,
//         message: 'Product Created Successfully!',
//         data: mockProduct,
//       });
//     });
//   });

//   // Test getAllProducts
//   describe('GET /products', () => {
//     it('should fetch all products', async () => {
//       const mockProducts = [{ productName: 'Test Product' }];

//       productModel.find = jest.fn().mockResolvedValue(mockProducts);

//       const res = await request(app).get('/products');

//       expect(res.status).toBe(201);
//       expect(res.body).toEqual({
//         success: true,
//         message: 'Product Fetched successfully!',
//         products: mockProducts,
//       });
//     });
//   });

//   // Test getSingleProduct
//   describe('GET /products/:id', () => {
//     it('should fetch a single product', async () => {
//       const mockProduct = { productName: 'Test Product' };

//       productModel.findById = jest.fn().mockResolvedValue(mockProduct);

//       const res = await request(app).get('/products/123');

//       expect(res.status).toBe(201);
//       expect(res.body).toEqual({
//         success: true,
//         message: 'Product Fetched successfully!',
//         product: mockProduct,
//       });
//     });
//   });

//   // Test deleteProduct
//   describe('DELETE /products/:id', () => {
//     it('should delete a product', async () => {
//       productModel.findByIdAndDelete = jest.fn().mockResolvedValue(true);

//       const res = await request(app).delete('/products/123');

//       expect(res.status).toBe(201);
//       expect(res.body).toEqual({
//         success: true,
//         message: 'Product Deleted successfully!',
//       });
//     });
//   });

//   // Test updateProduct
//   describe('PUT /products/:id', () => {
//     it('should update a product', async () => {
//       const mockProduct = { productName: 'Updated Product' };

//       productModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockProduct);

//       const res = await request(app).put('/products/123').send({
//         productName: 'Updated Product',
//       });

//       expect(res.status).toBe(201);
//       expect(res.body).toEqual({
//         success: true,
//         message: 'Product Updated successfully!',
//         product: mockProduct,
//       });
//     });
//   });

//   // Test paginationProducts
//   describe('GET /products/pagination', () => {
//     it('should fetch paginated products', async () => {
//       const mockProducts = [{ productName: 'Paginated Product' }];

//       productModel.find = jest.fn().mockReturnValue({
//         skip: jest.fn().mockReturnThis(),
//         limit: jest.fn().mockResolvedValue(mockProducts),
//       });

//       const res = await request(app).get('/products/pagination?page=1');

//       expect(res.status).toBe(201);
//       expect(res.body).toEqual({
//         success: true,
//         message: 'Products Fetched!',
//         products: mockProducts,
//       });
//     });
//   });

//   // Test searchProducts
//   describe('GET /products/search', () => {
//     it('should fetch searched products', async () => {
//       const mockProducts = [{ productName: 'Searched Product' }];

//       productModel.find = jest.fn().mockResolvedValue(mockProducts);

//       const res = await request(app).get('/products/search?q=search');

//       expect(res.status).toBe(200);
//       expect(res.body).toEqual({
//         success: true,
//         message: 'Products fetched successfully',
//         products: mockProducts,
//       });
//     });
//   });
// });



