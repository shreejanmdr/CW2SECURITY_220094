import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { registerUserApi } from "../../apis/Api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import PasswordStrengthBar from "react-password-strength-bar";
//import PasswordStrengthChecker from '../pswd/PasswordStrengthChecker';


const RegisterPage = () => {
  const navigate = useNavigate();
  // reCAPTCHA site key
  const siteKey = "6Lfdab8qAAAAADzTjd87esA4qUA1ezYJs5XLim_D"; 

  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  

  // State for error messages
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // State for password visibility toggle
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
 // const handlePasswordChange = (e) => {setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  const validate = () => {
    let isValid = true;

    if (name.trim() === "") {
      setNameError("Name is required!");
      isValid = false;
    } else {
      setNameError("");
    }

    if (email.trim() === "") {
      setEmailError("Email is required!");
      isValid = false;
    } else if (!email.includes("@") || !email.includes(".com")) {
      setEmailError("Email is invalid!");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (phone.trim() === "") {
      setPhoneError("Phone number is required!");
      isValid = false;
    } else if (phone.length !== 10) {
      setPhoneError("Phone number is invalid!");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required!");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long!");
      isValid = false;
    } else if (password.length > 20) {
      setPasswordError("Password must be less than 20 characters long!");
      isValid = false;
    } else if (password.includes(" ")) {
      setPasswordError("Password cannot contain spaces!");
      isValid = false;
    } else if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/
      )
    ) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character!"
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Confirm password is required!");
      isValid = false;
    } else if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError("Password and confirm password don't match!");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA verification!");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = {
      name,
      email,
      phone,
      password,
    };

    registerUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        navigate("/login");
      }
    });
  };

  return (
    <section
      className="px-4 py-5 px-md-5 text-center text-lg-start"
      style={{
        backgroundColor: "hsl(0, 0%, 96%)",
        backgroundImage: `url("/assets/images/image.png")`,
        backgroundSize: "cover",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="row gx-lg-5 align-items-start">
          <div className="col-lg-5 mb-5 mb-lg-0 mt-5">
            <h1 className="my-5 display-4 fw-bold text-light">
              Register Now ..... Easy Shopping
            </h1>
            <h2 className="text-warning mb-4">Discover Joyful Essentials!</h2>
            <p style={{ color: "white" }}>
              Explore the finest selection of kids' essentials at our online
              store. Elevate your child's everyday experiences with quality
              products delivered to your doorstep, ensuring comfort and
              happiness in every purchase...
            </p>
          </div>

          <div className="col-lg-6">
            <div className="card shadow-lg">
              <div className="card-body py-4 px-md-5">
                <h1 className="text-center fw-bold mb-4">
                            <img
                              src="../assets/images/sanosansar1.png"
                              alt="logo"
                              width="190"
                              height="40"
                              className="d-inline-block align-text-top ms-2  px-2"
                            />
                          </h1>
                <form onSubmit={handleSubmit}>
                {/* <div className="app">
                <input
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={handlePasswordChange}
                 className="password-input"
                />
               <PasswordStrengthChecker value={password} />
                </div> */}
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example1">
                      Full Name
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="form3Example1"
                        placeholder="Enter full name"
                        className="form-control"
                        value={name}
                        onChange={handleName}
                      />
                      <span className="input-group-text">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                    {nameError && <span className="text-danger">{nameError}</span>}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                    <div className="input-group">
                      <input
                        type="email"
                        id="form3Example3"
                        placeholder="Enter email"
                        className="form-control"
                        value={email}
                        onChange={handleEmail}
                      />
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                    {emailError && <span className="text-danger">{emailError}</span>}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example4">
                      Phone Number
                    </label>
                    <div className="input-group">
                      <input
                        type="tel"
                        id="form3Example4"
                        placeholder="Enter phone number"
                        className="form-control"
                        value={phone}
                        onChange={handlePhone}
                      />
                      <span className="input-group-text">
                        <i className="fas fa-phone"></i>
                      </span>
                    </div>
                    {phoneError && <span className="text-danger">{phoneError}</span>}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example5">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="form3Example5"
                        placeholder="Enter password"
                        className="form-control"
                        value={password}
                        onChange={handlePassword}
                      />
                      <span
                        className="input-group-text"
                        onClick={togglePasswordVisibility}
                      >
                        <i
                          className={
                            passwordVisible
                              ? "fas fa-eye-slash"
                              : "fas fa-eye"
                          }
                        ></i>
                      </span>
                    </div>
                    <PasswordStrengthBar password={password} /> {/* Password Strength Bar */}
                    {passwordError && (
                      <span className="text-danger">{passwordError}</span>
                    )}
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example6">
                      Confirm Password
                    </label>
                    <div className="input-group">
                      <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        id="form3Example6"
                        placeholder="Confirm password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                      />
                      <span
                        className="input-group-text"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        <i
                          className={
                            confirmPasswordVisible
                              ? "fas fa-eye-slash"
                              : "fas fa-eye"
                          }
                        ></i>
                      </span>
                    </div>
                  <PasswordStrengthBar password={password} /> {/* Password Strength Bar */}
                    {confirmPasswordError && (
                      <span className="text-danger">
                        {confirmPasswordError}
                      </span>
                    )}
                  </div>

                  <div className="form-outline mb-4">
                    <ReCAPTCHA
                      sitekey={siteKey}
                      onChange={(value) => setCaptchaToken(value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success btn-block w-100 rounded-pill"
                    style={{
                      backgroundColor: "#7849FF",
                      borderColor: "#28a745",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    Sign Up
                  </button>

                  <p className="additional-links text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-decoration-underline">
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;


