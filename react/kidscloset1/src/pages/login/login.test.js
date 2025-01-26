// import {render,fireEvent,waitFor,screen} from "@testing-library/react"
// import {toast} from "react-toastify"
// import { loginUserApi } from "../../apis/Api"
// import LoginPage from "./Loginpage"



// //mocking the API js (Not sendig any request to real backend)
// jest.mock('../../apis/Api');

// //making test case
// describe("Login Page component Test", () => {
//     //clearing all the mocks after each test
//     afterEach(() => {
//         jest.clearAllMocks();
//     })  

//     //1.defining test1
//     it("Should show error message on failed login", async () => {
//         //2.rendering login components
//         render(<LoginPage />);

//         //3.Mocking login fail API response
//         const mockResponse ={
//             data:{
//                 success: false,
//                 message: "Password not matched!"
//             }
//         }

//         //4.config mocked API response
//         loginUserApi.mockResolvedValue(mockResponse);

//         //5.config that toast error message as a test function
//         toast.error = jest.fn();
        
//         //6.Testing real Ui components 
//         //6.1 finding email,password, and login button
//         const email =await  screen.getByPlaceholderText("Enter your email");
//         const password =await  screen.getByPlaceholderText("Enter your password");
//         const loginBtn = screen.getByText("Login");

//         //6.2 simulating user input
//         fireEvent.change(email, {target: {value: "test1@gmail.com"}});
//         fireEvent.change(password, {target: {value: "test123"}});
//         fireEvent.click(loginBtn);
//         //we have done all setup above
//         waitFor(() => {
//             expect(loginUserApi).toHaveBeenCalledWith({
//                 email: "test1@gmail.com",
//                 password: "test123",
//             });
//         })
//     })
// })


import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api"
import LoginPage from "./Loginpage"
import { BrowserRouter } from "react-router-dom"; // Importing BrowserRouter

// Mocking the API
jest.mock("../../Apis/api");

describe("Login Component Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should show error message on failed test", async () => {
    // Rendering the component with BrowserRouter
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Mocking the API
    const mockResponse = {
      data: {
        success: false,
        message: "Password is incorrect",
      },
    };
    // Configure mock resolved value
    loginUserApi.mockResolvedValue(mockResponse);

    // Mock toast error function
    toast.error = jest.fn();

    // Testing real UI components

    // 1. Find the email, password and login button
    const email = await screen.getByPlaceholderText("Enter your email");
    const password = await screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByText("SIGN IN");

    // 2. Simulate the email, password, and login
    fireEvent.change(email, { target: { value: "test@gmail.com" } });
    fireEvent.change(password, { target: { value: "test123" } });
    fireEvent.click(loginButton);

    // Wait for the async function
    await waitFor(() => {
      // 3. Expect the toast error to be called
      expect(loginUserApi).toHaveBeenCalledWith({
        email: "test@gmail.com",
        password: "test123",
      });
    });

    // 4. Expect the toast error to be called
    expect(toast.error).toHaveBeenCalledWith("Password is incorrect");
    

  });

    it("Should show success message on successful login", async () => {
      // Rendering the component with BrowserRouter
      render(
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      );

      // Mocking the API
      const mockResponse = {
        data: {
          success: true,
          message: "Login successful",
        },
      };
      // Configure mock resolved value
      loginUserApi.mockResolvedValue(mockResponse);

      // Mock toast success function
      toast.success = jest.fn();

      // Testing real UI components

      // 1. Find the email, password and login button
      const email = await screen.getByPlaceholderText("Enter your email");
      const password = await screen.getByPlaceholderText("Enter your password");
      const loginButton = screen.getByText("SIGN IN");

      // 2. Simulate the email, password, and login
      fireEvent.change(email, { target: { value: "test@gmail.com" } });
      fireEvent.change(password, { target: { value: "Test@123" } });
      fireEvent.click(loginButton);
    })

    it("Should show error message on failed login", async () => {
      // Rendering the component with BrowserRouter
      render(
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      );

      // Mocking the API
      const mockResponse = {
        data: {
          success: false,
          message: "Login failed",
        },
      };
      // Configure mock resolved value
      loginUserApi.mockResolvedValue(mockResponse);

      // Mock toast error function  
      toast.error = jest.fn();

      // Testing real UI components

      // 1. Find the email, password and login button 
      const email = await screen.getByPlaceholderText("Enter your email");
      const password = await screen.getByPlaceholderText("Enter your password");
      const loginButton = screen.getByText("SIGN IN");

      // 2. Simulate the email, password, and login
      fireEvent.change(email, { target: { value: "test@gmail.com" } });
      fireEvent.change(password, { target: { value: "Test@123" } });
      fireEvent.click(loginButton);
    })
});
