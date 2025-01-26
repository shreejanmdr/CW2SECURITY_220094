// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import React from "react";
// import { BrowserRouter } from "react-router-dom"; // Importing BrowserRouter
// import { toast } from "react-toastify";
// import { registerUserApi } from "../../apis/Api";
// import Register from "./Registerpage"; // Component to test
 
// // Mocking the API
// jest.mock("../../apis/Api");
 
// describe("Register Component Test", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });
 
 
 
//   it("Should show success message on successful registration", async () => {
//     render(
//       <BrowserRouter>
//         <Register />
//       </BrowserRouter>
//     );
 
//     const mockResponse = {
//       data: {
//         success: true,
//         message: "Registration successful!",
//       },
//     };
 
//     registerUserApi.mockResolvedValue(mockResponse);
//     toast.success = jest.fn();
 

//     const name = screen.getByPlaceholderText("Last Name");
//     const email = screen.getByPlaceholderText("Email Address");
//     const phone = screen.getByPlaceholderText("Phone Number");
//     const password = screen.getByPlaceholderText("Password");
//     const confirmPassword = screen.getByPlaceholderText("Confirm Password");
//     const signUpButton = screen.getByRole('button', { name: /Create Account/i });
 
   
//     fireEvent.change(name, { target: { value: "User" } });
//     fireEvent.change(email, { target: { value: "test@gmail.com" } });
//     fireEvent.change(phone, { target: { value: "1234567890" } });
//     fireEvent.change(password, { target: { value: "test123" } });
//     fireEvent.change(confirmPassword, { target: { value: "test123" } });
//     fireEvent.click(signUpButton);
 
//     await waitFor(() => {
//       expect(registerUserApi).toHaveBeenCalledWith({
//         name:"test",
//         email: "test@gmail.com",
//         phone: "1234567890",
//         password: "test123",
//       });
//       expect(toast.success).toHaveBeenCalledWith("Registration successful!");
//     });
//   });
 
//   it("Should show error message on failed registration", async () => {
//     render(
//       <BrowserRouter>
//         <Register />
//       </BrowserRouter>
//     );
 
//     const mockResponse = {
//       response: {
//         data: {
//           message: "Email already exists",
//         },
//       },
//     };
 
//     registerUserApi.mockRejectedValue(mockResponse);
//     toast.error = jest.fn();
 
//     const name = screen.getByPlaceholderText("name");
//     const email = screen.getByPlaceholderText("Email Address");
//     const phone = screen.getByPlaceholderText("Phone Number");
//     const password = screen.getByPlaceholderText("Password");
//     const confirmPassword = screen.getByPlaceholderText("Confirm Password");
//     const signUpButton = screen.getByRole('button', { name: /Create Account/i });
 
//     fireEvent.change(firstName, { target: { value: "Test1" } });
//     fireEvent.change(lastName, { target: { value: "User" } });
//     fireEvent.change(email, { target: { value: "test@gmail.com" } });
//     fireEvent.change(phone, { target: { value: "1234567890" } });
//     fireEvent.change(password, { target: { value: "test123" } });
//     fireEvent.change(confirmPassword, { target: { value: "test123" } });
//     fireEvent.click(signUpButton);
 
//     await waitFor(() => {
//       expect(registerUserApi).toHaveBeenCalledWith({
//         firstName: "Test1",
//         lastName: "User",
//         email: "test@gmail.com",
//         phone: "1234567890",
//         password: "test123",
//       });
//       expect(toast.error).toHaveBeenCalledWith("An error occurred. Please try again.");
//     });
//   });
// });



import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/Api";
import RegisterPage from "./RegisterPage";

// Mocking the API
jest.mock("../../apis/Api");

