import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import ForgotPassword from "./ForgotPassword";
import { forgotPasswordApi, verifyOtpApi } from "../../apis/Api";
import { toast } from "react-toastify";

// Mock the API functions and toast
jest.mock("../../apis/Api");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("ForgotPassword Component Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  it("should update the phone input value", () => {
    render(<ForgotPassword />);

    const phoneInput = screen.getByPlaceholderText("Enter Mobile Number");
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    expect(phoneInput.value).toBe("1234567890");
  });

  it("should call forgotPasswordApi when Send OTP is clicked", async () => {
    forgotPasswordApi.mockResolvedValue({ status: 200, data: { message: "OTP sent successfully" } });

    render(<ForgotPassword />);

    const phoneInput = screen.getByPlaceholderText("Enter Mobile Number");
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    const sendOtpButton = screen.getByText("Send OTP");
    fireEvent.click(sendOtpButton);

    await waitFor(() => {
      expect(forgotPasswordApi).toHaveBeenCalledWith({ phone: "1234567890" });
      expect(toast.success).toHaveBeenCalledWith("OTP sent successfully");
    });
  });

 

  it("should handle forgotPasswordApi failure", async () => {
    forgotPasswordApi.mockRejectedValue({ response: { status: 400, data: { message: "Error sending OTP" } } });

    render(<ForgotPassword />);

    const phoneInput = screen.getByPlaceholderText("Enter Mobile Number");
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    const sendOtpButton = screen.getByText("Send OTP");
    fireEvent.click(sendOtpButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error sending OTP");
    });
  });

  it("should update the OTP input value", async () => {
    forgotPasswordApi.mockResolvedValue({ status: 200, data: { message: "OTP sent successfully" } });

    render(<ForgotPassword />);

    const phoneInput = screen.getByPlaceholderText("Enter Mobile Number");
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    const sendOtpButton = screen.getByText("Send OTP");
    fireEvent.click(sendOtpButton);

    await waitFor(() => {
      const otpInput = screen.getByPlaceholderText("Enter OTP Here");
      fireEvent.change(otpInput, { target: { value: "123456" } });

      expect(otpInput.value).toBe("123456");
    });
  });

  it("should update the new password input value", async () => {
    forgotPasswordApi.mockResolvedValue({ status: 200, data: { message: "OTP sent successfully" } });

    render(<ForgotPassword />);

    const phoneInput = screen.getByPlaceholderText("Enter Mobile Number");
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    const sendOtpButton = screen.getByText("Send OTP");
    fireEvent.click(sendOtpButton);

    await waitFor(() => {
      const passwordInput = screen.getByPlaceholderText("Enter New Password");
      fireEvent.change(passwordInput, { target: { value: "newpassword" } });

      expect(passwordInput.value).toBe("newpassword");
    });
  });

  it("should call verifyOtpApi when Verify OTP and Set Password is clicked", async () => {
    forgotPasswordApi.mockResolvedValue({ status: 200, data: { message: "OTP sent successfully" } });
    verifyOtpApi.mockResolvedValue({ status: 200, data: { message: "Password reset successfully" } });

    render(<ForgotPassword />);

    const phoneInput = screen.getByPlaceholderText("Enter Mobile Number");
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    const sendOtpButton = screen.getByText("Send OTP");
    fireEvent.click(sendOtpButton);

    await waitFor(() => {
      const otpInput = screen.getByPlaceholderText("Enter OTP Here");
      fireEvent.change(otpInput, { target: { value: "123456" } });

      const passwordInput = screen.getByPlaceholderText("Enter New Password");
      fireEvent.change(passwordInput, { target: { value: "newpassword" } });

      const verifyButton = screen.getByText("Verify OTP and Set Password");
      fireEvent.click(verifyButton);

      expect(verifyOtpApi).toHaveBeenCalledWith({
        phone: "1234567890",
        otp: "123456",
        newPassword: "newpassword",
      });
    });
  });

  it("should show success message when password reset is successful", async () => {
    forgotPasswordApi.mockResolvedValue({ status: 200, data: { message: "OTP sent successfully" } });
    verifyOtpApi.mockResolvedValue({ status: 200, data: { message: "Password reset successfully" } });

    render(<ForgotPassword />);

    const phoneInput = screen.getByPlaceholderText("Enter Mobile Number");
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    const sendOtpButton = screen.getByText("Send OTP");
    fireEvent.click(sendOtpButton);

    await waitFor(() => {
      const otpInput = screen.getByPlaceholderText("Enter OTP Here");
      fireEvent.change(otpInput, { target: { value: "123456" } });

      const passwordInput = screen.getByPlaceholderText("Enter New Password");
      fireEvent.change(passwordInput, { target: { value: "newpassword" } });

      const verifyButton = screen.getByText("Verify OTP and Set Password");
      fireEvent.click(verifyButton);
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Password reset successfully");
    });
  });

  it("should handle verifyOtpApi failure", async () => {
    forgotPasswordApi.mockResolvedValue({ status: 200, data: { message: "OTP sent successfully" } });
    verifyOtpApi.mockRejectedValue({ response: { status: 400, data: { message: "Invalid OTP" } } });

    render(<ForgotPassword />);

    const phoneInput = screen.getByPlaceholderText("Enter Mobile Number");
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    const sendOtpButton = screen.getByText("Send OTP");
    fireEvent.click(sendOtpButton);

    await waitFor(() => {
      const otpInput = screen.getByPlaceholderText("Enter OTP Here");
      fireEvent.change(otpInput, { target: { value: "123456" } });

      const passwordInput = screen.getByPlaceholderText("Enter New Password");
      fireEvent.change(passwordInput, { target: { value: "newpassword" } });

      const verifyButton = screen.getByText("Verify OTP and Set Password");
      fireEvent.click(verifyButton);
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid OTP");
    });
  });

  


});
