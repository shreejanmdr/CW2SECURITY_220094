import React, { useState } from "react";
import { forgotPasswordApi, verifyOtpApi } from "../../apis/Api";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { FaLock } from "react-icons/fa"; 

const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSentOtp = (e) => {
    e.preventDefault();
    forgotPasswordApi({ phone })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setIsSent(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 500) {
          toast.error(error.response.data.message);
        }
      });
  };

  //verify and set OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();

    const data = {
      phone: phone,
      otp: otp,
      newPassword: newPassword,
    };

    //api Call
    verifyOtpApi(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || 500) {
          toast.error(error.response.data.message);
        }
      });
  };
  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background:
          "url(/assets/images/image.png) no-repeat center center/cover",
      }}
    >
      <div className="d-flex align-items-center justify-content-center min-vh-100 ">
        <div
          className="card p-4 shadow-sm"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <div className="text-center mb-4">
            <FaLock size={50} className="mb-2 text-primary" />
            <h3>Forgot Password</h3>
          </div>
          <form>
            <div className="input-group mb-3">
              <span className="input-group-text">+977</span>
              <input
                disabled={isSent}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Enter Mobile Number"
              />
            </div>
            <button
              disabled={isSent}
              onClick={handleSentOtp}
              className="btn btn-primary w-100 mb-3"
            >
              Send OTP
            </button>

            {isSent && (
              <>
                <hr />
                <p className="text-success text-center">
                  OTP has been sent to {phone} ✅
                </p>
                <input
                  onChange={(e) => setOtp(e.target.value)}
                  type="number"
                  className="form-control mb-3"
                  placeholder="Enter OTP Here"
                />
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  className="form-control mb-3"
                  placeholder="Enter New Password"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="btn btn-primary w-100"
                >
                  Verify OTP and Set Password
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
