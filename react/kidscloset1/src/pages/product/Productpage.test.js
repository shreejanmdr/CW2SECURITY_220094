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