describe("RegisterPage Component Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });



 

  it("should show error when passwords do not match", async () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    const name = screen.getByPlaceholderText("Enter full name");
    const email = screen.getByPlaceholderText("Enter email");
    const phone = screen.getByPlaceholderText("Enter phone number");
    const password = screen.getByPlaceholderText("Enter password");
    const confirmPassword = screen.getByPlaceholderText("Confirm password");
    const signUpButton = screen.getByRole("button", { name: /Sign Up/i });

    fireEvent.change(name, { target: { value: "Test User" } });
    fireEvent.change(email, { target: { value: "test@gmail.com" } });
    fireEvent.change(phone, { target: { value: "1234567890" } });
    fireEvent.change(password, { target: { value: "Test@123" } });
    fireEvent.change(confirmPassword, { target: { value: "Test@1234" } });
    fireEvent.click(signUpButton);

    expect(screen.getByText("Password and confirm password don't match!")).toBeInTheDocument();
  });

  it("should show success message on successful registration", async () => {
    const mockResponse = {
      data: {
        success: true,
        message: "Registration successful!",
      },
    };
    registerUserApi.mockResolvedValue(mockResponse);
    toast.success = jest.fn();

    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    const name = screen.getByPlaceholderText("Enter full name");
    const email = screen.getByPlaceholderText("Enter email");
    const phone = screen.getByPlaceholderText("Enter phone number");
    const password = screen.getByPlaceholderText("Enter password");
    const confirmPassword = screen.getByPlaceholderText("Confirm password");
    const signUpButton = screen.getByRole("button", { name: /Sign Up/i });

    fireEvent.change(name, { target: { value: "Test User" } });
    fireEvent.change(email, { target: { value: "test@gmail.com" } });
    fireEvent.change(phone, { target: { value: "1234567890" } });
    fireEvent.change(password, { target: { value: "Test@123" } });
    fireEvent.change(confirmPassword, { target: { value: "Test@123" } });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(registerUserApi).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@gmail.com",
        phone: "1234567890",
        password: "Test@123",
      });
      expect(toast.success).toHaveBeenCalledWith("Registration successful!");
    });
  });



  it("should show validation error for invalid email format", async () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    const name = screen.getByPlaceholderText("Enter full name");
    const email = screen.getByPlaceholderText("Enter email");
    const phone = screen.getByPlaceholderText("Enter phone number");
    const password = screen.getByPlaceholderText("Enter password");
    const confirmPassword = screen.getByPlaceholderText("Confirm password");
    const signUpButton = screen.getByRole("button", { name: /Sign Up/i });

    fireEvent.change(name, { target: { value: "Test User" } });
    fireEvent.change(email, { target: { value: "invalidemail" } });
    fireEvent.change(phone, { target: { value: "1234567890" } });
    fireEvent.change(password, { target: { value: "Test@123" } });
    fireEvent.change(confirmPassword, { target: { value: "Test@123" } });
    fireEvent.click(signUpButton);

    expect(screen.getByText("Email is invalid!")).toBeInTheDocument();
  });

  it("should show validation error for invalid phone number", async () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    const name = screen.getByPlaceholderText("Enter full name");
    const email = screen.getByPlaceholderText("Enter email");
    const phone = screen.getByPlaceholderText("Enter phone number");
    const password = screen.getByPlaceholderText("Enter password");
    const confirmPassword = screen.getByPlaceholderText("Confirm password");
    const signUpButton = screen.getByRole("button", { name: /Sign Up/i });

    fireEvent.change(name, { target: { value: "Test User" } });
    fireEvent.change(email, { target: { value: "test@gmail.com" } });
    fireEvent.change(phone, { target: { value: "12345" } });
    fireEvent.change(password, { target: { value: "Test@123" } });
    fireEvent.change(confirmPassword, { target: { value: "Test@123" } });
    fireEvent.click(signUpButton);

    expect(screen.getByText("Phone number is invalid!")).toBeInTheDocument();
  });

  it("should toggle password visibility", async () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    const password = screen.getByPlaceholderText("Enter password");
    const togglePasswordVisibility = screen.getByLabelText("Show Password");

    // Password should initially be hidden
    expect(password).toHaveAttribute("type", "password");

    // Click to show password
    fireEvent.click(togglePasswordVisibility);
    expect(password).toHaveAttribute("type", "text");

    // Click again to hide password
    fireEvent.click(togglePasswordVisibility);
    expect(password).toHaveAttribute("type", "password");
  });
});