import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "../../pages/login/Loginpage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  // reCAPTCHA site key
  const siteKey = "6Lfdab8qAAAAADzTjd87esA4qUA1ezYJs5XLim_D"; 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [lockoutTime, setLockoutTime] = useState(null);
  // const [remainingAttempts, setRemainingAttempts] = useState(null);
  // const [loading, setLoading] = useState(false);


  // Validation
  const validation = () => {
    let isValid = true;

    if (email.trim() === "" || !email.includes("@")) {
      setEmailError("Email is empty or invalid");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is empty");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA verification!");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    // Make API request
    loginUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/admin/dashboard");

          // Setting token and user data in local storage
          localStorage.setItem("token", res.data.token);

          // Setting user data
          const convertedData = JSON.stringify(res.data.userData);
          localStorage.setItem("user", convertedData);
        }
      })
      .catch((err) => {
        console.log(err);

        if (err.response.status === 400 || 500) {
          toast.error(err.response.data.message);
        }
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundColor: "hsl(0, 0%, 96%)",
        backgroundImage: `url("/assets/images/image.png")`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "15px",
      }}
    >
      <div className="container">
        <div className="row gx-lg-5 align-items-center justify-content-center">
          <div className="col-lg-6 mb-5 mb-lg-0 text-center text-lg-start">
            <h1 className="my-5 display-3 fw-bold ls-tight text-light">
              Bright Beginnings, Easy Shopping
              <br />
              <span className="text-warning">Discover Joyful Essentials!</span>
            </h1>
            <p style={{ color: "white" }}>
              Explore the finest selection of kids' essentials at our online
              store. Elevate your child's everyday experiences with quality
              products delivered to your doorstep, ensuring comfort and
              happiness in every purchase...
              <br />
              <br />
              <Link to="/register" className="btn btn-warning">
                Register Now
              </Link>
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="card shadow-lg rounded-lg">
              <div className="card-body py-5 px-md-5">
                <h1 className="text-center fw-bold mb-4">Login</h1>
                <form>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                    <div className="input-group">
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {emailError && (
                      <p className="text-danger">{emailError}</p>
                    )}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-0"
                        style={{ backgroundColor: "transparent" }}
                        onClick={togglePasswordVisibility}
                      >
                        <i
                          className={
                            passwordVisible
                              ? "fas fa-eye-slash text-primary"
                              : "fas fa-eye text-primary"
                          }
                        ></i>
                      </button>
                    </div>
                    {passwordError && (
                      <p className="text-danger">{passwordError}</p>
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
                    onClick={handleLogin}
                    className="btn btn-primary btn-block w-100 mb-4 rounded-pill"
                    style={{
                      backgroundColor: "#7849FF",
                      borderColor: "#28a745",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    SIGN IN
                  </button>

                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="text-primary text-decoration-none"
                      >
                        Sign Up
                      </Link>
                    </p>
                    <Link
                      to="/forgot_password"
                      className="btn btn-link text-primary text-decoration-none"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
